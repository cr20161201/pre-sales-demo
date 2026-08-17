// 共享指标采集模块（浏览器端）
// 指标定义：
//  - 首帧：连接建立 → 输出视频渲染出第一帧
//  - 换装生效：set 调用 → 输出流"停顿后恢复出帧"（rVFC 帧间隔检测）；3s 内无停顿记为"无缝衔接"
//  - 稳定性：断连次数 / 错误数 / 会话时长

export function createRecorder({ provider, durationMs, runId = "manual" }) {
  const state = {
    provider,
    runId,
    startedAt: Date.now(),
    durationMs,
    modelSpec: null,
    outputResolution: null,
    tTokenMs: null,
    tSessionReadyMs: null,
    tFirstFrameMs: null,
    setResults: [],
    disconnects: [],
    errors: [],
    states: [],
    shots: [],
    frameMetrics: null,
    endedAt: null,
    elapsedMs: null,
    estimatedCostUsd: null
  };
  return {
    state,
    markToken() { state.tTokenMs = Date.now(); },
    markSessionReady() { state.tSessionReadyMs = Date.now(); },
    markFirstFrame() { if (state.tFirstFrameMs === null) state.tFirstFrameMs = Date.now(); },
    recordSet(item) { state.setResults.push(item); },
    recordDisconnect(reason) { state.disconnects.push({ at: Date.now(), reason: String(reason) }); },
    recordError(message) { state.errors.push({ at: Date.now(), message: String(message) }); },
    recordState(s) { state.states.push({ at: Date.now(), state: String(s) }); },
    addShot(label, dataUrl) { if (dataUrl) state.shots.push({ label, dataUrl }); },
    finish() {
      state.endedAt = Date.now();
      state.elapsedMs = state.endedAt - state.startedAt;
      state.estimatedCostUsd = estimateCost(state.provider, state.elapsedMs);
      return state;
    }
  };
}

export function estimateCost(provider, ms) {
  const seconds = ms / 1000;
  if (provider === "xmax") return { usd: +(seconds / 3600 * 6).toFixed(3), note: "媒体口径 $6/小时，未核实" };
  if (provider === "decart") return { usd: +(seconds * 0.02).toFixed(3), note: "按 $0.02/秒估算（用户提供口径），未核实" };
  return null;
}

export function startFrameMetrics(video) {
  const gaps = [];
  const timestamps = [];
  let active = true;
  let last = null;
  const callback = (_now, metadata) => {
    if (!active) return;
    const timestamp = Number(metadata?.mediaTime ?? video.currentTime ?? 0) * 1000;
    if (last !== null) gaps.push(timestamp - last);
    timestamps.push(timestamp);
    last = timestamp;
    video.requestVideoFrameCallback(callback);
  };
  if (typeof video.requestVideoFrameCallback === "function") video.requestVideoFrameCallback(callback);
  return {
    stop() {
      active = false;
      const durationMs = timestamps.length > 1 ? Math.max(1, timestamps.at(-1) - timestamps[0]) : 0;
      const sorted = [...gaps].sort((a, b) => a - b);
      const percentile = p => sorted.length ? sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * p))] : null;
      return {
        renderedFrames: timestamps.length,
        durationMs: Math.round(durationMs),
        averageFps: durationMs ? +(timestamps.length / durationMs * 1000).toFixed(2) : null,
        p50FrameGapMs: percentile(0.5) === null ? null : Math.round(percentile(0.5)),
        p90FrameGapMs: percentile(0.9) === null ? null : Math.round(percentile(0.9)),
        stallsOver200ms: gaps.filter(gap => gap > 200).length,
        stallsOver500ms: gaps.filter(gap => gap > 500).length,
        maxFrameGapMs: gaps.length ? Math.round(Math.max(...gaps)) : null
      };
    }
  };
}

// 换装生效检测：在 set() 之前创建 monitor，调用 set 后等待画面变化
export function watchSetLatency(video, { stallThresholdMs = 600, waitNoStallMs = 3000, timeoutMs = 40000 } = {}) {
  if (typeof video.requestVideoFrameCallback !== "function") {
    return { monitor: { markSet() {} }, result: Promise.resolve({ latencyMs: null, note: "环境不支持 requestVideoFrameCallback，无法自动测延迟" }) };
  }
  let setAt = null;
  let last = null;
  let stalledAt = null;
  let settled = false;
  let resumeTimer = null;
  let noStallTimer = null;
  let resolve;
  const result = new Promise(r => { resolve = r; });

  const finish = value => {
    if (settled) return;
    settled = true;
    if (noStallTimer) clearTimeout(noStallTimer);
    if (resumeTimer) clearTimeout(resumeTimer);
    resolve(value);
  };

  const cb = now => {
    if (settled) return;
    if (last === null) { last = now; video.requestVideoFrameCallback(cb); return; }
    const gap = now - last;
    last = now;
    if (stalledAt === null && gap > stallThresholdMs) {
      stalledAt = now;
      resumeTimer = setTimeout(() => finish({ latencyMs: null, note: "画面停顿后 20s 未恢复（可能断连或卡死）" }), 20000);
    } else if (stalledAt !== null && gap <= stallThresholdMs * 2) {
      finish({
        latencyMs: Math.round(performance.now() - setAt),
        stallMs: Math.round(now - stalledAt),
        note: "换装重生成停顿后恢复"
      });
      return;
    }
    video.requestVideoFrameCallback(cb);
  };
  video.requestVideoFrameCallback(cb);

  const monitor = {
    markSet() {
      setAt = performance.now();
      if (noStallTimer) clearTimeout(noStallTimer);
      noStallTimer = setTimeout(() => {
        finish(
          last === null
            ? { latencyMs: null, note: "输出流持续无帧（可能在等待首帧/生成中）" }
            : { latencyMs: Math.round(performance.now() - setAt), seamless: true, note: "未检测到停顿，换装为无缝衔接（<3s）" }
        );
      }, waitNoStallMs);
    }
  };
  setTimeout(() => { if (!settled) finish({ latencyMs: null, note: "等待画面变化超时（40s）" }); }, timeoutMs);
  return { monitor, result };
}

// 从输出视频截一帧（JPEG dataURL）
export function captureFrame(video, { width = 640 } = {}) {
  if (!video || !video.videoWidth) return null;
  const scale = width / video.videoWidth;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = Math.round(video.videoHeight * scale);
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.8);
}

export function waitFirstFrame(video, timeoutMs = 30000) {
  return new Promise((resolve, reject) => {
    const hasPixels = () => video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0;
    if (hasPixels()) return resolve();
    const timer = setTimeout(() => { cleanup(); reject(new Error("首帧等待超时（输出流没有视频像素）")); }, timeoutMs);
    const poll = setInterval(() => { if (hasPixels()) { cleanup(); resolve(); } }, 100);
    const onFrame = () => { if (hasPixels()) { cleanup(); resolve(); } };
    const onError = () => { cleanup(); reject(new Error("输出视频加载失败")); };
    function cleanup() {
      clearTimeout(timer);
      clearInterval(poll);
      video.removeEventListener("loadeddata", onFrame);
      video.removeEventListener("resize", onFrame);
      video.removeEventListener("error", onError);
    }
    video.addEventListener("loadeddata", onFrame);
    video.addEventListener("resize", onFrame);
    video.addEventListener("error", onError);
  });
}

export function waitMediaLoaded(el, timeoutMs = 20000) {
  return new Promise((resolve, reject) => {
    if (el.readyState >= 2) return resolve();
    const timer = setTimeout(() => { cleanup(); reject(new Error("媒体加载超时")); }, timeoutMs);
    const onLoaded = () => { cleanup(); resolve(); };
    const onError = () => { cleanup(); reject(new Error("媒体加载失败（检查转码产物是否生成）")); };
    function cleanup() { clearTimeout(timer); el.removeEventListener("loadeddata", onLoaded); el.removeEventListener("error", onError); }
    el.addEventListener("loadeddata", onLoaded);
    el.addEventListener("error", onError);
  });
}

export function loadFile(url) {
  return fetch(url).then(r => {
    if (!r.ok) throw new Error(`加载 ${url} 失败: ${r.status}`);
    return r.blob();
  });
}

export function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

export async function postResults(payload) {
  const runId = payload.runId || new URLSearchParams(location.search).get("runId") || "manual";
  const res = await fetch(`/api/results/${encodeURIComponent(runId)}/${payload.provider}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("结果上报失败: " + (await res.text()));
}

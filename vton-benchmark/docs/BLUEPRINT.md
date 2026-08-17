# VTON Benchmark Blueprint

## Objective

Use the same person video, garment references, scenario intent, and duration to produce a repeatable Xmax ClothX versus Decart Lucy VTON comparison.

## Main journey

1. Validate local assets and server-side credentials.
2. Transcode one fixed source video into the shared benchmark input.
3. Run Xmax and Decart sequentially to avoid local encoder and bandwidth contention.
4. Save raw metrics, screenshots, logs, and configuration under one immutable run ID.
5. Generate a separate readable report for manual visual scoring.

## Capability boundary

- Real: provider authentication, realtime sessions, output frames, timing, screenshots, and errors.
- Estimated: cost figures until reconciled with provider billing.
- Manual: garment fidelity, body consistency, occlusion quality, safety, and overall usability.
- Diagnostic only: Decart codec, WebRTC, and network investigation pages.

## Result layout

```text
runs/<run-id>/
  manifest.json
  xmax.json
  decart.json
  shots/
  transcoded/
reports/<run-id>/
  comparison.md
```

## Acceptance criteria

- Both providers consume the same fixed video and garment files in one run.
- Providers run sequentially and failures remain visible in the report.
- Decart's SDK worker is served successfully instead of returning 404.
- Raw evidence and readable reports never overwrite a previous run.
- The report records environment, SDK/model, input, prompt, timing, stability, and manual scoring fields.

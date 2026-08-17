const results = [
  { name: "蓝白条纹休闲套装", image: "assets/苏美达素材(1)/款1 服装上身.jpg" },
  { name: "米白蓝棕格衬衫", image: "assets/苏美达素材(1)/款3 服装上身.jpg" }
];

let currentIndex = 0;
const image = document.querySelector("#result-image");
const name = document.querySelector("#result-name");
const count = document.querySelector("#result-count");
const download = document.querySelector("#download-result");
const dots = document.querySelector("#result-dots");

function renderResult() {
  const result = results[currentIndex];
  image.src = result.image;
  image.alt = `试穿结果 ${currentIndex + 1}`;
  name.textContent = result.name;
  count.textContent = `${currentIndex + 1} / ${results.length}`;
  download.href = result.image;
  dots.innerHTML = results.map((_, index) => `<i class="${index === currentIndex ? "active" : ""}" aria-hidden="true"></i>`).join("");
}

document.querySelector("#previous-result").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + results.length) % results.length;
  renderResult();
});

document.querySelector("#next-result").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % results.length;
  renderResult();
});

renderResult();

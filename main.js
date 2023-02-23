import "./style.scss";
import imgURL from "./public/300.png";
import { setupCounter } from "./counter.js";

let container;
function init() {
  document.querySelector("#app").innerHTML = `
    <div class="container">
      <h1>JAVASCRIPT ASSESSMENT TEST</h1>
      <div id="image-container" class="image-container"></div>
      <div>
        <button id="add-button" type="button">Add some images</button>
        <button id="inject" type="button">Inject script</button>
      </div>
    </div>
  `;
  container = document.getElementById("image-container");
  document
    .getElementById("add-button")
    .addEventListener("click", () => addImages());
  addImages();
}

// add images
function addImages(numImages = 5) {
  // loop to create and add dummy images to the container
  for (let i = 1; i <= numImages; i++) {
    const img = document.createElement("img");
    img.src = `https://via.placeholder.com/150x150?text=Image+${i}`;
    img.alt = ``;
    container.appendChild(img);
  }
}

init();

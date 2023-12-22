function initFallingBackground() {
  const imageSources = [
    "images/ice.gif",
    
    // Add more image sources as needed
  ];

  new FallingImages(30, imageSources);
  checkAnimationClass();
}

const rootStyles = window.getComputedStyle(document.documentElement);

class FallingImages {
  constructor(imgNum, imageSources) {
    if (document.querySelector(".falling-random .random__block")) {
      this.imgNum = imgNum || 10;
      this.imageSources = imageSources || [];
      this.init();
    }
  }
  
  init() {
    this.image = document.createElement("div");
    this.image.classList.add('falling-random-image');
  
    for (let i = 0; i < this.imgNum; i++) {
      const imageData = this.imageSources[Math.floor(Math.random() * this.imageSources.length)];
      this.clone(imageData, i);
    }
  }

  clone(imageData, i) {
    const myContainer = document.querySelector(".random__layer");
    const imageClone = this.image.cloneNode(true); 
    const imageStyle = imageClone.style;
    const regex = /[+-]?\d+(\.\d+)?/g;
  
    const fSize = Number(rootStyles.getPropertyValue("--size")) || 22;
    const fSizeMin = Number(rootStyles.getPropertyValue("--size-min")) || 12;
    const animeDuration = Number(rootStyles.getPropertyValue("--time")) || 8;
  
    imageStyle.backgroundImage = `url(${imageData})`;
    imageStyle.left = 100 * Math.random() + "%";
    imageStyle.width = Math.random() + 0.8 + "em";
    imageStyle.height = imageStyle.width;
    imageStyle.fontSize = fSize * Math.random() + fSizeMin + "px";
    imageStyle.animationDelay = 8 * Math.random() + "s";
    imageStyle.animationDuration = animeDuration * Math.random() + 6 + "s";
    
    const blurValue = 2 - parseFloat(imageStyle.width.match(regex) * 2);
  
    myContainer.appendChild(imageClone);
  
    imageClone.addEventListener("animationend", () => {
      imageClone.remove();
      const newImageData = this.imageSources[Math.floor(Math.random() * this.imageSources.length)];
      this.clone(newImageData, i);
    });
  }
}

function checkAnimationClass() {
  const bgContainer = document.querySelector(".bg__container");
  const classLength = bgContainer.classList.length;

  if (classLength === 1){ 
    bgContainer.classList.remove('bg__container');
  } else {
    bgContainer.classList.add('active');
  }
}

document.addEventListener("DOMContentLoaded", initFallingBackground);

import { appleSvg, pepperSvg } from "./svgs.js";

export const Renderer = () => {
  const renderItems = (items) => {
    const itemsContainer = document.querySelector(".object-container");
    itemsContainer.innerHTML = "";

    for (const item of items) {
      itemsContainer.appendChild(_createItem(item.id, item.isGood));
    }
  };

  const _createItem = (id, isGood) => {
    const item = document.createElement("div");
    item.dataset.id = id;
    item.classList.add("item");

    if (isGood) {
      item.innerHTML = appleSvg;
      item.classList.add("good");
    } else {
      item.innerHTML = pepperSvg;
      item.classList.add("bad");
    }

    item.style.transform = `scale(${_getRandomScale()})`;
    item.style.top = `${_getRandomPos(80)}%`;
    item.style.left = `${_getRandomPos(80)}%`;
    item.style.color = `${_getRandomColor()}`;
    return item;
  };

  const _getRandomScale = () => {
    return Math.random() * (1.5 - 0.5) + 0.5;
  };

  const _getRandomPos = (max) => {
    return Math.floor(Math.random() * max);
  };

  const _getRandomColor = () => {
    const colors = ["rgb(116, 195, 101)", "rgb(255, 225, 53)", "rgb(205, 92, 92)"];
    return colors[Math.floor(Math.random() * 3)];
  };

  return { renderItems };
};

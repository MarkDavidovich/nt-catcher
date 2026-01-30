// will process data from model into html elements for the controller
// will randomize item colors between green, yellow and red and item scale
export const Renderer = () => {
  //add item svgs
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
      item.classList.add("good");
    } else {
      item.classList.add("bad");
    }

    item.style.transform = `scale(${_getRandomScale})`; // sets a random scale from 0.5 to 1.5

    return item;
  };

  const _getRandomScale = () => {
    return Math.random() * (1.5 - 0.5) + 0.5;
  };

  return { renderItems };
};

//will hold an array of objects to spawn
//if item isGood, it will be an apple, if not, a pepper

export const Item = () => {
  const _items = [];
  let _idCounter = _items.length;

  const getItems = () => {
    return [..._items];
  };

  const addItem = (isGood) => {
    _items.push({ id: _idCounter++, isGood });
  };

  const deleteItem = (id) => {
    const itemIdx = _items.findIndex((i) => i.id === id);
    if (itemIdx !== -1) {
      _items.splice(itemIdx, 1);
    }
  };

  const checkItems = () => {
    //checks if the only items remaining are bad
    if (_items.length > 0) {
      if (_items.every((item) => item.isGood === false)) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  };

  const removeAllItems = () => {
    _items.length = 0;
  };

  return {
    getItems,
    addItem,
    deleteItem,
    checkItems,
    removeAllItems,
  };
};

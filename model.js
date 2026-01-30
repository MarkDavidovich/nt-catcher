//will hold an array of objects to spawn
//if item isGood, it will be an apple, if not, a pepper

export const Item = () => {
  const _items = [
    { id: 1, isGood: true },
    { id: 2, isGood: false },
    { id: 3, isGood: true },
    { id: 4, isGood: false },
  ];
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

  return {
    getItems,
    addItem,
    deleteItem,
  };
};

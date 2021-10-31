export const updateItems = (items, modifiedItem) =>
  items.map(item => {
    if (item._id === modifiedItem._id)
      return { ...modifiedItem }
    else
      return item
  })
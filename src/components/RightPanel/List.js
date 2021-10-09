import { useEffect, useState } from "react";
import Listitem from "../ListItem/Listitem"
import styles from './RightPanel.module.css'

const categoriseItems = (items) => items.reduce((accumulatorObject, currentObject) => {
  accumulatorObject[currentObject.item.category] = accumulatorObject[currentObject.item.category] || [];
  accumulatorObject[currentObject.item.category].push(currentObject);
  return accumulatorObject;
}, Object.create(null))

const List = ({ items, isEditState, setIsEditState }) => {
  const [categorisedItems, setCategorisedItems] = useState(null)
  useEffect(() => {
    if (items) setCategorisedItems(categoriseItems(items))
  }, [items])

  useEffect(() => {
    setIsEditState(true)
  }, [])

  return (
    <>
      {categorisedItems && Object.entries(categorisedItems).map(([key, value]) =>
        <>
          <h4>{key}</h4>
          <ul className={styles.list}>
            {value.map(item =>
              <Listitem listItem={item} isEditState={isEditState} />
            )}
          </ul>
        </>)
      }
    </>
  )
}

export default List

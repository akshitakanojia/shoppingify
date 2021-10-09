import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from './ListPage.module.css';
import CategoryWise from "../../components/CategoryWise/CategoryWise";

const categoriseItems = (items) => items.reduce((accumulatorObject, currentObject) => {
  accumulatorObject[currentObject.item.category] = accumulatorObject[currentObject.item.category] || [];
  accumulatorObject[currentObject.item.category].push(currentObject);
  return accumulatorObject;
}, Object.create(null))

const ListPage = () => {
  const location = useLocation()
  const { list } = location.state;
  const [categorisedItems, setCategorisedItems] = useState(null)
  useEffect(() => {
    if (list.items) setCategorisedItems(categoriseItems(list.items))
  }, [list.items])
  return (
    <>
      <Link to='/history' className={styles.back}>
        <span className="material-icons-round">
          keyboard_backspace
        </span>
        <span>back</span>
      </Link>
      <h2>{list.name}</h2>
      <p className={styles.date}>
        <span className={`material-icons-round `}>event_note</span>
        {`${new Date(list.createdAt).toLocaleString()}`}
      </p>
      {
        categorisedItems && Object.entries(categorisedItems).map(([key, value]) =>
          <CategoryWise category={key} items={value} key={key} />
        )
      }
    </>
  )
}

export default ListPage

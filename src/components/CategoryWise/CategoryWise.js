import React from 'react';
import ItemBadge from '../ItemBadge/ItemBadge'
import styles from './CategoryWise.module.css'

const CategoryWise = ({ category, items }) => {

  return (
    <div className={styles.items_wrapper}>
      <h3 className={styles.title}>{category}</h3>
      <div className={styles.item_grid}>
        {items?.map((item,i) => {
          return (
            <React.Fragment key={i}>
              {item.quantity ? <ItemBadge key={item.item._id} item={item.item} quantity={item.quantity} /> : 
              <ItemBadge key={item._id} item={item} />}
            </React.Fragment>
          )
        })}
      </div>
    </div>    
  )
}

export default CategoryWise

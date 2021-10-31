import { useSelector, useDispatch } from "react-redux"

import styles from './RightPanel.module.css'
import { changeState } from '../../redux/rightpanelstate/rightpanel.actions'
import { addItem, clearItem } from '../../redux/cart/cart.actions'

const ItemDetails = () => {
  const id = useSelector(state => state.rightPanel.id)
  const item = useSelector(state => state.items.items.filter(item => item._id === id))[0];
  const added = useSelector(state => state.cart.cartItems.find(cartItem => cartItem.item._id === item._id));
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.main}>
        <button onClick={() => dispatch(changeState('list'))} className={styles.back_btn}><span className="material-icons-outlined">
          keyboard_backspace
        </span>back</button>
        {item.image && <img src={item.image} className={styles.item_img} alt={item.name} />}
        <section className={styles.item_det}>
          <span className={styles.item_det_title}>name</span>
          <p className={styles.item_det_txt}>{item.name}</p>
        </section>
        <section className={styles.item_det}>
          <span className={styles.item_det_title}>category</span>
          <p className={styles.item_det_txt}>{item.category}</p>
        </section>
        {item.note &&
          <section className={styles.item_det}>
            <span className={styles.item_det_title}>note</span>
            <p className={styles.item_det_txt}>{item.note}</p>
          </section>}
      </div>
      <div className={styles.form_button_wrapper}>
        <button className={`${styles.btn} ${styles.conflower_blue} ${styles.form_save}`} onClick={() => dispatch(changeState('item-edit'))}>edit</button>
        {added ? <button className={`${styles.btn} ${styles.form_save}`} onClick={() => dispatch(clearItem(item))}>Remove from list</button>
          : <button className={`${styles.btn} ${styles.form_save}`} onClick={() => dispatch(addItem(item))}>Add to list</button>}
      </div>
    </>
  )
}

export default ItemDetails

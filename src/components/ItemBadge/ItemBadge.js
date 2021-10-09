import React from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './ItemBadge.module.css'
import { changeState } from '../../redux/rightpanelstate/rightpanel.actions'
import { addItem, clearItem } from '../../redux/cart/cart.actions'
import { useSelector } from 'react-redux'

const ItemBadge = ({ item, quantity }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems)
  const added = !!cartItems?.find(cartItem => cartItem.item._id === item._id)
  const notifyAdd = () => toast.success(`${item.name} added to cart`)
  const notifyRemove = () => toast.success(`${item.name} removed from cart`)


  return (
    <>
    <div className={styles.badge}>
      <div className={styles.item_name} onClick={() => dispatch(changeState('item-view', item._id))}>{item.name}</div>
      {
        quantity ? <span>{quantity} pcs</span> :
          <div className={styles.icon}>
            {
              added ?
                <span className="material-icons-outlined" onClick={() => {dispatch(clearItem(item));notifyRemove()}}>close</span>
                : <span className="material-icons-round" onClick={() => { dispatch(addItem(item)); notifyAdd() }}>add</span>
            }
          </div>
      }
    </div>
    <ToastContainer position="top-left"
    autoClose={1000}/>
    </>
  )
}

export default ItemBadge

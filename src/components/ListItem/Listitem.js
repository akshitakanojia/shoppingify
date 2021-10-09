import { useDispatch } from "react-redux"
import { addItem, removeItem,clearItem,toggleCheck} from '../../redux/cart/cart.actions'
import styles from './ListItem.module.css'

const Listitem = ({listItem, isEditState}) => {
  const dispatch = useDispatch();
  const {item,quantity,checked}=listItem;
  
  return (
    <li className={styles.list_item}>
      {!isEditState&&<input type="checkbox" checked={checked} onChange={()=>dispatch(toggleCheck(item))}/>}
      <p className={styles.item_name}>{item.name}</p>
      {isEditState&&<div className={styles.item_option}>
        <span className={`material-icons-round ${styles.option}`} onClick={()=>dispatch(removeItem(item))}>remove</span>
        <span className={styles.quantity}>{quantity}</span>
        <span className={`material-icons-round ${styles.option}`} onClick={()=>dispatch(addItem(item))}>add</span>
        <span className={`material-icons-round ${styles.option}`} onClick={()=>dispatch(clearItem(item))}>delete</span>
      </div>}
      {!isEditState&&<span className={styles.quantity}>{quantity}</span>}
    </li>
  )
}

export default Listitem

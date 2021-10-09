import { useDispatch } from 'react-redux'

import styles from './RightPanel.module.css'
import cartImg from '../../assets/undraw_shopping_app_flsj 1.svg'
import bottle_icon from '../../assets/source.svg'
import { changeState } from '../../redux/rightpanelstate/rightpanel.actions'
import { useSelector } from 'react-redux'
import List from './List'

const Main = ({isEditState,setIsEditState}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const listName = useSelector(state => state.cart.name);
  
  return (
    <div className={styles.main}>
      <div className={styles.top_banner}>
        <div className={styles.img_btl}>
          <img src={bottle_icon} alt='bottle_icon' />
        </div>
        <div className={styles.top_banner_content}>
          <p>Didn’t find what you need?</p>
          <div >
            <button className={styles.add_item_button} onClick={() => dispatch(changeState('item-form'))}>Add item</button>
          </div>
        </div>
      </div>
      {cartItems?.length > 0 ?
        <>
          <div className={styles.list_title_box}>
            <h3>{listName}</h3>
            {isEditState?
            <span className="material-icons" style={{cursor:'pointer'}} onClick={()=>setIsEditState(prev=>!prev)}>
              east
            </span>
            :<span className="material-icons" style={{cursor:'pointer'}} onClick={()=>setIsEditState(prev=>!prev)}>
              edit
            </span>}
          </div>
          <List items={cartItems} isEditState={isEditState} setIsEditState={setIsEditState} />
        </> :
        <div className={styles.no_items_wrapper}>
          <h4>No items</h4>
          <img src={cartImg} alt="cartImg" className={styles.cart_img} />
        </div>}
    </div>
  )
}

export default Main

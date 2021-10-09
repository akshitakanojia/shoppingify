import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import styles from './RightPanel.module.css'
import { saveListName, saveList } from '../../redux/cart/cart.actions'

const Footer = ({isEditState}) => {
  const dispatch = useDispatch()
  const [listName, setListName] = useState('')
  const isCartEmpty = useSelector(state=>state.cart.cartItems?.length===0)

  const handleSave = (e) => {
    e.preventDefault()
    dispatch(saveListName(listName))
  }

  const handleCancel = () => {
    if(window.confirm("Are you sure you want to cancel this list?")){
      dispatch(saveList('cancelled'))
    }
  }

  return (
    <>
    {isEditState?<div className={styles.footer_wrapper}>
      <form className={styles.input_box} onSubmit={handleSave}>
        <input type="text" className={styles.save_input} 
        value={listName}
        onChange={(e)=>setListName(e.target.value)}
        placeholder="Enter a name" disabled={isCartEmpty} required/>
        <button className={`${styles.btn} ${styles.save_btn}`}>Save</button>
      </form>
    </div>
    :<div className={`${styles.form_button_wrapper} ${styles.white}`}>
    <button className={`${styles.btn} ${styles.form_cancel}`} onClick={handleCancel}>cancel</button>
    <button className={`${styles.btn} ${styles.form_save} ${styles.conflower_blue}`} onClick={()=>dispatch(saveList('completed'))}>Complete</button>
  </div>}
    </>
  )
}

export default Footer

import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Sidenav.module.css'
import logo from '../../assets/logo.svg'
import { useDispatch } from 'react-redux'
import { logoutAsync } from '../../redux/auth/auth.actions'
import { useSelector } from 'react-redux'
import { togglePanel } from '../../redux/rightpanelstate/rightpanel.actions'


const Sidenav = () => {
  const dispatch = useDispatch()
  const cartlength = useSelector(state=>state.cart.cartItems?.length)
  const handleLogout = () => {
    dispatch(logoutAsync())
  }

  return (
    <nav>
      <div><img src={logo} alt="logo" className={styles.logo} /></div>
      <div className={styles.menu}>
        <NavLink exact to='/' activeClassName={styles.item_active} className={`${styles.link} ${styles.menu_item}`}>
          <span className="material-icons-round">
            format_list_bulleted
          </span>
        </NavLink>
        <NavLink to='/history' activeClassName={styles.item_active} className={`${styles.link} ${styles.menu_item}`}>
          <span className="material-icons-round">
            replay
          </span>
        </NavLink>
        <NavLink to='/stats' activeClassName={styles.item_active} className={`${styles.link} ${styles.menu_item}`}>
          <span className="material-icons-round">
            insert_chart_outlined
          </span>
        </NavLink>
        <div className={`${styles.link} ${styles.menu_item}`} onClick={handleLogout}>
          <span className="material-icons-round">
            logout
          </span>
        </div>
      </div>
      <div className={styles.cart_icon_wrapper}>
        <span className={`material-icons-outlined ${styles.cart_icon}`}
          onClick={() => dispatch(togglePanel())}>
          shopping_cart
        </span>
        {cartlength?cartlength>0&&<span className={styles.cart_items_number}>{cartlength}</span>:<></>}
      </div>
    </nav>
  )
}

export default Sidenav

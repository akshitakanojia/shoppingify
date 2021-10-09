import React, { useState } from 'react'
import styles from './RightPanel.module.css'

import Footer from './Footer'
import Main from './Main'
import AddItemForm from './AddItemForm'
import { useSelector } from 'react-redux'
import ItemDetails from './ItemDetails'

const RightPanel = ({ showRightPanel }) => {
  // const [panelState, setPanelState] = useState('list');
  const panelState = useSelector (state=>state.rightPanel.panel_state)
  const [isEditState, setIsEditState] = useState(true)

  return (
    <div className={`${styles.right_container} ${showRightPanel ? '' : styles.hide} ${panelState === 'list' ? styles.cornsilk : panelState === 'item-view' ? styles.white : panelState === 'item-form' && styles.ghostwhite}`}>
      {
        panelState === 'list' ? <><Main isEditState={isEditState} setIsEditState={setIsEditState}/><Footer isEditState={isEditState}/></>
          : panelState === 'item-view' ? <ItemDetails/>
            : panelState === 'item-form' && <AddItemForm />
      }
    </div>
  )
}

export default RightPanel

import React, { useState } from 'react'
import styles from './RightPanel.module.css'

import Footer from './Footer'
import Main from './Main'
import AddItemForm from './AddItemForm'
import { useSelector } from 'react-redux'
import ItemDetails from './ItemDetails'

const RightPanel = () => {
  // const [panel_state, setpanel_state] = useState('list');
  const {panel_state,panelOpen} = useSelector (state=>state.rightPanel)
  const [isEditState, setIsEditState] = useState(true)

  return (
    <div className={`${styles.right_container} 
                    ${panelOpen ? '' : styles.hide} 
                    ${panel_state === 'list' ? styles.cornsilk 
                    : panel_state === 'item-view' ? styles.white 
                    : (panel_state === 'item-form' || panel_state === 'item-edit') && styles.ghostwhite}`}>
      {
        panel_state === 'list' ? <><Main isEditState={isEditState} setIsEditState={setIsEditState}/><Footer isEditState={isEditState} setIsEditState={setIsEditState}/></>
          : panel_state === 'item-view'? <ItemDetails/>
            : (panel_state === 'item-form' || panel_state === 'item-edit') && <AddItemForm />
      }
    </div>
  )
}

export default RightPanel

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import styles from './RightPanel.module.css'
import { addItem, editItem } from '../../redux/item/item.actions'
import { changeState } from '../../redux/rightpanelstate/rightpanel.actions'

const formInitialState = { name: '', note: '', image: '', category: '' }

const AddItemForm = () => {
  const dispatch = useDispatch();
  const { panel_state, id } = useSelector(state => state.rightPanel)
  const { items } = useSelector(state => state.items)
  const [data, setData] = useState(() => {
    if (panel_state === 'item-edit') {
      let matchItem = items.filter(item => item._id === id)[0]
      return {
        name: matchItem.name,
        note: matchItem.note,
        image: matchItem.image,
        category: matchItem.category
      }
    }
    else {
      return formInitialState
    }
  })
  const [errorField, setErrorField] = useState({ name: false, category: false })

  const handleChange = (e) => {
    let { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const formIsValid = () => {
    if (data.name.length > 0 && data.category.length > 0) {
      setErrorField({ name: false, category: false })
      return true
    }
    else if (data.name.length === 0 && data.category.length === 0) {
      setErrorField({ name: true, category: true })
      return false
    }
    else if (data.name.length === 0) {
      setErrorField({ name: true, category: false })
      return false
    }
    else if (data.category.length === 0) {
      setErrorField({ name: false, category: true })
      return false
    }
  }

  const handleSubmit = () => {
    if (formIsValid()) {
      if (panel_state === 'item-edit') {
        dispatch(editItem(data, id))
        setData(formInitialState)
      }
      else if (panel_state === 'item-form') {
        dispatch(addItem(data))
        setData(formInitialState)
      }
    }
  }

  return (
    <>
      <div className={styles.main}>
        <form className={styles.form}>
          <h2 className={styles.form_title}>
            {panel_state === 'item-edit' ? "Edit item" : "Add a new item"}
          </h2>
          <div className={styles.form_field}>
            <label htmlFor="name" className={styles.input_label}>Name*</label>
            <input type="text"
              name="name"
              placeholder="Enter a name"
              className={styles.add_item_input}
              value={data.name}
              onChange={handleChange} />
            {errorField.name && <span className={styles.error_msg}>Name cannot be empty</span>}
          </div>
          <div className={styles.form_field}>
            <label htmlFor="note" className={styles.input_label}>Note (optional)</label>
            <textarea type="text"
              name="note"
              placeholder="Enter a note"
              rows='4'
              className={`${styles.add_item_input} ${styles.textarea}`}
              value={data.note}
              onChange={handleChange} />
          </div>
          <div className={styles.form_field}>
            <label htmlFor="image" className={styles.input_label}>Image (optional)</label>
            <input type="text"
              name="image"
              placeholder="Enter a url"
              className={styles.add_item_input}
              value={data.image}
              onChange={handleChange} />
          </div>
          <div className={styles.form_field}>
            <label htmlFor="category" className={styles.input_label}>Category*</label>
            <input type="text"
              name="category"
              placeholder="Enter a category"
              className={styles.add_item_input}
              value={data.category}
              onChange={handleChange} />
            {errorField.category && <span className={styles.error_msg}>Category cannot be empty</span>}
          </div>
        </form>
      </div>
      <div className={styles.form_button_wrapper}>
        <button className={`${styles.btn} ${styles.form_cancel}`}
          onClick={() => dispatch(changeState('list'))}>cancel</button>
        <button className={`${styles.btn} ${styles.form_save}`} onClick={handleSubmit}>Save</button>
      </div>
    </>
  )
}

export default AddItemForm

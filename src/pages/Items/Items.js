import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './Items.module.css';
import { fetchItems } from '../../redux/item/item.actions';
import CategoryWise from '../../components/CategoryWise/CategoryWise';
import { getList } from '../../redux/cart/cart.actions';
import emptyImg from '../../assets/undraw_Empty_re_opql.svg';
import { changeState } from '../../redux/rightpanelstate/rightpanel.actions'

const categoriseItems = (items) => items.reduce((accumulatorObject, currentObject) => {
  accumulatorObject[currentObject.category] = accumulatorObject[currentObject.category] || [];
  accumulatorObject[currentObject.category].push(currentObject);
  return accumulatorObject;
}, Object.create(null))

const Items = ({setShowRightPanel}) => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items.items)
  const loading = useSelector(state => state.items.fetch_item_start)
  const error = useSelector(state => state.items.fetch_item_error)
  const [categorisedItems, setCategorisedItems] = useState(null)

  useEffect(() => {
    dispatch(fetchItems())
    dispatch(getList())
  }, [])

  useEffect(() => {
    if (items) setCategorisedItems(categoriseItems(items))
  }, [items])

  return (
    <>
      <div className={style.titleWrapper}>
        <div className={style.title}>
          <span className={style.highlight}>Shoppingify</span> allows you take your shopping list wherever you go
        </div>
        <div className={style.search}>
          <input type="text" className={style.search_input} placeholder="search item" />
        </div>
      </div>
      {
        loading?<div>Fetching items...</div>
        :error?<div>Error fetching items</div>
        :items?.length===0?
        <div className={style.empty_wrapper}>
        <img src={emptyImg} className={style.empty_img}/>
        <button className={style.add_btn} onClick={()=>{setShowRightPanel(true);dispatch(changeState('item-form'))}}>Add Item</button>
        </div>:
        categorisedItems && Object.entries(categorisedItems).map(([category, items]) =>
          <CategoryWise category={category} items={items} key={category}/>
        )
      }
    </>
  )
}

export default Items

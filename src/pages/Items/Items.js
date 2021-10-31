import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './Items.module.css';
import { fetchItems } from '../../redux/item/item.actions';
import CategoryWise from '../../components/CategoryWise/CategoryWise';
import { getList } from '../../redux/cart/cart.actions';
import emptyImg from '../../assets/undraw_Empty_re_opql.svg';
import { changeState, togglePanel } from '../../redux/rightpanelstate/rightpanel.actions'

const categoriseItems = (items) => items.reduce((accumulatorObject, currentObject) => {
  accumulatorObject[currentObject.category] = accumulatorObject[currentObject.category] || [];
  accumulatorObject[currentObject.category].push(currentObject);
  return accumulatorObject;
}, Object.create(null))

const Items = () => {
  const dispatch = useDispatch();
  const { items, fetch_item_start: loading, fetch_item_error: error } = useSelector(state => state.items)
  const [filteredItems, setFilteredItems] = useState(null)
  const [categorisedItems, setCategorisedItems] = useState(null)
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    dispatch(fetchItems())
    dispatch(getList())
  }, [])

  useEffect(() => {
    if (items) {
      if (searchString?.length > 0) {
        setCategorisedItems(categoriseItems(items?.filter(item => {
          if (item.name?.toLowerCase().includes(searchString.toLowerCase()) ||
            item.category?.toLowerCase().includes(searchString.toLowerCase())

          )
            return item
        })))
      }
      else {
        setCategorisedItems(categoriseItems(items))
      }
    }
  }, [items, searchString])

  return (
    <>
      <div className={style.titleWrapper}>
        <div className={style.title}>
          <span className={style.highlight}>Shoppingify</span> allows you take your shopping list wherever you go
        </div>
        <div className={style.search}>
          <input type="text"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            className={style.search_input}
            placeholder="search item" />
        </div>
      </div>
      {
        loading && items?.length === 0 ? <div>Fetching items...</div>
          : error ? <div>Error fetching items</div>
            : items?.length === 0 ?
              <div className={style.empty_wrapper}>
                <img src={emptyImg} className={style.empty_img} />
                <button className={style.add_btn} onClick={() => { dispatch(togglePanel()); dispatch(changeState('item-form')) }}>Add Item</button>
              </div> :
              categorisedItems && Object.entries(categorisedItems).map(([category, items]) =>
                <CategoryWise category={category} items={items} key={category} />
              )
      }
    </>
  )
}

export default Items

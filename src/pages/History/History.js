import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import styles from './History.module.css'
import HistoryCard from '../../components/HistoryCard/HistoryCard';
import { getList } from '../../redux/cart/cart.actions'

const History = () => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.cart.lists)

  useEffect(() => {
    dispatch(getList())
  }, [])

  return (
    <div>
      <h2>Shopping History</h2>
      {lists?.length>0?<ul className={styles.list}>
      {
        lists?.map(list =>
          <HistoryCard key={list._id} list={list} />
        )
      }
      </ul>:<div className={styles.info}>No List to show</div>}
    </div>
  )
}

export default History

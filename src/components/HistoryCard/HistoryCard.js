import { Link } from 'react-router-dom'

import styles from './HistoryCard.module.css'

const HistoryCard = ({ list }) => {
  return (
    <li className={styles.card}>
      <h4>{list.name}</h4>
      <div className={styles.details}>
        <p className={styles.date}>
          <span className={`material-icons-round ${styles.calendar_icon}`}>event_note</span> 
          {`${new Date(list.createdAt).toLocaleString()}`}
        </p>
        <span className={`${styles.status_badge} ${list.status==='completed'?styles.blue:list.status==='cancelled'&&styles.red}`}>{list.status}</span>
        <Link to={{
          pathname:`/history/${list.name}-${list._id.slice(-4)}`,
          state:{
            list
          }
        }}><span className={`material-icons-round ${styles.next_icon}`}>arrow_forward_ios</span></Link>
      </div>
    </li>
  )
}

export default HistoryCard

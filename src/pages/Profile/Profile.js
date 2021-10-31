import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, logoutAllAsync } from '../../redux/auth/auth.actions';
import styles from './Profile.module.css'

const Profile = () => {
  const { user, fetchingUser, fetchUserError } = useSelector(state => state.auth);
  const dipatch = useDispatch()

  useEffect(() => {
    if (!user) dipatch(fetchUser())
  }, [])
  return (
    <div className={styles.profile_container}>
      <h3 className={styles.title}>Account Info</h3>
      {
        (fetchingUser && !user) ? <div>Fetching info...</div>
          : fetchUserError ? <div>Error fetching info</div>
            : user &&
            <>
              <p className={styles.user_info}><strong>Email</strong> : {user.email}</p>
              <button className={styles.button} onClick={() => dipatch(logoutAllAsync())}>Logout all sessions</button>
            </>
      }
    </div>
  )
}

export default Profile

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import styles from './Signin.module.css'
import { signUp, signIn, errorReset } from '../../redux/auth/auth.actions'

const INITIAL_FROM_STATE = { email: '', password: '' };

const Signin = (props) => {
  const [formState, setFormState] = useState('sign-in')
  const [input, setInput] = useState(INITIAL_FROM_STATE)
  const dispatch = useDispatch()
  const { signupStart,
    signupError,
    token,
    userExist,
    signinStart,
    signinError } = useSelector(state => state.auth)

  const handleChange = (e) => {
    let { name, value } = e.target
    setInput(prev => ({ ...prev, [name]: value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState === 'sign-up') dispatch(signUp(input.email, input.password))
    else if (formState === 'sign-in') dispatch(signIn(input.email, input.password))
  }

  useEffect(() => {
    if (token) {
      props.history.push('/')
    }
  }, [token])

  useEffect(() => {
    setInput(INITIAL_FROM_STATE)
  }, [formState])

  return (
    !token && <div className={styles.form_wrapper}>
      <form className={styles.user_form} onSubmit={handleSubmit}>
        <h2>Welcome to Shoppingify !</h2>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input name="email"
          id="email"
          className={styles.input}
          value={input.email}
          onChange={handleChange}
          type="email" required />
        <label htmlFor="password" className={styles.label}>Password</label>
        <input name="password"
          id="password"
          className={styles.input}
          value={input.password}
          onChange={handleChange}
          type="password" required />
        {
          userExist ? <span className={styles.error_msg}>Account with this email already exist. Please try signing in.</span> :
            signupError ? <span className={styles.error_msg}>Unable to Sign up. Please try again.</span> :
              signinError && <span className={styles.error_msg}>{signinError}</span>
        }
        {
          formState === 'sign-up' ?
            <p className={styles.info}>
              Already registered? <span className={styles.highlight}
                onClick={() => {
                  if (!signinStart && !signupStart) {
                    setFormState('sign-in');
                    dispatch(errorReset());
                  }
                }}>Sign In</span> instead</p>
            : formState === 'sign-in' && <p className={styles.info}>
              Not registered yet? <span className={styles.highlight}
                onClick={() => {
                  if (!signinStart && !signupStart) {
                    setFormState('sign-up');
                    dispatch(errorReset());
                  }
                }}>Sign Up</span></p>
        }
        <div className={styles.button_wrapper}>
          <button className={styles.button} disabled={signupStart || signinStart}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Signin

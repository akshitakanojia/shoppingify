import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  const token = useSelector(state => state.auth.token)
  return (
    <Route
      render={(props) =>
        token ? Component?<Component {...props} {...rest} />:render()
          : <Redirect to='/authorize' />
      }
    />
  )
}

export default ProtectedRoute


import {  useNavigate } from "react-router-dom"
const navigate = useNavigate()
 const ProtectedRouteElement =  ({element: Component, ...props}) =>  {

  return ( 
    props.loggedIn ? <Component {...props} /> : navigate('/sign-up') 
  )
}

export default ProtectedRouteElement
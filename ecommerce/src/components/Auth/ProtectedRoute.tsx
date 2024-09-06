import { Navigate } from "react-router-dom"
import { useAppSelector } from "@store/hooks"

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const {accessToken} = useAppSelector(state => state.auths)
    if(!accessToken){
        return  <Navigate to="/login?message=login_required" replace={true} />
    }
  return (
    <>{children}</>
  )
}

export default ProtectedRoute
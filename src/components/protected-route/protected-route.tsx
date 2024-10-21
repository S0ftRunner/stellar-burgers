import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "../../services/store";
import { getUserDataSelector } from "../../services/slices/userDataSlice";
import { Preloader } from "@ui";

type TProtectedRouteProps = {
  children: React.ReactElement;
}

export const ProtectedRoute = ({children}: TProtectedRouteProps) => {

  const {data, isAuthChecked} = useSelector(getUserDataSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />
  }
  if (data) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!data) {
    return <Navigate to='/login' state={{from: location}}/>
  }

  return children;
}
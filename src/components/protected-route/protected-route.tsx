import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "../../services/store";
import { getUserDataSelector } from "../../services/slices/userDataSlice";
import { Preloader } from "@ui";

type TProtectedRouteProps = {
  children: React.ReactElement;
  anonymous?: boolean;
}

export const ProtectedRoute = ({children, anonymous = false}: TProtectedRouteProps) => {

  const {data, isAuthChecked, isAuth} = useSelector(getUserDataSelector);
  const location = useLocation();
  const from = location.state?.from || '/';

  if (!isAuthChecked) {
    return <Preloader />
  }

  if (anonymous && isAuth) {
    return <Navigate to={ from } />;
  }

  if (!data.email || !data.name) {
    return <Navigate to='/login' state={{from: location}}/>
  }

  return children;
}
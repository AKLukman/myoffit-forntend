import { Navigate } from "react-router-dom";
import { logout, useCurrentToken } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { verifyToken } from "./verifyToken";




const ProtectedRoute = ({ children, role }) => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
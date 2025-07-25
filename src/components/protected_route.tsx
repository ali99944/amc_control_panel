import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';


interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAppSelector(state => state.auth);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
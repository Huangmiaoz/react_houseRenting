import { Navigate, useLocation } from 'react-router-dom';

import { isAuth } from '../../utils/auth';

const AuthRoute = ({ children }) => {
    const isLogin = isAuth();
    const location = useLocation();

    console.log('location',location);

    // 没登陆的跳转到登录界面
    if (!isLogin) {
        return (
            <Navigate to="/login" state={{ from: location }} />
        );
    }

    return children;
};

export default AuthRoute;
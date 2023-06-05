import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isAuth } from '../../utils/auth';

const AuthRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const isLogin = isAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 模拟异步鉴权检查
        await isLogin;

        if (!isLogin) {
          navigate('/login', { state: { from: location } });
        }

        setIsLoading(false);
      } catch (error) {
        // 处理鉴权错误
        console.error('鉴权出错:', error);
        // 跳转到错误页面
        navigate('/error');
      }
    };

    checkAuth();
  }, [isLogin, navigate, location]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default AuthRoute;

// import { Navigate, useLocation } from 'react-router-dom';

// import { isAuth } from '../../utils/auth';

// const AuthRoute = ({ children }) => {
//     const isLogin = isAuth();
//     const location = useLocation();

//     console.log('location',location);

//     // 没登陆的跳转到登录界面
//     if (!isLogin) {
//         return (
//             <Navigate to="/login" state={{ from: location }} />
//         );
//     }

//     return children;
// };

// export default AuthRoute;
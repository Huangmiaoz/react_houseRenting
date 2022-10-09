import { NavBar, TabBar } from 'antd-mobile';
import { Route, Switch, useHistory, useLocation, MemoryRouter as Router, } from 'react-router-dom';
import { AppOutline, MessageOutline, UnorderedListOutline, UserOutline, } from 'antd-mobile-icons';
import Routes from '../../routes';
const element = useRoutes(routes)
const Bottom = () => {
    const history = useHistory();
    const location = useLocation();
    const { pathname } = location;
    const setRouteActive = (value) => {
        history.push(value);
    };
    const tabs = [
        {
            key: '/home',
            title: '首页',
            icon: <AppOutline />,
        },
        {
            key: '/todo',
            title: '我的待办',
            icon: <UnorderedListOutline />,
        },
        {
            key: '/message',
            title: '我的消息',
            icon: <MessageOutline />,
        },
        {
            key: '/me',
            title: '个人中心',
            icon: <UserOutline />,
        },
    ];
    return (<TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
      {tabs.map(item => (<TabBar.Item key={item.key} icon={item.icon} title={item.title}/>))}
    </TabBar>);
};
export default () => {
    return (
        <Router initialEntries={['/home']}>
            <div className={styles.body}>
                {element}
            </div>
        </Router>
    );
};
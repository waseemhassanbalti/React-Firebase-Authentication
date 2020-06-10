import React from 'react';
import { Menu} from 'antd'
import { HomeOutlined,UserOutlined, ProfileOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

import ProductPage from '../Product' 

const Sidebar = () =>{

    return (
        <AuthUserContext.Consumer>
          {authUser =>
              authUser.roles ==="Admin" ? ( <NavigationAuth /> ) :( <NavigationNonAuth />)
          }
         </AuthUserContext.Consumer>
    );

}

const NavigationAuth = () => (
   
    <Menu>
        <Menu.Item icon={<HomeOutlined />} key='home'>
            <Link to={ROUTES.HOME}>Home</Link>
        </Menu.Item>
        <Menu.Item icon={<ProfileOutlined />} key='products'>
            <Link to={ROUTES.PRODUCT}>Product</Link>
        </Menu.Item>
        <Menu.Item icon={<UserOutlined />} key='appusers'>
            <Link to={ROUTES.APP_USERS}>App Users</Link>
        </Menu.Item>
        <Menu.Item icon={<UserOutlined />} key='webusers'>
            <Link to={ROUTES.WEB_USERS}>Web Users</Link>
        </Menu.Item>
    </Menu>
    
  );
   
const NavigationNonAuth = () => (
    <Menu>
        <Menu.Item icon={<HomeOutlined />} key='home'>
            <Link to={ROUTES.HOME}>Home</Link>
        </Menu.Item>
        <Menu.Item icon={<ProfileOutlined />} key='products'>
            <Link to={ROUTES.PRODUCT}>Product</Link>
        </Menu.Item>
   </Menu>
  );

export default Sidebar;
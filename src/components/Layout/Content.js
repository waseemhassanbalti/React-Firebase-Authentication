import React from 'react';
import * as ROUTES from '../../constants/routes';
import {Route } from 'react-router-dom';

import { Breadcrumb} from 'antd'
import HomePage from '../Home';
import AccountPage from '../Account';
import Logout from '../SignOut'
import PasswordForgetPage from '../PasswordForget';
import SignInPage from '../SignIn';
import ProductPage from '../Product';
import AppUserPage from '../AppUsers';
import WebUserPage from '../WebUsers' ;


const Contents = () =>{

    return (
    <>
    <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item> </Breadcrumb.Item>
    </Breadcrumb>
    <div className="container" style={{background:'#fff', padding:24, minHeight:580}}>

        <Route exact path={ROUTES.LANDING} component={SignInPage} />
        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.LOGOUT}  component={Logout} ></Route>
        <Route key="Products" path={ROUTES.PRODUCT}  component={ProductPage} ></Route>
        <Route path={ROUTES.APP_USERS}  component={AppUserPage} ></Route>
        <Route path={ROUTES.WEB_USERS}  component={WebUserPage} ></Route>     

    </div>
    </>
    )
}

export default Contents;
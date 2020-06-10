import React from 'react';
import { Menu} from 'antd'

import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';

const Headerbar = () =>{

    return (
        <>
        <div className="logo" />
                    
        <Menu theme="dark" mode="horizontal"  >
            <Menu.Item style={{float:"left"}} key="logo" > Rising Sun </Menu.Item>
            <Menu.Item style={{float:"right"}} key="signout"> <SignOutButton/> </Menu.Item>
            <Menu.Item style={{float:"right"}} key="account">
                <Link to={ROUTES.ACCOUNT} >Account</Link></Menu.Item>
            
        </Menu>
        

        </>
 
    );

}

export default Headerbar;
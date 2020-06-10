import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Layout, Avatar, Menu, Breadcrumb} from 'antd'
import '../../App.css';
import { Typography } from 'antd';
import AdminPage from '../Admin'
import Headerbar from './Header';

import { Row, CardBody,Card } from 'reactstrap';
import { Colxx } from '../Common/CustomBootstrap';
import { AuthUserContext, withAuthorization } from '../Session';
import HomePage from '../Home';
import AccountPage from '../Account';
import Logout from '../SignOut'
import PasswordForgetPage from '../PasswordForget';
import SignInPage from '../SignIn';
import ProductPage from '../Product';
import AppUserPage from '../AppUsers';
import WebUserPage from '../WebUsers' ;

import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { HomeOutlined,UserOutlined, ProfileOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar';
import Contents from './Content';

const { Title } = Typography;

const {Header, Footer, Sider, Content} = Layout;

const AppLayout = (props) =>{
    var pathname
    if(props.location.pathname=='/home')
    {
        pathname = "Home";
    }else if (props.location.pathname=='/account'){
        pathname = "Account";
    }else if (props.location.pathname=='/product'){
        pathname = "Product";
    }else if (props.location.pathname=='/web-users'){
        pathname = "Web Users";
    }else{
        pathname = "App Users";
    }
    return(
        <div className="cantainer" style={{backgroundColor:'#f0f2f5'}}>
            <Layout className="layout">
                <Header className="header">
                    <Headerbar/>
                </Header>

                <Layout>

                    <Sider>
                        <Sidebar/>
                    </Sider>

                    <Layout>                        
                    
                    <Content style={{ padding: '0 50px' }}>
                        <Row>
                            <Colxx sm="12">
                                <Card>
                                    <CardBody>
                                        <Breadcrumb style={{margin: '2px 0'}}>
                                            <Breadcrumb.Item><strong>{pathname}</strong></Breadcrumb.Item>
                                        </Breadcrumb>
                                    </CardBody>
                                </Card>
                            </Colxx>
                        </Row>
                        
                       <Contents/>

                    </Content>
                        <Footer style={{ textAlign: 'center' }}>Surmo ©2020 Created by Surmo Developers</Footer>
                    
                    </Layout>
                
                </Layout>
            </Layout>


        </div>

    )

}
 
const condition = authUser => !!authUser;
export default withAuthorization(condition)(AppLayout);
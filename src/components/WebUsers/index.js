import React from 'react';
import { compose } from 'recompose';
import {withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import { withFirebase } from '../Firebase';
import { Colxx } from '../Common/CustomBootstrap';
import { Row,Button,  Card,  CardTitle, CardBody,Table  } from 'reactstrap';
import { Modal, Space } from 'antd';
import AddUserModal from './AddNewWebUser';
import EditWebUserModal from './EditWebUser' 
import { AuthUserContext } from '../Session';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

class WebUserPage extends React.Component {
    constructor(props) {
        super(props);
     
        this.state = {
          loading: false,
          users: [],
        };

      }
      
      componentDidMount() {
          this.setState({ loading: true });
       
          this.props.firebase.users().on('value', snapshot => {
  
              const usersObject = snapshot.val();
              const usersList = Object.keys(usersObject).map(key => ({
                  ...usersObject[key],
                  uid: key,
              }));
  
              this.setState({
                users: usersList,
                loading: false,
              });
  
          });
        }
  
        componentWillUnmount() {
          this.props.firebase.users().off();
        }

          
        render() {
          const { users, loading } = this.state;
          console.log("Users: "+users+" loading: "+loading)

              const  users1 = users.filter((user) => {
                if (user.username !== 'Waseem Hassan'){
                  return true
                } else {
                  return false
                }
              })
           
              const  users2 = users.filter((user) => {
                if (user.roles !== 'Admin'){
                   return true
                } else {
                   return false
                }
              })
          
          let count = 1
          return (
              <>
              <AddUserModal/>
                {loading && <div>Loading ...</div>}
              <AuthUserContext.Consumer>
                {authUser =>
                    authUser.username ==="Waseem Hassan" ? (<UserList users={users1} counts={count}  />):(<UserList users={users2} counts={count}  /> )
                }
              </AuthUserContext.Consumer>
              </>
          );
        }
  }

  
  
class showUserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { visible: false, user:"" };
      }
      
    showModal = (user) => {
        this.setState({
        visible: true,
        user
        });
    };

    showDeleteConfirm =() => {
      confirm({
        title: 'Are you sure delete this task?',
        icon: <ExclamationCircleOutlined />,
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }

    handelDelete = (user, firebase) => {
     
          confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
              try{
              console.log(user.uid)
              firebase
                .user(user.uid)
                .remove()
              }catch(e){
                console.log(e.message)
              }
            },
            onCancel() {
              console.log('Cancel');
            },
          });
          //this.props.firebase
          //      .user(user.uid)
          //      .remove()
               // this.setState( {errormsg:"User Updated Successfully !"} );
               // this.setState({visible:true})

             
            
    };
    handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

render()
{
    var count= this.props.counts
    return(
        <Colxx xxs="12">
            <Card className="mb-4">
                <CardBody>
                    <CardTitle>
                     Web Users
                    </CardTitle>
                    <Table hover responsive>
                        <thead>
                            <tr>
                              <th>#</th>
                              <th>User Name</th>
                              <th>Email</th>
                              <th>Contact No</th>
                              <th>User Type</th>
                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.users.map(user => (
                              
                            <tr key={user.uid} >
                              <th scope="row">{count++}</th>
                              <td> {user.username}</td>
                              <td>{user.email}</td>
                              <td>{user.contactNo}</td>
                              <td>{user.roles}</td>
                              <td><Button type="primary" onClick={()=>this.showModal(user)}>
                                Edit
                              </Button></td>

                              <td><Button type="primary" onClick={()=>this.handelDelete(user, this.props.firebase)}>
                                Delete
                              </Button></td>
                            
                            </tr>
                            ))}
                            
                        </tbody>
                    </Table>
                    <Modal
                        title="Add New User"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={null}
                        >
                        <EditWebUserModal user={this.state.user} />
                        
                    </Modal>
                </CardBody>
            </Card>
        </Colxx>
    );
}

}
  
    
  //export default withFirebase(AdminPage);
  
  //const condition = authUser => !!authUser;
  


  const condition = authUser =>
  authUser && authUser.roles==="Admin";

  const UserList = compose(
    withAuthorization(condition),
    withFirebase,
  )(showUserList);

  export {UserList};
  export default compose(withAuthorization(condition),withFirebase,)(WebUserPage);
  
  
  //export default withAuthorization(condition)(AdminPage);
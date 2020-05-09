import React from 'react';
import { compose } from 'recompose';
import {withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import { withFirebase } from '../Firebase';

 
class AdminPage extends React.Component {
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
        console.log("Users: "+users+"loading "+loading)
        return (
          <div>
            <h1>Admin</h1>
            <p> The Admin Page is accessible by every signed in admin user.</p>
            {loading && <div>Loading ...</div>}
 
            <UserList users={users} />
          </div>
        );
      }
      
}

const UserList = ( {users} ) => (
    <ul>
      {users.map(user => (
        <li key={user.uid}>
          <span>
            <strong>ID: </strong> {user.uid}
          </span>
          <span>
            <strong>E-Mail: </strong> {user.email}
          </span>
          <span>
            <strong>Username: </strong> {user.username}
          </span>
          <span>
            <strong>Contact No : </strong> {user.contactNo}
          </span>
          <span>
            <strong>User Type : </strong> {user.roles}
          </span>

        </li>
      ))}
    </ul>
  );

  
//export default withFirebase(AdminPage);

//const condition = authUser => !!authUser;

const condition = authUser =>
authUser && authUser.roles==="Admin";
export default compose(withAuthorization(condition),withFirebase,)(AdminPage);


//export default withAuthorization(condition)(AdminPage);
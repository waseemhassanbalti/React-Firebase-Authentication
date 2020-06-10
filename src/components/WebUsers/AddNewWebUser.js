import React from 'react'
import { Modal, Button } from 'antd';
import SignUpPage from '../SignUp'

class AddUserModal extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
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

  render() {
    return (
      <div>
        <Button style={{marginLeft:"15px"}}  type="primary" onClick={this.showModal}>
          Add New Web User
        </Button>

        <Modal
          title="Add New User"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <SignUpPage />
        </Modal>
      </div>
    );
  }
}

export default AddUserModal;
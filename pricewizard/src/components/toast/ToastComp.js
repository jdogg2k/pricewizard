import { bool, string, func } from 'prop-types';
import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

class ToastComp extends React.Component {

    render() {
        return <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => this.props.stopToast()} show={this.props.confirm} delay={3000} autohide bg={this.props.toaststyle}>
        <Toast.Header>
          <strong className="me-auto">PriceWizard</strong>
          <small>now</small>
        </Toast.Header>
        <Toast.Body className='text-white'>{this.props.message}</Toast.Body>
      </Toast>
      </ToastContainer>
    }

}

ToastComp.propTypes = {
  confirm: bool,
  toaststyle: string,
  message: string,
  stopToast: func,
}

export default ToastComp
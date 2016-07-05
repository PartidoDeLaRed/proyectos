import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { registerUser } from '../../actions/firebase_actions'

class UserRegister extends Component {

  constructor (props) {
    super(props)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.state = {
      message: ''
    }
  }

  onFormSubmit (evt) {
    evt.preventDefault()

    this.props.registerUser({
      email: this.refs.email.value,
      password: this.refs.password.value
    }).then((data) => {
      if (data.payload.errorCode) {
        this.setState({message: data.payload.errorMessage})
      } else {
        browserHistory.push('/')
      }
    })
  }

  render () {
    let message = [<br/>]

    if (this.state.message) {
      message.push(
        <div className='alert alert-danger' role='alert'>
          {this.state.message}
        </div>
      )
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 col-lg-4'>
            <form id='frmRegister' role='form' onSubmit={this.onFormSubmit}>
              {message}
              <h2>Register</h2>
              <div className='form-group'>
                <label htmlFor='txtRegEmail'>Email</label>
                <input type='email' className='form-control' ref='email' id='txtEmail' placeholder='Enter email' name='email' />
                <small className='text-muted'>We'll never share your email with anyone else.</small>
              </div>
              <div className='form-group'>
                <label htmlFor='txtRegPass'>Password</label>
                <input type='password' className='form-control' ref='password' id='txtPass' placeholder='Password' name='password' />
              </div>
              <button type='submit' className='btn btn-primary btn-block'>Register</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({registerUser}, dispatch)
}

function mapStateToProps (state) {
  return {currentUser: state.currentUser}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister)

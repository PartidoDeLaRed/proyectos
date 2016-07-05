import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { resetPasswordEmail } from '../../actions/firebase_actions'

class ResetPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: ''
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onFormSubmit (event) {
    event.preventDefault()
    var email = this.refs.email.value
    this.props.resetPasswordEmail(email).then((data) => {
      if (data.payload.errorCode) {
        this.setState({message: data.payload.errorMessage})
      } else {
        this.setState({message: 'Please see your email!'})
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
          <div className='col-md-4'>
            <form role='form' onSubmit={this.onFormSubmit}>
              {message}
              <h2>Reset Password</h2>
              <div className='form-group'>
                <label htmlFor='txtEmail'>
                  Email address
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='txtEmail'
                  ref='email'
                  placeholder='Enter email'
                  name='email' />
              </div>
              <button type='submit' className='btn btn-primary btn-block'>
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({resetPasswordEmail}, dispatch)
}

export default connect(null, mapDispatchToProps)(ResetPassword)

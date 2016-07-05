import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changePassword } from '../../actions/firebase_actions'

class ChangePassword extends Component {
  constructor (props) {
    super(props)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.state = {message: ''}
  }

  onFormSubmit (event) {
    event.preventDefault()
    var password = this.refs.password.value
    var repeatPassword = this.refs.repeatPassword.value
    if (password !== repeatPassword) {
      this.setState({
        message: 'Passwords must match!'
      })
    } else {
      this.props.changePassword(password).then((data) => {
        if (data.payload.errorCode) {
          this.setState({message: data.payload.errorMessage})
        } else {
          this.setState({message: 'Password was changed!'})
        }
      })
    }
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
      <div className='row'>
        <div className='col-md-6'>
          <form id='ChangePassword' role='form' onSubmit={this.onFormSubmit}>
            {message}
            <div className='form-group'>
              <label htmlFor='password'>
                New Password
              </label>
              <input
                type='password'
                className='form-control'
                name='password'
                ref='password'
                id='password' />
            </div>
            <div className='form-group'>
              <label htmlFor='repeatPassword'>
                Repeat Password
              </label>
              <input
                type='password'
                className='form-control'
                name='repeatPassword'
                ref='repeatPassword'
                id='repeatPassword' />
            </div>
            <button type='submit' className='btn btn-primary btn-block'>Change</button>
          </form>
        </div>
      </div>
    )
  }

}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({changePassword}, dispatch)
}

function mapStateToProps (state) {
  return {currentUser: state.currentUser}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)

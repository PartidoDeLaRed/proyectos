import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loginUser, fetchUser } from '../../actions/firebase_actions'

class UserLogin extends Component {

  constructor (props) {
    super(props)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.state = {
      message: ''
    }
  }

  onFormSubmit (event) {
    event.preventDefault()

    var email = this.refs.email.value
    var password = this.refs.password.value
    this.props.loginUser({email: email, password: password}).then((data) => {
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
            <form id='frmLogin' role='form' onSubmit={this.onFormSubmit}>
              {message}
              <h2>Login</h2>
              <div className='form-group'>
                <label htmlFor='txtEmail'>Email</label>
                <input type='email' className='form-control' id='txtEmail' ref='email' placeholder='Enter email' name='email' />
              </div>
              <div className='form-group'>
                <label htmlFor='txtPass'>
                  Password
                </label>
                <input type='password' className='form-control' id='txtPass' ref='password' placeholder='Password' name='password' />
              </div>
              <button type='submit' className='btn btn-primary btn-block'>Login</button>
              <br/>
              <h6><Link to='/reset'>Forgot password?</Link></h6>
              <h6><Link to='/register'>Don't have a User? Register.</Link></h6>
              {/*
                <h4>Login with</h4>
                <a href='#' className='btn btn-primary bt-social' data-provider='facebook'>Facebook</a>
                <a href='#' className='btn btn-info bt-social' data-provider='twitter'>Twitter</a>
                <a href='#' className='btn btn-danger bt-social' data-provider='google'>Google+</a>
                <a href='#' className='btn btn-default bt-social' data-provider='github'>GitHub</a>
                <a href='#' className='btn btn-warning' id='btAnon'>Anon</a>
              */}
            </form>
          </div>
        </div>
      </div>
    )
  }

}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({loginUser, fetchUser}, dispatch)
}

function mapStateToProps (state) {
  return {currentUser: state.currentUser}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin)

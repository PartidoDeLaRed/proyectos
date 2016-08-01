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
    let message = []

    if (this.state.message) {
      message.push(
        <div className='alert alert-danger' role='alert'>
          {this.state.message}
        </div>
      )
    }

    return (
      <div className='container-small'>
        <form role='form' onSubmit={this.onFormSubmit}>
          {message}
          <h3>Recuperar Contraseña</h3>
          <p>Pasanos tu mail así te podemos eviar un link para cambiar tu contraseña.</p>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='txtEmail'
              ref='email'
              placeholder='Acá escribí tu email…'
              name='email' />
          </div>
          <button type='submit' className='btn btn-primary btn-block'>
            Recuperar
          </button>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({resetPasswordEmail}, dispatch)
}

export default connect(null, mapDispatchToProps)(ResetPassword)

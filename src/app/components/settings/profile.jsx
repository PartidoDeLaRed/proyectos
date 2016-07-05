import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, updateUser } from '../../actions/firebase_actions'
import Loading from '../helpers/loading'

class UserProfile extends Component {

  constructor (props) {
    super(props)
    this.props.fetchUser()
    this.state = {message: ''}
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onFormSubmit (event) {
    event.preventDefault()
    var email = this.refs.email.value
    var displayName = this.refs.displayName.value
    this.props.updateUser({email: email, displayName: displayName}).then((data) => {
      if (data.payload.errorCode) {
        this.setState({message: data.payload.errorMessage})
      } else {
        this.setState({message: 'Updated successfuly!'})
      }
    }
    )
  }

  render () {
    if (!this.props.currentUser) {
      return <Loading/>
    }

    let message = [<br/>]

    if (this.state.message) {
      message.push(
        <div className='alert alert-danger' role='alert'>
          {this.state.message}
        </div>
      )
    }

    return (
      <form id='frmProfile' role='form' onSubmit={this.onFormSubmit}>
        {message}
        <div className='form-group'>
          <label htmlFor='displayName'>Nombre</label>
          <input
            type='text'
            defaultValue={this.props.currentUser.displayName}
            className='form-control'
            ref='displayName'
            id='displayName'
            placeholder='Nombre completo'
            name='displayName' />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            defaultValue={this.props.currentUser.email}
            className='form-control'
            id='email'
            ref='email'
            placeholder='Email'
            name='email' />
        </div>
        <button type='submit' className='btn btn-primary btn-block'>Actualizar</button>
      </form>
    )
  }

}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchUser, updateUser}, dispatch)
}

function mapStateToProps (state) {
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)

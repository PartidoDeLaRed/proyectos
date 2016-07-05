import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, logoutUser } from '../actions/firebase_actions'

class App extends Component {
  constructor (props) {
    super(props)

    this.props.fetchUser()
    this.logOut = this.logOut.bind(this)
  }

  logOut () {
    this.props.logoutUser().then(() => {
      // reload props from reducer
      this.props.fetchUser()
    })
  }

  renderUserMenu (user) {
    if (user && user.uid) {
      return (
        <ul className='nav navbar-nav pull-xs-right'>
          <li className='nav-item dropdown'>
            <a
              className='nav-link dropdown-toggle'
              data-toggle='dropdown'
              href='#'
              role='button'
              aria-haspopup='true'
              aria-expanded='false'>
              <span className='icon-plus'></span>
            </a>
            <div className='dropdown-menu dropdown-menu-right'>
              <Link className='dropdown-item' to='/projects/new'>Crear Proyecto</Link>
            </div>
          </li>
          <li className='nav-item dropdown'>
            <a className='nav-link dropdown-toggle' data-toggle='dropdown' href='#' role='button' aria-haspopup='true' aria-expanded='false'>
              <span className='icon-user'></span>
            </a>
            <div className='dropdown-menu dropdown-menu-right'>
              <h6 className='dropdown-header'>{user.displayName || user.email}</h6>
              <div className='dropdown-divider'></div>
              <Link className='dropdown-item' to='/settings'>
                Configuración
              </Link>
              <Link className='dropdown-item' to='/logout' onClick={this.logOut}>
                Salir
              </Link>
            </div>
          </li>
        </ul>
      )
    } else {
      return (
        <div className='nav navbar-nav pull-xs-right'>
          <Link className='nav-item nav-link' to='/login'>
            <span className='hint--bottom-left' aria-label='Entrar…'>
              <span className='icon-login'></span>
            </span>
          </Link>
        </div>
      )
    }
  }

  render () {
    return (
      <div>
        <header className='header navbar navbar-fixed-top navbar-light bg-faded'>
          <div className='container'>
            <Link to='/' className='navbar-brand'>Proyectos</Link>
            <Link to='/' className='navbar-brand'>
              <small className='text-muted hidden-xs-down'>Partido de la Red</small>
            </Link>
            {this.renderUserMenu(this.props.currentUser)}
          </div>
        </header>
        <div className='navbar'><div className='navbar-brand'>&nbsp;</div></div>
        {this.props.children}
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchUser, logoutUser}, dispatch)
}

function mapStateToProps (state) {
  return {currentUser: state.currentUser}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

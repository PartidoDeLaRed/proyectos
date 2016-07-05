import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Settings extends Component {
  render () {
    return (
      <div className='container'>
        <br/>
        <h3><span className='icon-settings'>&nbsp;</span>Configuración</h3>
        <br/>
        <nav className='nav nav-pills'>
          <Link className='nav-item nav-link' activeClassName='active' to='/settings/profile'>
            <span className='icon-user'>&nbsp;</span>
            Perfil
          </Link>
          <Link className='nav-item nav-link' activeClassName='active' to='/settings/change-password'>
            <span className='icon-key'>&nbsp;</span>
            Cambiar Contraseña
          </Link>
        </nav>
        {this.props.children}
      </div>
    )
  }
}

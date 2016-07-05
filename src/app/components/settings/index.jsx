import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Settings extends Component {
  render () {
    return (
      <div className='container'>
        <br/>
        <nav className='nav nav-pills'>
          <Link className='nav-item nav-link' activeClassName='active' to='/settings/profile'>
            <span className='octicon octicon-person'>&nbsp;</span>
            Profile
          </Link>
          <Link className='nav-item nav-link' activeClassName='active' to='/settings/change-password'>
            <span className='octicon octicon-key'>&nbsp;</span>
            Change Password
          </Link>
        </nav>
        {this.props.children}
      </div>
    )
  }
}

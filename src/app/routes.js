import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'

import requireAuth from './utils/authenticated'
import App from './components'
import Home from './components/home'
import UserLogin from './components/user/login'
import UserLogout from './components/user/logout'
import UserRegister from './components/user/register'
import ResetPassword from './components/user/reset-password'
import Settings from './components/settings'
import SettingsProfile from './components/settings/profile'
import SettingsChangePassword from './components/settings/change-password'
import ProjectsNew from './components/projects/new'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/login' component={UserLogin} />
    <Route path='/logout' component={UserLogout} />
    <Route path='/register' component={UserRegister} />
    <Route path='/reset' component={ResetPassword} />
    <Route path='/settings' component={Settings} onEnter={requireAuth}>
      <IndexRedirect to='profile' />
      <Route path='profile' component={SettingsProfile} />
      <Route path='change-password' component={SettingsChangePassword} />
    </Route>
    <Route path='/projects' onEnter={requireAuth}>
      <Route path='new' component={ProjectsNew} />
    </Route>
  </Route>
)

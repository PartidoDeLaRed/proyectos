import firebase from 'firebase/app'
import 'firebase/auth'
import { FIREBASE_CONFIG } from '../config'
import { currentUserPromise, fetchUserObject } from './localstorage'

firebase.initializeApp(FIREBASE_CONFIG)

// FIREBASE TOOL OBJECT LITERAL
var FireBaseTools = {
  registerUser: (user) => {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then((user) => {
        // save user to localstorage
        fetchUserObject(user).then((user) => {
          resolve(user)
        })
      }).catch((error) => {
        reject({
          errorCode: error.code,
          errorMessage: error.message
        })
      })
    })
  },

  logoutUser: (user) => {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(function () {
        // Sign-out successful and clear data.
        window.localStorage.clear()
        resolve({
          success: 1,
          message: 'logout'
        })
      })
    })
  },

  fetchUser: () => {
    return new Promise((resolve, reject) => {
      currentUserPromise().then(resolve)

      firebase.auth().onAuthStateChanged((user) => {
        // resolve(firebase.auth().currentUser)
        if (user) {
          fetchUserObject(firebase.auth().currentUser).then(resolve)
        } else {
          resolve(null)
        }
      })
    })
  },

  loginUser: (user) => {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((user) => {
        // save user to localstorage
        fetchUserObject(user).then(resolve)
      }).catch((error) => {
        reject({
          errorCode: error.code,
          errorMessage: error.message
        })
      })
    })
  },

  updateUser: (u) => {
    return new Promise((resolve, reject) => {
      var user = firebase.auth().currentUser
      // ensure we have current user
      if (user) {
        user.updateProfile({
          displayName: u.displayName,
          photoUrl: '' // field for photo url
        }).then(() => {
          // renew user
          fetchUserObject(firebase.auth().currentUser).then(resolve)
        }, (error) => {
          reject({
            errorCode: error.code,
            errorMessage: error.message
          })
        })
      } else {
        resolve(null)
      }
    })
  },

  resetPasswordEmail: (email) => {
    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve({message: 'Email sent', errorCode: null})
      }, (error) => {
        // An error happened.
        reject({
          errorCode: error.code,
          errorMessage: error.message
        })
      })
    })
  },

  changePassword: (newPassword) => {
    return new Promise((resolve, reject) => {
      var user = firebase.auth().currentUser

      user.updatePassword(newPassword).then(() => {
        // renew user
        fetchUserObject(user).then((user) => {
          resolve(user)
        })
      }, (error) => {
        reject({
          errorCode: error.code,
          errorMessage: error.message
        })
      })
    })
  }

}

// export FirebaseTolls
export default FireBaseTools

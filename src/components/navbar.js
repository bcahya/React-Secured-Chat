import React from 'react'
import { connect } from 'react-redux'
import { logOutUser } from '../actions/index';
import { hashHistory, Link } from 'react-router';
import { store } from './App';


class NavBar extends React.Component {
  handleLogout(e) {
    e.preventDefault();
    //Deletes the access token from both possible storgae
    localStorage.removeItem('TOKEN_STORAGE_KEY');
    sessionStorage.removeItem('TOKEN_STORAGE_KEY');
    //Send Action so the navbar will be rerendered
    this.props.logOutUser()
    hashHistory.push('/login')
  }
  render() {
    if(!this.props.user.isLoggedIn) {
        return (
          <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <Link to={ '/' } className="navbar-brand">React-Phoenix-Chat</Link>
              </div>
              <div className="collapse navbar-collapse" id="navbar">
                <ul className="nav navbar-nav navbar-right">
                  <li><Link to='/login'>Login</Link></li>
                  <li><Link to='/register'>Register</Link></li>
                </ul>
              </div>
            </div>
          </nav>
        );
    } else {
        return (
          <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <Link to='/' className="navbar-brand">React-Phoenix-Chat</Link>
              </div>
              <div className="collapse navbar-collapse" id="navbar">
                <ul className="nav navbar-nav navbar-right">
                  <li> <a onClick={this.handleLogout.bind(this)} href="#">Logout</a></li>
                  <li><Link to='/update'>Update</Link></li>
                  <li><Link to='/updatepassword'>Update Password</Link></li>
                  <li><a href="#">{this.props.user.username}</a></li>
                </ul>
              </div>
            </div>
          </nav>
        );
    }
  }
}

let mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => { dispatch(logOutUser()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

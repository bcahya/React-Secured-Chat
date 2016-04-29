import { hashHistory } from 'react-router'

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    username: user.username,
    email: user.email
  }
}

export const logOutUser = () => {
  return {
    type: 'LOGOUT_USER'
  }
}

//Async action
export function verifyUserToken(routeType) {
  return function (dispatch) {
    let accessToken = null;
    if(localStorage.getItem('TOKEN_STORAGE_KEY')) {
      accessToken = localStorage.getItem('TOKEN_STORAGE_KEY');
    } else {
      accessToken = sessionStorage.getItem('TOKEN_STORAGE_KEY');
    }
    $.ajax({
      type: 'GET',
      url: 'http://localhost:4000/api/verifytoken/'+encodeURIComponent(accessToken),
      success: function(data) {
        console.log("data is: ", data);
        //let accessToken = data.token;
        sessionStorage.setItem('TOKEN_STORAGE_KEY', accessToken);
        dispatch(setUser(data));
      },
      error: function(error) {
        console.log(error);
        dispatch(logOutUser());
        if(routeType === 'securedRoutes') {
          hashHistory.push('/login');
        }
      },
    });
  }
}
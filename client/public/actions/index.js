import axios from 'axios';
import { browserHistory } from 'react-router';

export const ADD_MARKER = 'ADD_MARKER';
export const ADD_USER = 'ADD_USER';
export const GET_LOCATION = 'GET_LOCATION';
export const CHANGE_CLASSNAME = 'CHANGE_CLASSNAME';
export const CONVERT_LATLONG = 'CONVERT_LATLONG';
export const CONVERT_LOCATION = 'CONVERT_LOCATION';
export const SEARCH_USER_INPUT = 'SEARCH_USER_INPUT';
export const CURRENT_USER = 'CURRENT_USER';
export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const LOG_OUT = 'LOG_OUT';
export const GET_MARKER = 'GET_MARKER';
export const CURRENT_MARKER = 'CURRENT_MARKER';
export const HOVER_MARKER = 'HOVER_MARKER';
export const DISPLAY_MODAL = 'DISPLAY_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const LOAD_MODAL = 'LOAD_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const BAD_SUBMISSION = 'BAD_SUBMISSION';
export const JOIN_BONFIRE = 'JOIN_BONFIRE';
export const BAD_DROPDOWN = 'BAD_DROPDOWN';
export const BAD_DESCRIPTION = 'BAD_DESCRIPTION';
export const JOINED_USERS = 'JOINED_USERS';
export const USER_DATA = 'USER_DATA';

export function getMarkers() {
  const grabMarkersDB = axios.get('/bonfire');
  return (dispatch) => {
    return grabMarkersDB.then((response) => {
      let markers = response.data;
      markers.forEach(marker => {
        marker.showInfo = false;
      });

      dispatch({
        type: GET_MARKER,
        markers: markers
      })
    })
  }
}

export function getHoverMarker(marker) {
  return {
    type: HOVER_MARKER,
    payload: marker
  };
}

export function getJoinedUsers(markerId) {
  const getUsers = axios.get('/bonfire/users_bonfires/' + markerId);
  return (dispatch) => {
    return getUsers
    .then((response) => {
      dispatch({
        type: JOINED_USERS,
        joinedUsers: response.data,
        payload: {
          windowOpen: false
        }
      })
    });
  }
}

export function displayHoverModal() {
  return {
    type: DISPLAY_MODAL,
    payload: {
      windowOpen: true,
    }
  }
}

export function hideHoverModal(marker) {
  return {
    type: HIDE_MODAL,
    payload: {
      windowOpen: false
    }
  }
}

export function setCurrentMarker(marker) {
  return {
      type: CURRENT_MARKER,
      currMarker: marker
  };
}

export function addMarker(data) {
  return {
    type: ADD_MARKER,
    payload: data
  }
}

export function joinBonfire(userId, bonId) {
  const join = axios.put('/bonfire/join_bonfire/' + userId + '&'+ bonId);

  return (dispatch) => {
    return join
    .then((response) => {
      // console.log("You've joined the bonfire!");
      dispatch({
        type: JOIN_BONFIRE,
        payload: {
          bonId: bonId,
          userId: userId,
          allMembers: response.data
        }
      })
    browserHistory.push('/chats/' + bonId);
    });
  };
}

export function changeBonfireModalClassName(animation) {
  if(animation === "fadeIn"){
    return ({
      type: LOAD_MODAL,
      payload: 
      { 
        class: 
          { 
            bonfireModal: 'bonfireModal', 
            modelTextBox: 'modelTextBox',
            showModal: 'showModal',
            textColor: {
              color: 'black'
            },
            dropDownColor: {
              color: 'black'
            },
            textHint: 'Description'
          }
      }
    })
  }

  if(animation === "fadeOut") {
    return {
      type: CLOSE_MODAL,
      payload:
      {
        class:
          {
            bonfireModal: 'hidden',
            modelTextBox: 'hidden',
            showModal: 'hidden',
            textColor: {
              color: 'black'
            },
            dropDownColor: {
              color: 'black'
            },
            textHint: 'Description'
          }
      }
    }
  }

  if(animation === 'badSubmission') {
    return {
      type: BAD_SUBMISSION,
      payload:
      {
        class:
          {
            bonfireModal: 'bonfireModal',
            modelTextBox: 'modelTextBox',
            showModal: 'showModal',
            textColor: {
              color: 'black'
            },
            dropDownColor: {
              color: 'red'
            },
            textHint: 'Please select a tag and type a description thats longer than 3 characters'
          }
      }
    }
  }

  if(animation === 'badDescription') {
    return {
      type: BAD_DESCRIPTION,
      payload:
      {
        class:
          {
            bonfireModal: 'bonfireModal',
            modelTextBox: 'modelTextBox',
            showModal: 'showModal',
            textColor: {
              color: 'black'
            },
            dropDownColor: {
              color: 'black'
            },
            textHint: 'Your description must be larger than 3 characters'
          }
      }
    }
  }

  if(animation === "badDropDown"){
    return ({
      type: BAD_DROPDOWN,
      payload: 
      { 
        class: 
          { 
            bonfireModal: 'bonfireModal', 
            modelTextBox: 'modelTextBox',
            showModal: 'showModal',
            textColor: {
              color: 'black'
            },
            dropDownColor: {
              color: 'red'
            },
            textHint: 'Please select a tag'
          }
      }
    })
  }

}

export function addUser(user, picture, dispatch) {
  const userObject = {
    name: user.name,
    FB_id: user.id,
    FB_img: picture,
    FB_timeline: user.link,
    latitude: "",
    longitude: "",
    cityState: ""
  };

  const newUser = axios.post('/user', userObject);

  return (dispatch) => {
    return newUser.then(({
      data
    }) => {
      dispatch({
        type: ADD_USER,
        user: userObject
      })
    });
  }
}

export function sendDescription(modalObj) {
  const sendModal = axios.post('/bonfire', modalObj);

  return (dispatch) => {
    return sendModal.then((response) => {
      const chatID = response.data.chat[0].id;
      dispatch({ 
        type: ADD_MARKER,
        payload: response.data 
      })
    })
    .catch((err) => {
      console.log(err, 'error in sendDescription action');
    })
  }
}

export function getLocation(fbId) {
  console.log('getlocation')
  if (navigator.geolocation) {
    window.gettingLocation = true;
    const location = new Promise((resolve, reject) => {
      return navigator.geolocation.getCurrentPosition((position) => {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        localStorage.setItem('latitude', position.coords.latitude);
        localStorage.setItem('longitude', position.coords.longitude);
        resolve(pos);
      });
    });

    return (dispatch) => {
      // console.log("Getting user location...");
      return location.then((position) => {
        let formatPosition = { latitude: String(position.lat), longitude: String(position.lng) };
        const updateLocation = axios.put('/user/' + fbId, formatPosition);
        // console.log("Success!");
        window.gettingLocation = false;
        dispatch({
            type: GET_LOCATION,
            position: position
        })
        return updateLocation.then((response) => {
            // console.log("Updated location in database!");
        }).catch((err) => {
          console.log(err, "Error dispatching!");
        })
      })
      .catch((err) => {
        console.log("Unable to get user location!");
      });
    }
  }
}

export function searchAction(searchValue) {
  const convertedLocation = axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + searchValue + '&sensor=true');

  return (dispatch) => {
    return convertedLocation
    .then((response) => {
      let coordsResp = response.data.results[0].geometry.location;
      let coords = {
        latitude: coordsResp.lat,
        longitude: coordsResp.lng
      }
      dispatch({
        type: SEARCH_USER_INPUT,
        searchCoords: coords
      })
    })
    .catch((response) => {
      console.log(response, 'Error searching!');
    });
  };
};

// convertCoordsToLocation takes in a latitude and longitude and returns an address
// Example API call:
// https://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838&sensor=true

export function convertCoordsToLocation(latlng) {
  const apiCall = axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&sensor=true');
  return (dispatch) => {
    return apiCall.then((location) => {
      return location
    })
    .catch((err) => {
      console.log(err, ": error in convertCoordsToLocation action")
    }) 
  }
};

// convertLocationToCoords takes in a latitude and longitude and returns an address
// Example API call:
// https://maps.googleapis.com/maps/api/geocode/json?address=santamonica,ca&sensor=true

export function convertLocationToCoords(location) {
  const apiCall = new Promise((resolve, reject) => {
    let response;
    let coords;
    resolve(axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&sensor=true'))
      .then((payload) => {
        response = payload.data.results[0].geometry.location;
        coords = {
          latitude: response.lat,
          longitude: response.lng
        };
        return {
          data: coords
        }
      })
      .catch((response) => {
        console.log(response, 'Error converting location to coords');
      });
  });

  return (dispatch) => {
    return apiCall.then((coords) => {
      dispatch({
        type: CONVERT_LOCATION,
        coords: coords
      });
    });
  };
};

export function facebookLogin() {
  return (dispatch) => {
    return FB.login((response) => {
      if(response.authResponse) {
        browserHistory.push('/');
        dispatch({
          type: LOGIN_SUCCESSFUL,
          loggedIn: true
        })
      }
    });
  }
};

export function statusLoggedIn() {
  return (dispatch) => {
    dispatch({
      type: LOGIN_SUCCESSFUL,
      loggedIn: true
    })
  }
}

export function facebookLogout() {
  return (dispatch) => {
    return FB.logout((response) => {
      // console.log("Logging out...", response);
      browserHistory.push('/login');
      dispatch({
        type: LOG_OUT,
        loggedIn: false
      })
    });
  }
}

export function getCurrentUser() {
  return (dispatch) => {
    return FB.api('/me', 'get', { fields:'id,name,gender,link'}, (response) => {
      let picture = `http://graph.facebook.com/${response.id}/picture?type=large`;
      let msgPicture = `http://graph.facebook.com/${response.id}/picture?type=small`;
      addUser(response, picture, dispatch);
      dispatch({
        type: CURRENT_USER,
        user: response,
        picture: msgPicture
      })
    });
  }
}

export function getUserDB(id) {
  const dbUser = axios.get('/user/' + id);
  return (dispatch) => {
    return dbUser
    .then((response) => {
      dispatch({
        type: USER_DATA,
        payload: {
          user: response.data
        }
      })
    })
  }
}

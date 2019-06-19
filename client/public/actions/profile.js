import axios from 'axios';

export const GET_USER_BONFIRES = 'GET_USER_BONFIRES';
export const UPDATE_USER_BIO = 'UPDATE_USER_BIO';
export const CHANGE_BONFIRE_POPUP_DATA = 'CHANGE_BONFIRE_POPUP_DATA';

// Updated the end point to return all bonfires that the user has joined, not just the bonfires the user has created

export function getUserBonfires(userId) {
  const grabBonfiresDB = axios.get('/bonfire/join_bonfire/' + userId);
  return (dispatch) => {
    return grabBonfiresDB.then((response) => {
      dispatch({
        type: GET_USER_BONFIRES,
        payload: {
          bonfires: response.data
        }
      })
    })
  }
}

export function getCreatedBonfires(userId) {
  return axios.get('/bonfire/join_bonfire/created&' + userId).then((resp) => {
    return resp;
  })
}

export function updateUserBio(userId, bio) {
  const data = {
    userId: userId,
    bio: bio
  }
  const updateUserBioDB = axios.put('/user/' + userId, data);
  return (dispatch) => {
    return updateUserBioDB.then((response) => {
      dispatch({
        type: UPDATE_USER_BIO,
        payload: {
          userId
        }
      })
    })
  }
}

export function changeBonfirePopupData(bonfireData) {
  return {
    type: CHANGE_BONFIRE_POPUP_DATA,
    payload: {
      bonfireData
    }
  }
}

export function getBonfireData(bonfireId) {
  return axios.get('/bonfire/' + bonfireId).then((resp) => {
    return resp;
  })
}

export function getUserData(userId) {
  return axios.get('/user/' + userId).then((resp) => {
    return resp;
  })
}


export function getBonfireUsers(bonfireId) {
  return axios.get('/bonfire/users_bonfires/' + bonfireId).then((resp) => {
    return resp;
  })
}

// export function updateUserBio(userId, text) {
//   return axios.put('/user/' + userId, {bio:text}).then((resp) => {
//     return resp;
//   })
// }

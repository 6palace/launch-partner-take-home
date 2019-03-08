import callApi, { API_URL } from '../util/apiCaller';
import fetch from 'isomorphic-fetch';

export const SHOW_PROFILE = 'SHOW_PROFILE';
export const SHOW_OTHER_PROFILES = 'SHOW_OTHER_PROFILES';
export const ATTACH_PROFILE_PIC = 'ATTACH_PROFILE_PIC';
export const ATTACH_MY_PROFILE_PIC = 'ATTACH_MY_PROFILE_PIC';

export const showMyProfile = profile => {
  return {
    type: SHOW_PROFILE,
    profile
  };
};

export const showEmptyProfile = () => {
  return {
    type: SHOW_PROFILE,
    profile: {},
  };
};

export const showOtherProfiles = (profiles) => {
  return {
    type: SHOW_OTHER_PROFILES,
    profiles,
  };
};

export const addProfilePic = (index, displayPicBlob) => {
  const displayPicBlobUrl = window.URL.createObjectURL(displayPicBlob);
  return {
    type: ATTACH_PROFILE_PIC,
    index,
    displayPicBlobUrl,
  };
};

export const attachMyDisplayPic = (displayPicBlob) => {
  const displayPicBlobUrl = window.URL.createObjectURL(displayPicBlob);
  return {
    type: ATTACH_MY_PROFILE_PIC,
    displayPicBlobUrl,
  };
};

export const fetchProfiles = () => dispatch => {
  return callApi('profiles').then((response) => {
    response.json().then((profiles) => {
      dispatch(showOtherProfiles(profiles));
      for(let i =0; i < profiles.length; i++) {
        const profileId = profiles[i]._id;
        fetchPhoto(profileId).then((displayBlob) => {
          dispatch(addProfilePic(i, displayBlob));
        });
      }
    });
  });
};

export const fetchMyProfile = () => dispatch => {
  return callApi('my-profile').then((response) => {
    response.json().then((json) => {
      if (response.status === 200) {
        dispatch(showMyProfile(json));
        fetchPhoto(json._id).then((displayBlob) => {
          dispatch(attachMyDisplayPic(displayBlob));
        });
      } else {
        console.log('fetchMyProfile failed', response);
        dispatch(showEmptyProfile());
      }
    });
  });
};

export const updateProfile = (values) => (dispatch, getState) => {
  const existingName = getState().ProfileState.myProfile.name;
  const path = existingName ? 'my-profile' : 'profiles';
  const method = existingName ? 'put' : 'post';
  return callApi(path, method, {
    name: values.name,
    description: values.description,
  }).then((response) => {
    if (response.status === 201 || response.status === 200) {
      response.json().then((json) => {
        dispatch(showMyProfile(json));
        if (values.displayPic) {
          dispatch(uploadPhoto(json._id, values.displayPic));
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }).catch((err) => {
    console.log(err);
  });
};

export const uploadPhoto = (profileId, displayPic) => dispatch => {
  return fetch(`${API_URL}/profiles/${profileId}/display-pic`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'image/jpeg',
    },
    body: displayPic
  }).then((response) => {
    if(response.status === 200) {
      dispatch(attachMyDisplayPic(displayPic));
    }
  })
};

function fetchPhoto(profileId) {
  return fetch(`${API_URL}/profiles/${profileId}/display-pic`, {
    headers: {
      'Accept': 'image/jpeg',
    },
  }).then((displayResponse) => {
    if (displayResponse.status === 200) {
      return displayResponse.blob();
    } else {
      return Promise.reject();
    }
  });
};

import { SHOW_PROFILE, SHOW_OTHER_PROFILES, ATTACH_PROFILE_PIC, ATTACH_MY_PROFILE_PIC } from "./ProfileActions";

const initialState = {
  myProfile: {},
  profiles: [],
};

const ProfileState = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_OTHER_PROFILES:
      return {
        ...state,
        profiles: action.profiles,
      };
    case ATTACH_PROFILE_PIC: {
      const newProfiles = state.profiles.slice();
      newProfiles[action.index] = Object.assign({
        displayPicUrl: action.displayPicBlobUrl
      }, newProfiles[action.index]);
      return {
        ...state,
        profiles: newProfiles,
      };
    }
    case ATTACH_MY_PROFILE_PIC:
      return {
        ...state,
        myProfile: Object.assign({
          displayPicUrl: action.displayPicBlobUrl,
        }, state.myProfile),
      };
    case SHOW_PROFILE:
      return {
        ...state,
        myProfile: action.profile,
      };
    default:
      return state;
  }
};

export default ProfileState;

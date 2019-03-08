import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik,  } from 'formik';
import { fetchMyProfile, updateProfile } from './ProfileActions';
import ProfileForm from './ProfileForm';


class MyProfile extends Component {

  componentWillMount() {
    console.log('component mounted');
    this.props.fetchMyProfile();
  }

  render() {
    const { myProfile, onSubmit } = this.props;
    return(<div>
      <Helmet title={myProfile.name ? `${myProfile.name} -- Profile` : 'Create your profile!'}/>
      <ProfileForm
        profile={myProfile}
        onSubmit={onSubmit}
      />
    </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    myProfile: state.ProfileState.myProfile,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMyProfile: () => {
      return dispatch(fetchMyProfile());
    },
    onSubmit: (values) => {
        return dispatch(updateProfile(values));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

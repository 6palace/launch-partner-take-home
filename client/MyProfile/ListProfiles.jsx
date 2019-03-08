import React, { Component } from 'react';
import DisplayPic from "./DisplayPic";
import { connect } from 'react-redux';
import { fetchProfiles } from './ProfileActions';

class ListProfiles extends Component {

  componentWillMount() {
    this.props.fetchProfiles();
  }

  render() {
    const { profiles } = this.props;
    return (<div>
      {profiles.map((profile) => (<div style={{
        margin: '10px'}}>
        <div>Name: {profile.name}</div>
        <div>Description: {profile.description}</div>
        <div>
          {profile.displayPicUrl && <DisplayPic fileUrl={profile.displayPicUrl} />}
        </div>
      </div>))}
    </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    profiles: state.ProfileState.profiles,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchProfiles: () => {
      dispatch(fetchProfiles());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProfiles);

import React from 'react';
import { Link } from "react-router";

const ProfileHeader = (props) => {
  return (<div>
    <div className="header">
      <Link to="/">My Profile</Link>
      <Link to="/list">View Other Profiles</Link>
    </div>
    {props.children}
  </div>);
}

export default ProfileHeader

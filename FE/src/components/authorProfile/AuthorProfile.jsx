import React from "react";
import './authorProfile.css';

const AuthorProfile = ({ user }) => {
  return (
    <div className="author-profile">
      <img
        className="img-author-profile"
        src={user.avatar}
        alt="avatarAuthor"
      />
      <div className="author-details">
        <span className="author-name">{user.name}</span>
        <span className="author-surname">{user.surname}</span>
      </div>
    </div>
  );
};

export default AuthorProfile;

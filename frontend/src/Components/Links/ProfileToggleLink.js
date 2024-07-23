import React from "react";
import { Link } from "react-router-dom";

const ProfileToggleLink = ({ link, title, icon, onClick }) => {
  return (
    <Link
      onClick={onClick}
      to={link}
      className="flex items-center text-neutral-700 text-sm"
    >
      <span className="pointer-events-none mr-3">{icon}</span>
      {title}
    </Link>
  );
};

export default ProfileToggleLink;

import React from "react";

const CardHeader = ({ user, createdAt, organization }) => {
  const name = organization
    ? organization?.name
    : user?.firstname + " " + user?.lastname;
  return (
    <div class='flex items-center gap-3'>
      <span class='text-sm font-semibold'>
        {new Date(createdAt).toLocaleDateString()}
      </span>
      <span className='text-lg font-bold'>{name}</span>
    </div>
  );
};

export default CardHeader;

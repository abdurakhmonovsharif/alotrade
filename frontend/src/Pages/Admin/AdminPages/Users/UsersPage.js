import React, { useEffect } from "react";
import PageTitle from "../../../../Components/Admin/PageTitle";
import UsersTableTemp from "../../../../Components/Admin/UsersPage/UsersTableTemp";
import { useDispatch, useSelector } from "react-redux";
import { changeBalanceUser, deleteUser, getAllUsers } from "./userSlice";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.adminUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className='flex flex-col w-full'>
      <PageTitle>Foydalanuvchilar</PageTitle>
      {users && (
        <UsersTableTemp
          name={"Foydalanuvchi"}
          data={users}
          actions={{
            changeBalance: (body) => dispatch(changeBalanceUser(body)),
            deleteUser: (body) => dispatch(deleteUser(body)),
          }}
        />
      )}
    </div>
  );
};

export default UsersPage;

import { MegaphoneIcon, UserIcon } from '@heroicons/react/24/outline';
import { Avatar, Dropdown } from '@nextui-org/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { moneyPattern } from '../../Config/money';
import { logOut } from '../../Pages/Sign/signSlice';
import { menuOrganization, menuUser } from '../../Pages/User/Profile/constants';
import useWindowSize from '../../hooks/useWindowSize';

const UserProfile = ({ changeHandler, navbarExpended, toggleMenu, user, isOrg }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width } = useWindowSize();

  return (
    <div className='flex flex-row relative gap-5 items-center justify-end w-full'>
      <div className='flex flex-row justify-end text-white gap-2 sm:gap-5 sm:mr-5 h-full w-full'>
        <button
          onClick={() => navigate('/profile/for-you')}
          className='flex flex-col items-center justify-end'
        >
          <div className='bg-white p-2 rounded-full relative'>
            <span className='absolute rounded-full bg-red-500 w-[13px] h-[13px] top-[-2px] right-[-2px]' />

            <MegaphoneIcon className='sm:w-[23px] w-[18px] text-orange-500' />
          </div>
          <span className='hidden sm:flex text-[12px]'>{'Для вас'}</span>
        </button>
        {/* <button
          onClick={() => navigate("/offers")}
          className='flex flex-col items-center justify-end'
        >
          <div className='bg-white p-2 rounded-full relative'>
            <span className='absolute rounded-full bg-red-500 w-[13px] h-[13px] top-[-2px] right-[-2px]' />

            <ChatBubbleLeftEllipsisIcon className='sm:w-[23px] w-[18px] text-green-500' />
          </div>
          <span className='hidden sm:flex text-[12px]'>{"Сообщение"}</span>
        </button> */}
      </div>
      <div className='hidden sm:flex flex-none flex-col text-white leading-5'>
        <span className='text-[14px]'>{'Баланс'}</span>
        <span className='text-[18px] font-bold'>{`${
          user?.balance == 0 ? 0 : moneyPattern(user?.balance)
        } Сўм `}</span>
      </div>
      {width > 720 ? (
        <button
          onClick={() => navigate('/profile/user')}
          className='w-[20px] h-[20px] flex-none md:w-[50px] md:h-[50px] bg-slate-100 rounded-full flex items-center justify-center border border-white-900'
        >
          {user?.image ? (
            <img
              src={user.image}
              alt='avatar'
              className='w-full h-full rounded-full'
            />
          ) : user?.firstname ? (
            user?.firstname[0]?.toUpperCase() + user?.lastname[0]?.toUpperCase()
          ) : null}
        </button>
      ) : (
        <Dropdown
          css={{ marginRight: '10px' }}
          placement='bottom-right'
        >
          <Dropdown.Trigger>
            <Avatar
              bordered
              as='button'
              color='primary'
              src={user.image}
              icon={<UserIcon className='w-[15px] md:w-[25px] stroke-white' />}
            />
          </Dropdown.Trigger>
          <Dropdown.Menu
            onAction={(key) => {
              if (key == 'logout') {
                dispatch(logOut());
              }
              navigate(key);
            }}
            onSelectionChange={(key) => {
              navigate(key);
            }}
            color='primary'
            aria-label='Avatar Actions'
          >
            {isOrg
              ? menuOrganization.map((el, index) => (
                  <Dropdown.Item key={el.path}>{el.title}</Dropdown.Item>
                ))
              : menuUser.map((el, index) => (
                  <Dropdown.Item key={el.path}>{el.title}</Dropdown.Item>
                ))}

            <Dropdown.Item
              key='logout'
              color='error'
              withDivider
            >
              Выйти
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}

      {/* {navbarExpended && <ProfileToggleMenu toggleMenu={toggleMenu} />} */}
    </div>
  );
};

export default UserProfile;

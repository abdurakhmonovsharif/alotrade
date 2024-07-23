import { Avatar, Icon, IconButton, Typography } from "@mui/material";
import { Tooltip } from "@nextui-org/react";
import React from "react";
import { MdDelete, MdEdit, MdPlayArrow, MdStop } from "react-icons/md";
import { useSelector } from "react-redux";
import noImage from "../../assets/images/order.jpeg";

const MyCard = ({
  order,
  editHandler,
  deleteHandler,
  logged,
  updatePosition,
  isProfile,
  // translations,
}) => {
  const { userData } = useSelector((state) => state.login);
  const {
    _id,
    // tradetypes,
    region,
    // district,
    // categories,
    // subcategories,
    name,
    description,
    status,
    // currency,
    // minPrice,
    // maxPrice,
    images,
    position,
    user,
    createdAt,
    organization,
  } = order;

  // const isCustomer = userData?.user?._id === user?._id;
  const phone = organization ? organization.phone : user?.phone;
  const isOrganization = userData?.organization;
  return (
    <div className='flex flex-row relative gap-3 items-center justify-start w-full bg-alotrade/10 rounded-md p-3'>
      {position === "active" ? (
        <div class='absolute text-[10px] md:text-[13px] bottom-2 right-2 bg-green-500 shadow-lg text-white cursor-pointer px-3 text-center justify-center items-center py-1 rounded-lg flex space-x-2 flex-row'>
          Актуально
        </div>
      ) : (
        <div class='absolute text-[10px] md:text-[13px] bottom-2 right-2 bg-red-500 shadow-lg text-white cursor-pointer px-3 text-center justify-center items-center py-1 rounded-lg flex space-x-2 flex-row'>
          Не актуально
        </div>
      )}
      <img
        class='md:block w-3/12 h-40 rounded-lg hidden object-cover border-[1.3px] border-neutral-200 flex-none'
        alt='art cover'
        loading='lazy'
        src={images[0] ? images[0] : noImage}
      />
      <div className='flex flex-col items-start justify-start h-40 w-full'>
        <div className='flex flex-row justify-between w-full'>
          <div className='flex flex-row items-center gap-2'>
            <Avatar
              sx={{ width: "28px", height: "28px" }}
              src={organization ? organization?.image : user?.image}
            />
            <span className='text-[16px] font-bold'>
              {organization
                ? organization?.name
                : `${user?.lastname} ${user?.firstname}`}
            </span>
          </div>
          <span className='text-[12px] md:text-[14px] font-semibold text-neutral-700 mr-5'>{`Регион: ${
            region ? region?.name : "Respublika bo'ylab"
          }`}</span>
        </div>

        <div className='flex flex-col leading-3 px-5 mt-2'>
          <Typography
            sx={{
              fontFamily: "'Rubik', sans-serif",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              fontSize: "14px",
              fontWeight: "600",
            }}
            gutterBottom
            component='div'
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Rubik', sans-serif",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              fontSize: "12px",
              fontWeight: "400",
            }}
            gutterBottom
            component='div'
          >
            {description}
          </Typography>
        </div>
        <div className='flex flex-row'>
          <Tooltip
            content={position === "active" ? "Остановить" : "Активировать"}
          >
            <IconButton onClick={() => updatePosition(_id)}>
              {position === "active" ? (
                <MdStop color='#f77f00' />
              ) : (
                <MdPlayArrow color='#6a994e' />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip content={"Удалить"}>
            <IconButton onClick={() => deleteHandler(_id)}>
              <MdDelete color='#ef233c' />
            </IconButton>
          </Tooltip>
          <Tooltip content={"Редактировать"}>
            <IconButton onClick={() => editHandler(_id)}>
              <MdEdit color='#0096c7' />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default MyCard;

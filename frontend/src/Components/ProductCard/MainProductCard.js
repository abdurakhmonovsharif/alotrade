import React, { useEffect, useState } from "react";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import CardEdit from "./CardEdit";
import { useDispatch, useSelector } from "react-redux";
import noImage from "../../assets/images/no-image.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import {
  addFavorite,
  deleteFavorite,
} from "../../Pages/User/Products/productSlice";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
  CardHeader as MuiCardHeader,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorderOutlined,
  LocalPhoneOutlined,
  SendOutlined,
} from "@mui/icons-material";

const MainProductCard = ({ product, editHandler, deleteHandler, logged }) => {
  const { userData } = useSelector((state) => state.login);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const location = useLocation();
  const {
    _id,
    tradetypes,
    region,
    district,
    categories,
    subcategories,
    name,
    description,
    status,
    currency,
    minPrice,
    maxPrice,
    images,
    position,
    user,
    createdAt,
    organization,
  } = product;
  const isCustomer = userData?.user?._id === user?._id;
  const phone = organization?.phone;
  const isOrganization = !!userData?.organization?._id;
  const isProfileProducts = location.pathname === "/profile/products";

  if (isOrganization && logged && isProfileProducts) {
    return (
      <div
        className={`w-full shadow-2xl mt-5 rounded-xl bg-white-900 bg-white border-[1px] border-[#01c2cc]`}
      >
        <div className='text-sm w-full h-full flex flex-col justify-between rounded-xl'>
          <Link
            to={`/products/${_id}`}
            className='text-sm w-full h-full flex flex-col justify-between rounded-xl'
          >
            <p className='pl-2 border-b my-1 flex items-center text-neutral-500 text-sm'>
              <IoLocationOutline className='' />
              <span className='text-[10px] md:text-[14px] ml-2'>
                {region ? region?.name : "Respublika bo'ylab"}
              </span>
            </p>
            <div className='flex overflow-hidden items-center justify-center bg-white rounded-t-xl'>
              <img
                src={images[0] ? images[0] : noImage}
                className='rounded object-contain h-[150px] md:h-[200px]'
                alt='Product'
              />
            </div>
            {/* Card header */}
            <CardHeader
              logged={logged}
              user={user}
              position={position}
              createdAt={createdAt}
              organization={organization}
            />
            <CardBody
              region={region}
              name={name}
              maxPrice={maxPrice}
              minPrice={minPrice}
              description={description}
              currency={currency}
            />
          </Link>
          <CardEdit
            editHandler={editHandler}
            productId={_id}
            deleteHandler={deleteHandler}
            position={position}
          />
        </div>
      </div>
    );
  }
  return (
    <Card
      onClick={() => navigate(`/products/${_id}`)}
      sx={{
        cursor: "pointer",
        maxWidth: 400,
        boxShadow: "2px 2px 25px 1px rgba(0, 0, 0, 0.1)",
        borderRadius: "21px",
      }}
      variant='outlined'
    >
      <MuiCardHeader
        sx={{ paddingY: "10px" }}
        avatar={
          <Avatar
            size='small'
            sx={{ width: "28px", height: "28px" }}
            aria-label='recipe'
          ></Avatar>
        }
        title={
          <span className='text-[16px] font-semibold'>
            {organization
              ? organization?.name
              : user?.firstname + " " + user?.lastname}
          </span>
        }
      />
      <CardMedia
        component='img'
        sx={{ height: 210, paddingX: "13px" }}
        image={images[0] ? images[0] : noImage}
        alt='Paella dish'
      />
      <CardContent
        sx={{ paddingTop: "8px", paddingX: "30px", paddingBottom: "2px" }}
      >
        <Typography
          sx={{
            fontFamily: "'Rubik', sans-serif",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            fontSize: "16px",
            fontWeight: "600",
          }}
          gutterBottom
          component='div'
        >
          {name}
        </Typography>
        <div className='flex flex-row items-center w-full justify-between mb-1'>
          <span className='text-[16px] font-semibold'>{"Цена:"}</span>
          <span className='text-[18px] font-bold'>
            {maxPrice ? maxPrice.toLocaleString("ru-RU") : 0} {currency}
          </span>
        </div>
        <div className='flex flex-row items-center w-full justify-between'>
          <span className='text-[14px] font-normal text-neutral-700'>{`Регион: ${
            region ? region?.name : "Respublika bo'ylab"
          }`}</span>
        </div>
      </CardContent>
      <CardActions
        sx={{
          paddingTop: 0,
          paddingX: "10px",
          paddingLeft: "20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Stack direction='row' spacing={0.3}>
          <IconButton aria-label='delete'>
            <LocalPhoneOutlined />
          </IconButton>
          {/* <IconButton aria-label='delete'>
            <SendOutlined />
          </IconButton> */}
        </Stack>
        <IconButton
          aria-label='like'
          onClick={(e) => {
            e.stopPropagation();
            if (product?.favorites.includes(userData?.user?._id)) {
              dispatch(
                deleteFavorite({
                  productId: product._id,
                  userId: userData?.user?._id,
                })
              );
            } else {
              dispatch(
                addFavorite({
                  productId: product._id,
                  userId: userData?.user?._id,
                })
              );
            }
          }}
        >
          {!product?.favorites.includes(userData?.user?._id) ? (
            <FavoriteBorderOutlined
              size='small'
              sx={{
                "@media (max-width: 600px)": {
                  fontSize: "20px",
                },
              }}
            />
          ) : (
            <Favorite
              sx={{
                fill: "#e5383b",
                "@media (max-width: 600px)": {
                  fontSize: "20px",
                },
              }}
            />
          )}
        </IconButton>
      </CardActions>
    </Card>

    // <div
    //   className={`w-full relative shadow-2xl rounded-xl block h-full bg-white border-[1px] border-[#01c2cc]`}
    // >
    //   {logged && (
    //     <button
    //       className="absolute top-0 right-2 z-6"
    //       onClick={() => {
    //         if (product?.favorites.includes(userData?.user?._id)) {
    //           dispatch(
    //             deleteFavorite({
    //               productId: product._id,
    //               userId: userData.user._id,
    //             })
    //           );
    //         } else {
    //           dispatch(
    //             addFavorite({
    //               productId: product._id,
    //               userId: userData.user._id,
    //             })
    //           );
    //         }
    //       }}
    //     >
    //       <MdFavorite
    //         size={24}
    //         className={`${
    //           product?.favorites.includes(userData.user._id)
    //             ? "fill-alotrade"
    //             : "fill-slate-300"
    //         }`}
    //       />
    //     </button>
    //   )}
    //   <Link
    //     to={`/products/${_id}`}
    //     className="text-sm w-full h-full flex flex-col rounded-xl"
    //   >
    //     <p className="pl-2 border-b my-1 flex items-center text-neutral-500 text-sm">
    //       <IoLocationOutline className="" />
    //       <span className="text-[10px] md:text-[14px] ml-2">
    //         {region ? region?.name : "Respublika bo'ylab"}
    //       </span>
    //     </p>
    //     <div className="flex relative items-center justify-center bg-white rounded-t-xl">
    //       <img
    //         src={images[0] ? images[0] : noImage}
    //         className="rounded object-contain h-[150px] md:h-[200px]"
    //         alt="Product"
    //       />
    //     </div>
    //     {/* Card header */}

    //     {/* <CardHeader
    //       logged={logged}
    //       user={user}
    //       position={position}
    //       createdAt={createdAt}
    //       organization={organization}
    //     /> */}

    //     <CardBody
    //       region={region}
    //       name={name}
    //       maxPrice={maxPrice}
    //       minPrice={minPrice}
    //       description={description}
    //       currency={currency}
    //     />
    //   </Link>
    // </div>
  );
};

export default MainProductCard;

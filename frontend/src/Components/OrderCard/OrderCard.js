import React, { useState } from "react";
import CardBody from "./CardBody";
import CardAdditional from "./CardAdditional";
// import CardFooter from "./CardFooter";
// import CardEdit from "./CardEdit";
import { useDispatch, useSelector } from "react-redux";
import noImage from "../../assets/images/order.jpeg";

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import UniversalModal from "../Modal/UniversalModal";
import {
  clearErrorOrders,
  getOrderById,
} from "../../Pages/User/Orders/orderSlice";
import { useNavigate } from "react-router-dom";
import Api from "../../Config/Api";

const OrderCard = ({
  order,
  editHandler,
  deleteHandler,
  logged,
  updatePosition,
  isProfile,
  // translations,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const phone = organization ? organization?.phone : user?.phone;
  const isOrganization = userData?.organization;

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const navigateToDetail = () => {
    dispatch(clearErrorOrders());
    // dispatch(getOrderById({ id: _id }));
    navigate(`/orders/${_id}`);
  };

  //  const [pricePerSend, setPricePerSend] = useState(0);

  const fetchPricePerSend = async () => {
    const res = await Api.get("/extra/cost");
    return res.data[0]?.ordersum;
  };

  return (
    <>
      <div
        onClick={async () => {
          if (logged) {
            navigateToDetail();
          } else {
            openModal();
          }
        }}
        className='flex flex-row cursor-pointer relative gap-3 items-center justify-start w-full bg-alotrade/10 rounded-md p-3'
      >
        {position === "active" ? (
          <div class='absolute text-[10px] md:text-[13px] top-1 right-1 md:right-auto md:top-1 md:left-1 bg-green-500 shadow-lg text-white cursor-pointer px-3 text-center justify-center items-center py-1 rounded-lg flex space-x-2 flex-row'>
            Актуально
          </div>
        ) : (
          <div class='absolute text-[10px] md:text-[13px] top-1 right-1 md:right-auto md:top-1 md:left-1 bg-red-500 shadow-lg text-white cursor-pointer px-3 text-center justify-center items-center py-1 rounded-lg flex space-x-2 flex-row'>
            Не актуально
          </div>
        )}
        <img
          class='md:block w-3/12 h-fit md:h-[180px] rounded-lg hidden object-cover border-[1.3px] border-neutral-200 flex-none'
          alt='art cover'
          loading='lazy'
          src={images[0] ? images[0] : noImage}
        />
        <div className='flex flex-col items-start justify-start h-fit md:h-[180px] w-full'>
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
            <span className='hidden md:flex text-[12px] md:text-[14px] font-semibold text-neutral-700 mr-5'>{`Регион: ${
              region ? region?.name : "Respublika bo'ylab"
            }`}</span>
          </div>

          <div className='flex flex-col leading-3 px-5 mt-2 w-full'>
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
                width: "100%",
                whiteSpace: "normal",
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
          {/* <div className='flex flex-row'>
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
        </div> */}
        </div>
      </div>

      <UniversalModal
        body={"warningSignIn"}
        isOpen={modalVisible}
        closeModal={() => setModalVisible(false)}
        toggleModal={() => setModalVisible(false)}
      />
    </>

    // <Card
    //   sx={{
    //     display: "flex",
    //     flexDirection: "row",
    //     padding: "5px",
    //     borderRadius: "21px",
    //     boxShadow: "0px 7px 43px -15px rgba(0,0,0,0.2)",
    //     // bgcolor: "#E3FAF680",
    //   }}
    // >
    //   <div class='absolute text-[10px] md:text-[16px] top-0 right-0 bg-green-500 shadow-lg text-white cursor-pointer px-3 text-center justify-center items-center py-1 rounded-lg flex space-x-2 flex-row'>
    //     Актуально
    //   </div>
    //   <CardMedia
    //     component='img'
    //     sx={{
    //       width: 400,
    //       height: 200,
    //       paddingX: "13px",
    //       borderRadius: "13px",
    //       overflow: "hidden",
    //       flex: "none",
    //     }}
    //     image='https://st4.depositphotos.com/14431644/22076/i/600/depositphotos_220767694-stock-photo-handwriting-text-writing-example-concept.jpg'
    //     alt='Paella dish'
    //   />
    //   <div className='flex flex-col items-start w-full '>
    //     <CardHeader
    //       sx={{ paddingY: "13px", width: "100%" }}
    //       avatar={
    //         <Avatar
    //           sx={{ width: "34px", height: "34px" }}
    //           src={organization ? organization?.image : user?.image}
    //           aria-label='recipe'
    //         ></Avatar>
    //       }
    //       action={<IconButton aria-label='like'></IconButton>}
    //       title={
    //         <div className='flex flex-row w-full justify-between items-start leading-5'>
    //           <span className='text-[16px] font-bold'>
    //             {organization
    //               ? organization?.name
    //               : user?.firstname + " " + user?.lastname}
    //           </span>
    //           <span className='text-[14px] font-normal text-neutral-700'>{`Регион: ${
    //             region ? region?.name : "Respublika bo'ylab"
    //           }`}</span>
    //         </div>
    //       }
    //     />
    //     {/* <CardMedia
    //     component='img'
    //     sx={{ height: 180 }}
    //     image='https://st4.depositphotos.com/14431644/22076/i/600/depositphotos_220767694-stock-photo-handwriting-text-writing-example-concept.jpg'
    //     alt='Paella dish'
    //   /> */}
    //     <CardContent
    //       sx={{ paddingTop: "8px", paddingX: "30px", paddingBottom: "2px" }}
    //     >
    //       <Typography
    //         sx={{
    //           fontFamily: "'Rubik', sans-serif",
    //           overflow: "hidden",
    //           textOverflow: "ellipsis",
    //           display: "-webkit-box",
    //           WebkitLineClamp: "2",
    //           WebkitBoxOrient: "vertical",
    //           fontSize: "18px",
    //           fontWeight: "600",
    //         }}
    //         gutterBottom
    //         component='div'
    //       >
    //         {name}
    //       </Typography>
    //       <Typography
    //         variant='body2'
    //         color='text.secondary'
    //         sx={{
    //           fontFamily: "'Rubik', sans-serif",
    //           overflow: "hidden",
    //           textOverflow: "ellipsis",
    //           display: "-webkit-box",
    //           WebkitLineClamp: "3",
    //           WebkitBoxOrient: "vertical",
    //           fontSize: "14px",
    //           fontWeight: "400",
    //         }}
    //       >
    //         {description}
    //       </Typography>
    //     </CardContent>
    //   </div>
    //   {/* <CardActions sx={{ paddingX: "30px" }}>
    //     <Button size='small'>Подробнее</Button>
    //   </CardActions> */}
    // </Card>
    // <div class='relative pt-10 md:p-4  justify-center w-full rounded-xl group sm:flex space-x-6 bg-white shadow-slate-200 shadow-md border-[1px] hover:rounded-2xl'>
    //   {position === "active" ? (
    //     <div class='absolute text-[10px] md:text-[16px] top-1 left-1 bg-green-500 shadow-lg text-white cursor-pointer px-3 text-center justify-center items-center py-1 rounded-lg flex space-x-2 flex-row'>
    //       Актуально
    //     </div>
    //   ) : (
    //     <div class='absolute text-[10px] md:text-[16px] top-1 left-1 bg-red-500 shadow-lg text-white cursor-pointer px-3 text-center justify-center items-center py-1 rounded-lg flex space-x-2 flex-row'>
    //       Не актуально
    //     </div>
    //   )}
    //   <img
    //     class='mx-auto  md:block w-3/12 h-40 rounded-lg hidden object-cover'
    //     alt='art cover'
    //     loading='lazy'
    //     src={images[0]}
    //   />
    //   <div class='sm:w-8/12'>
    //     <div class='flex flex-col gap-2'>
    //       <CardBody title={name} description={description} />
    //       <CardAdditional
    //         id={_id}
    //         logged={logged}
    //         isOrganization={isOrganization}
    //         position={position}
    //         phone={phone}
    //         region={region}
    //         editHandler={editHandler}
    //         deleteHandler={deleteHandler}
    //         updatePosition={updatePosition}
    //         isProfile={isProfile}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default OrderCard;

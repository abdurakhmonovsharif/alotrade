import React, { useState } from "react";
import CardBody from "./CardBody";
import CardAdditional from "./CardAdditional";
// import CardFooter from "./CardFooter";
// import CardEdit from "./CardEdit";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import UniversalModal from "../Modal/UniversalModal";

const OrderCardMain = ({
  order,
  // editHandler,
  // deleteHandler,
  logged,
  // translations,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.login);
  const {
    // _id,
    // tradetypes,
    region,
    // district,
    // categories,
    // subcategories,
    name,
    description,
    // status,
    // currency,
    // minPrice,
    // maxPrice,
    images,
    position,
    user,
    createdAt,
    organization,
    isImg,
  } = order;
  // const isCustomer = userData?.user?._id === user?._id;
  const phone = organization ? organization?.phone : user?.phone;
  const isOrganization = userData?.organization;
  return (
    <>
      <div
        className='w-full h-full cursor-pointer'
        onClick={() => {
          logged ? navigate(`/orders/${order._id}`) : setModalVisible(true);
        }}
      >
        <div className='w-full h-full'>
          <Card
            sx={{
              height: "100%",
              position: "relative",
              borderRadius: "18px",
              width: "100%",
              // "@media (max-width: 600px)": {
              //   width: "250px",
              // },
              boxShadow: "2px 2px 25px 1px rgba(0, 0, 0, 0.1)",
            }}
            variant='outlined'
          >
            <div class='absolute text-[10px] md:text-[16px] top-0 right-0 bg-green-500 shadow-lg text-white cursor-pointer px-3 text-center justify-center items-center py-1 rounded-lg flex space-x-2 flex-row'>
              Актуально
            </div>
            <CardHeader
              sx={{
                paddingY: "13px",
                "@media (max-width: 600px)": {
                  paddingY: "5px",
                },
                borderBottom: "1px solid #eee",
              }}
              avatar={
                <Avatar
                  sx={{
                    "@media (max-width: 600px)": {
                      width: "25px",
                      height: "25px",
                    },
                  }}
                  src={organization ? organization?.image : user?.image}
                  aria-label='recipe'
                ></Avatar>
              }
              action={<IconButton aria-label='like'></IconButton>}
              title={
                <div className='flex flex-col items-star leading-4 md:leading-5 pt-1'>
                  <span className='text-[14px] md:text-[16px] font-bold'>
                    {organization
                      ? organization?.name
                      : user?.firstname + " " + user?.lastname}
                  </span>
                  <span className='text-[11px] md:text-[12px] font-semibold'>
                    {" "}
                    {new Date(createdAt).toLocaleDateString()}
                  </span>
                </div>
              }
            />
            {/* <CardMedia
        component='img'
        sx={{ height: 180 }}
        image='https://st4.depositphotos.com/14431644/22076/i/600/depositphotos_220767694-stock-photo-handwriting-text-writing-example-concept.jpg'
        alt='Paella dish'
      /> */}
            <CardContent
              sx={{
                "@media (max-width: 600px)": {
                  paddingTop: "2px",
                  paddingX: "20px",
                },
                paddingTop: "8px",
                paddingX: "30px",
                paddingBottom: "2px",
              }}
            >
              <Typography
                sx={{
                  marginTop: "4px",
                  fontFamily: "'Rubik', sans-serif",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",

                  WebkitBoxOrient: "vertical",
                  fontSize: "18px",
                  "@media (max-width: 600px)": {
                    fontSize: "14px",
                    WebkitLineClamp: "1",
                  },
                  fontWeight: "600",
                }}
                gutterBottom
                component='div'
              >
                {name}
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{
                  fontFamily: "'Rubik', sans-serif",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "3",

                  WebkitBoxOrient: "vertical",
                  fontSize: "14px",
                  "@media (max-width: 600px)": {
                    fontSize: "12px",
                    WebkitLineClamp: "2",
                  },
                  fontWeight: "400",
                }}
              >
                {description}
              </Typography>
            </CardContent>
            {/* <CardActions sx={{ paddingX: "30px" }}>
        <Button size='small'>Подробнее</Button>
      </CardActions> */}
          </Card>
        </div>
      </div>
      <UniversalModal
        body={"warningSignIn"}
        isOpen={modalVisible}
        closeModal={() => setModalVisible(false)}
        toggleModal={() => setModalVisible(false)}
      />
    </>
    // <Link
    //   to={logged ? `/orders/${order._id}` : "/"}
    //   className="relative md:p-4 flex flex-col gap-4 max-w-[680px] h-[180px] rounded-xl group  space-x-6 bg-white shadow-xl hover:rounded-2xl"
    // >
    //   <div class="absolute text-[10px] md:text-[16px] top-1 right-1 bg-green-500 shadow-lg text-white cursor-pointer px-3 text-center justify-center items-center py-1 rounded-lg flex space-x-2 flex-row">
    //     Актуально
    //   </div>
    //   {isImg && (
    //     <img
    //       class="mx-auto w-full md:block w-4/12 h-40 rounded-lg hidden"
    //       alt="art cover"
    //       loading="lazy"
    //       src={images}
    //     />
    //   )}
    //   {/* sm:w-8/12 */}
    //   <CardHeader
    //     createdAt={createdAt}
    //     organization={organization}
    //     user={user}
    //   />
    //   <CardBody title={name} description={description} />
    // </Link>
  );
};

export default OrderCardMain;

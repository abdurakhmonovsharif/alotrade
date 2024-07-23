import {Favorite} from '@mui/icons-material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import {Button, Stack} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {orange} from '@mui/material/colors';
import {Modal} from '@nextui-org/react';
import React, {useEffect, useRef, useState} from 'react';
import {BsTelephoneFill} from 'react-icons/bs';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import CardVideo from '../../../Components/CardVideo';
import Api from '../../../Config/Api';
import noImage from '../../../assets/images/no-image.svg';
import {addFavorite, deleteFavorite} from './announcementSlice';

const AnnouncementCard = ({ann, isCarousel}) => {
    const mediaRef = useRef(null);
    const {userData} = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const [mediaWidth, setMediaWidth] = useState(0);
    const [annImage, setAnnImage] = useState({});

    const setInterest = async (postId) => {
        const res = await Api.post('/announcement/post/set/interes', {postId});
    };
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };

    useEffect(() => {
        setMediaWidth(mediaRef.current.offsetWidth);
        if (ann?.images[0]?.includes('/upload/stream') || ann?.images[0]?.includes('firebasestorage')) {
            let tempObj = document.createElement('video');
            tempObj.onloadedmetadata = () => {
                setAnnImage(tempObj);
            };
            tempObj.src = ann?.images[0];
        } else {
            let tempObj = new Image();
            tempObj.onload = () => {
                setAnnImage(tempObj);
            };

            tempObj.src = ann?.images[0];
        }
    }, [ann]);
    const navigate = useNavigate();
    return (
        <>
            <Card
                sx={{
                    width: '100%',
                    boxShadow: {
                        xs: 'none',
                        sm: 'none',
                        md: '2px 2px 25px 1px rgba(0, 0, 0, 0.1)',
                    },
                    border: {
                        xs: 'none',
                        sm: 'none',
                    },
                    borderRadius: {
                        xs: '0px',
                        sm: '0px',
                        md: '21px',
                    },
                    height: '100%',
                    outline: {
                        xs: 'none',
                        sm: 'none',
                    },
                    // placeSelf: "center",
                }}
                variant='outlined'
            >
                <CardHeader
                    sx={{paddingY: '10px'}}
                    avatar={
                        <Avatar
                            src={ann?.user?.image}
                            sx={{
                                bgcolor: orange[800],
                                '@media (max-width: 600px)': {
                                    width: '30px',
                                    height: '30px',
                                },
                            }}
                        ></Avatar>
                    }
                    action={
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                if (ann?.favorites?.includes(userData?.user?._id)) {
                                    dispatch(
                                        deleteFavorite({
                                            postId: ann._id,
                                            userId: userData?.user?._id,
                                        }),
                                    );
                                } else {
                                    dispatch(
                                        addFavorite({
                                            postId: ann._id,
                                            userId: userData?.user?._id,
                                        }),
                                    );
                                }
                            }}
                            aria-label='like'
                        >
                            {!ann?.favorites?.includes(userData?.user?._id) ? (
                                <FavoriteBorderOutlinedIcon
                                    size='small'
                                    sx={{
                                        '@media (max-width: 600px)': {
                                            fontSize: '20px',
                                        },
                                    }}
                                />
                            ) : (
                                <Favorite
                                    sx={{
                                        fill: '#e5383b',
                                        '@media (max-width: 600px)': {
                                            fontSize: '20px',
                                        },
                                    }}
                                />
                            )}
                        </IconButton>
                    }
                    title={
                        <span
                            className='text-[16px] font-bold'>{`${ann?.user?.lastname} ${ann?.user?.firstname}`}</span>
                    }
                />
                {ann?.images[0]?.includes('/upload/stream') || ann?.images[0]?.includes('firebasestorage') ? (
                    <CardVideo
                        mediaRef={mediaRef}
                        isCarousel={isCarousel}
                        src={ann?.images[0]}
                    />
                ) : (
                    <CardMedia
                        ref={mediaRef}
                        component='img'
                        sx={{
                            '@media (max-width: 600px)': {
                                height: !isCarousel
                                    ? annImage?.width > annImage?.height
                                        ? mediaWidth / (annImage.width / annImage.height)
                                        : 340
                                    : 250,
                            },
                            className: 'px-0',
                            // width: "100%",
                            height: !isCarousel ? 340 : 280,
                            paddingX: {
                                xs: '0px',
                                sm: '0px',
                                md: '8px',
                            },
                            objectFit: ann?.images[0]
                                ? annImage.width > annImage.height
                                    ? 'contain'
                                    : 'cover'
                                : 'cover',
                            backgroundColor: '#eeeeee4d',
                        }}
                        src={ann?.images[0] ? ann?.images[0] : noImage}
                    />
                )}
                <CardContent sx={{paddingTop: '8px', paddingX: '30px', paddingBottom: '2px'}}>
                    <Typography
                        sx={{
                            fontFamily: "'Rubik', sans-serif",
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                        gutterBottom
                        component='div'
                    >
                        {ann?.name}
                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        paddingTop: 0,
                        paddingX: '30px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Stack
                        direction='row'
                        spacing={0.3}
                    >
                        <IconButton onClick={handler}>
                            <LocalPhoneOutlinedIcon/>
                        </IconButton>

                        {/* <IconButton aria-label='delete'>
            <SendOutlinedIcon />
          </IconButton> */}
                    </Stack>
                    <Button
                        size='small'
                        onClick={() => navigate(`/announcements/${ann?._id}`)}
                    >
                        Подробнее
                    </Button>
                </CardActions>
            </Card>
            <Modal
                css={{
                    // width: "fit-content",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                closeButton
                aria-labelledby='modal-title'
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header></Modal.Header>
                <Modal.Body>
                    {ann?.user?.organization ? (
                        <div className='flex flex-col gap-2 items-center w-full pb-5'>
                            {ann?.user?.organization.phones?.phone1 && (
                                <a
                                    onClick={() => setInterest(ann?._id)}
                                    className='flex flex-row items-center gap-3 w-fit px-5 py-2 bg-green-500 hover:bg-green-600 transition-all duration-150 ease-in-out rounded-full text-white'
                                    href={`tel:${ann?.user?.organization.phones?.phone1 || ' - '}`}
                                >
                                    <BsTelephoneFill/>
                                    {`${ann?.user?.organization.phones?.phone1 || ' - '}`}
                                </a>
                            )}
                            {ann?.user?.organization.phones?.phone2 && (
                                <a
                                    onClick={() => setInterest(ann?._id)}
                                    className='flex flex-row items-center gap-3 w-fit px-5 py-2 bg-green-500 hover:bg-green-600 transition-all duration-150 ease-in-out rounded-full text-white'
                                    href={`tel:${ann?.user?.organization.phones?.phone2 || ' - '}`}
                                >
                                    <BsTelephoneFill/>
                                    {`${ann?.user?.organization.phones?.phone2 || ' - '}`}
                                </a>
                            )}
                            {ann?.user?.organization.phones?.phone3 && (
                                <a
                                    onClick={() => setInterest(ann?._id)}
                                    className='flex flex-row items-center gap-3 w-fit px-5 py-2 bg-green-500 hover:bg-green-600 transition-all duration-150 ease-in-out rounded-full text-white'
                                    href={`tel:${ann?.user?.organization.phones?.phone3 || ' - '}`}
                                >
                                    <BsTelephoneFill/>
                                    {`${ann?.user?.organization.phones?.phone3 || ' - '}`}
                                </a>
                            )}
                        </div>
                    ) : (
                        <div className='flex flex-col gap-2 items-center w-full pb-5'>
                            {ann?.user?.phone && (
                                <a
                                    onClick={() => setInterest(ann?._id)}
                                    className='flex flex-row items-center gap-3 w-fit px-5 py-2 bg-green-500 hover:bg-green-600 transition-all duration-150 ease-in-out rounded-full text-white'
                                    href={`tel:${ann?.user?.phone || ' - '}`}
                                >
                                    <BsTelephoneFill/>
                                    {`${ann?.user?.phone || ' - '}`}
                                </a>
                            )}
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AnnouncementCard;

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Tooltip } from '@nextui-org/react';
import React, { useRef } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import CardVideo from '../../../Components/CardVideo';
import noImage from '../../../assets/images/no-image.svg';

const MyAnnouncementCard = ({ data, deleteHandler, showStatistcs }) => {
  const mediaRef = useRef(null);
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/announcements/${data._id}`)}
      sx={{
        width: '100%',
        maxWidth: 400,
        boxShadow: '2px 2px 25px 1px rgba(0, 0, 0, 0.1)',
        borderRadius: '15px',
        placeSelf: 'center',
        cursor: 'pointer',
      }}
      variant='outlined'
    >
      <div className='p-2'>
        {data?.images[0]?.includes('/upload/stream') ? (
          <CardVideo
            mediaRef={mediaRef}
            src={data?.images[0]}
          />
        ) : (
          <CardMedia
            // component='img'
            sx={{
              width: '100%',
              height: 340,
              paddingX: '8px',
              paddingTop: '8px',
              borderRadius: '5px',
            }}
            image={data?.images[0] ? data?.images[0] : noImage}
          />
        )}
      </div>
      <CardContent sx={{ paddingTop: '1px', paddingX: '8px', paddingBottom: '2px' }}>
        <Typography
          sx={{
            fontFamily: "'Rubik', sans-serif",
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '1',
            WebkitBoxOrient: 'vertical',
            fontSize: '14px',
            fontWeight: '600',
            paddingX: '15px',
            paddingY: '3px',
          }}
          gutterBottom
          component='div'
        >
          {data?.name}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          paddingTop: 0,
          paddingX: '20px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            showStatistcs(data?._id);
          }}
          className='px-2 py-2 rounded-lg bg-alotrade/10 text-[12px] font-bold'
        >
          Статистика
        </button>
        <div className='flex flex-row'>
          <Tooltip content={'Удалить'}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                deleteHandler(data?._id);
              }}
            >
              <MdDelete color='#ef233c' />
            </IconButton>
          </Tooltip>
          <Tooltip content={'Редактировать'}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/announcements/edit/${data._id}`);
              }}
            >
              <MdEdit color='#0096c7' />
            </IconButton>
          </Tooltip>
        </div>
        {/* <Button size='small'>Подробнее</Button> */}
      </CardActions>
    </Card>
  );
};

export default MyAnnouncementCard;

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { Box } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import React, { useRef } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

const CardVideo = ({ mediaRef, isCarousel, src, isDesc }) => {
  let ref = useRef();
  let localRef = mediaRef || ref;
  const playVideoWhenMouseOver = (e) => {
    localRef.current.play();
  };

  const stopVideoWhenMouseOut = (e) => {
    localRef.current.pause();
  };

  const onPlay = (e) => {
    localRef.current.controls = true;
  };

  const onPause = (e) => {
    localRef.current.controls = false;
  };

  const onChange = (isVisible) => {
    // identify check if screen size mobile or not
    if (window.innerWidth <= 719)
      if (isVisible) {
        playVideoWhenMouseOver();
      } else {
        stopVideoWhenMouseOut();
      }
  };

  return (
    <VisibilitySensor
      onChange={onChange}
      resizeCheck={true}
      offset={{ bottom: -150, top: -450 }}
    >
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <CardMedia
          ref={localRef}
          component='video'
          loop
          muted={false}
          onMouseOver={playVideoWhenMouseOver}
          onMouseOut={stopVideoWhenMouseOut}
          onPlay={onPlay}
          onPause={onPause}
          sx={{
            width: '100%',
            paddingX: {
              xs: '0px',
              sm: '0px',
              md: '8px',
            },
            height: {
              xs: !isCarousel ? (isDesc ? 400 : 'auto') : 280,
              sm: !isCarousel ? (isDesc ? 400 : 340) : 280,
            },
            objectFit: {
              xs: 'contain',
              sm: isDesc ? 'contain' : 'cover',
            },
            backgroundColor: '#eeeeee4d',
          }}
          src={src}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 5,
            right: 10,
            zIndex: 2,
            cursor: 'pointer',
            backgroundColor: '#0000004d',
            display: {
              xs: 'none',
              sm: 'block',
            },
          }}
        >
          <PlayArrowRoundedIcon sx={{ color: 'white', fontSize: 30 }} />
        </Box>
      </Box>
    </VisibilitySensor>
  );
};

export default CardVideo;

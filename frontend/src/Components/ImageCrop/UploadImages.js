import { filter, map, uniqueId } from 'lodash';
import React, {useRef, useState} from 'react';
import { MdAddAPhoto, MdDelete } from 'react-icons/md';
import ReactPlayer from 'react-player';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { deleteProfileImage,uploadMedia } from '../../Pages/Sign/signSlice';

const UploadImages = ({ images, setImages }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const ref = useRef();
  const [progress,setProgress]=useState(0)
  const handleChange = (e) => {
    e.preventDefault();
    ref.current.click();
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    dispatch(uploadMedia({ formData, setProgress })).then(({ error, payload }) => {
      if (!error) {
        setImages([...images, payload]);
      }
      setProgress(0)
    });
  };



  const deleteImage = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const fileName = name.split('/');
    const body = {
      filename: fileName[fileName.length - 1],

    };
    dispatch(deleteProfileImage(body)).then(({ error }) => {
      if (!error) {
        setImages(filter(images, (image) => image !== name));
      }
    });
  };

  return (
    <div className='flex justify-between items-center flex-col flex-reverse'>
      <div className='flex overflow-x-auto w-full py-4'>
        {map(images, (image, index) => {
          return (
            <div
              key={uniqueId('image')}
              className='flex flex-col mx-2 rounded '
            >
              {image.includes('/upload/stream') ? (
                <ReactPlayer
                  url={image}
                  controls={true}
                  width='150px'
                  height={'150px'}
                />
              ) : (
                <img
                  src={image}
                  className='max-w-[150px] max-h-[150px]'
                />
              )}
              <div className='flex w-full justify-evenly pt-2'>
                <button
                  onClick={deleteImage}
                  name={image}
                >
                  <MdDelete
                    size={20}
                    color='#f00'
                    className='pointer-events-none'
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <input
        ref={ref}
        type='file'
        className='hidden'
        onChange={handleClick}
      />
      <div className='flex flex-col gap-1 items-center'>
        <button
          className='p-4 rounded-full border-neutral-400 mr-2'
          onClick={handleChange}
        >
          <MdAddAPhoto
            size={80}
            className='text-alotrade'
          />
          {progress>0?`Yuklandi: ${progress}%`:null}
        </button>
        {location.pathname.startsWith('/create_announcement') ||
        location.pathname.startsWith('/profile/announcements/edit') ? null : (
          <span className='text-[14px] text-neutral-500 mb-5'>Не обязательно</span>
        )}
      </div>
    </div>
  );
};

export default UploadImages;

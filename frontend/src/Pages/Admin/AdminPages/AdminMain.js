import React, { useEffect, useState } from "react";
import SideBar from "../../../Components/Admin/SideBar";
import PageTitle from "../../../Components/Admin/PageTitle";
import HeaderCard from "../../../Components/Admin/HomePage/HeaderCard";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

import Api from "../../../Config/Api";
import { Box, Tab, Tabs } from "@mui/material";
import { TabPanel } from "./AnnsPage/AnnsPage";

export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AdminMain = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [bgImgs, setBgImgs] = useState(null);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const resUpload = await Api.post("/upload", formData);

      try {
        const resBgImg = await Api.post("/extra/bgimg", {
          name: "Background Image",
          image: resUpload.data,
        });
        fetchBgImgs();
      } catch (err) {}
    } catch (err) {}
  };

  const handleAdImageChange = async (event, payload) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const resUpload = await Api.post("/upload", formData);

      const reqData =
        payload == "extraimg1"
          ? {
              extraimg1: resUpload.data,
            }
          : {
              extraimg2: resUpload.data,
            };

      try {
        const resBgImg = await Api.post("/extra/bgimg", reqData);
        fetchBgImgs();
      } catch (err) {}
    } catch (err) {}
  };

  const fetchBgImgs = async () => {
    try {
      const res = await Api.get("/extra/bgimg");
      setBgImgs(res.data);
    } catch (err) {}
  };

  const deleteBgImg = async (id) => {
    try {
      const res = await Api.delete(`/extra/bgimg/${id}`);
      fetchBgImgs();
    } catch (err) {}
  };

  useEffect(() => {
    fetchBgImgs();
  }, []);

  // const uploadBgImage = async () => {
  //   const
  // }

  return (
    <div className='flex flex-col w-full'>
      <PageTitle>Bosh sahifa</PageTitle>
      {/* <div className='flex flex-row flex-wrap justify-center gap-4 w-full'>
        <HeaderCard title='Tashkilotlar' count={100} />
        <HeaderCard title='Foydalanuvchilar' count={439} />
        <HeaderCard title="E'lonlar" count={3298} />
      </div> */}

      <div className='flex flex-col items-start gap-3 px-5 py-2'>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
            >
              <Tab label='Bosh sahifa rasmlari' {...a11yProps(0)} />
              <Tab label='Reklama rasmlari' {...a11yProps(1)} />
              {/* <Tab label='Item Three' {...a11yProps(2)} /> */}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {/* <span className='text-[18px] font-bold'>Bosh sahifa rasmlari</span> */}
            <div className='flex flex-row flex-wrap gap-3 items-center'>
              {bgImgs &&
                bgImgs
                  ?.filter((el) => el.name)
                  ?.map((el, index) => (
                    <div
                      key={index}
                      className='w-[300px] h-[200px] rounded-xl overflow-hidden relative'
                    >
                      <button
                        onClick={() => deleteBgImg(el._id)}
                        className='bottom-1 left-1 absolute w-[25px] h-[25px] bg-red-500 p-1 rounded-full'
                      >
                        <TrashIcon className='text-white w-full' />
                      </button>
                      <img
                        src={el.image}
                        className='w-full h-full object-cover bg-center'
                      />
                    </div>
                  ))}
              <input
                onChange={handleFileChange}
                type='file'
                id='fileInput'
                className='hidden w-0 h-0'
              />
              <label
                for='fileInput'
                className='w-[300px] h-[200px] cursor-pointer bg-neutral-300 flex items-center justify-center p-[80px] rounded-xl overflow-hidden relative'
              >
                {" "}
                <PlusIcon className='text-white w-full' />
              </label>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className='flex flex-row gap-3'>
              {bgImgs &&
                bgImgs
                  ?.filter((el) => el.extraimg1)
                  ?.map((el, index) => (
                    <div
                      key={index}
                      className='w-[300px] h-[200px] rounded-xl overflow-hidden relative'
                    >
                      <button
                        onClick={() => deleteBgImg(el._id)}
                        className='bottom-1 left-1 absolute w-[25px] h-[25px] bg-red-500 p-1 rounded-full'
                      >
                        <TrashIcon className='text-white w-full' />
                      </button>
                      <img
                        src={el.image}
                        className='w-full h-full object-cover bg-center'
                      />
                    </div>
                  ))}
              {!bgImgs?.some((el) => el.extraimg1) && (
                <>
                  <input
                    onChange={(e) => handleAdImageChange(e, "extraimg1")}
                    type='file'
                    id='fileInput'
                    className='hidden w-0 h-0'
                  />
                  <label
                    for='fileInput'
                    className='w-[300px] h-[200px] cursor-pointer bg-neutral-300 flex items-center justify-center p-[80px] rounded-xl overflow-hidden relative'
                  >
                    {" "}
                    <PlusIcon className='text-white w-full' />
                  </label>
                </>
              )}
              {bgImgs &&
                bgImgs
                  ?.filter((el) => el.extraimg2)
                  ?.map((el, index) => (
                    <div
                      key={index}
                      className='w-[300px] h-[200px] rounded-xl overflow-hidden relative'
                    >
                      <button
                        onClick={() => deleteBgImg(el._id)}
                        className='bottom-1 left-1 absolute w-[25px] h-[25px] bg-red-500 p-1 rounded-full'
                      >
                        <TrashIcon className='text-white w-full' />
                      </button>
                      <img
                        src={el.image}
                        className='w-full h-full object-cover bg-center'
                      />
                    </div>
                  ))}
              {!bgImgs?.some((el) => el.extraimg2) && (
                <>
                  <input
                    onChange={(e) => handleAdImageChange(e, "extraimg2")}
                    type='file'
                    id='fileInput'
                    className='hidden w-0 h-0'
                  />
                  <label
                    for='fileInput'
                    className='w-[300px] h-[200px] cursor-pointer bg-neutral-300 flex items-center justify-center p-[80px] rounded-xl overflow-hidden relative'
                  >
                    {" "}
                    <PlusIcon className='text-white w-full' />
                  </label>
                </>
              )}
            </div>
          </TabPanel>
          {/* <TabPanel value={value} index={2}>
          Item Three
        </TabPanel> */}
        </Box>
      </div>
    </div>
  );
};

export default AdminMain;

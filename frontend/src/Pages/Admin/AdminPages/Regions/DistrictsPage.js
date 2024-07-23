import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import { regions } from "../makaData";

import RegionsTableTemp from "../../../../Components/Admin/RegionsPage/RegionsTableTemp";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllRegions,
  createDistrict,
  deleteDistrict,
  updateDistrict,
} from "./regionSlice";

const DistrictsPage = () => {
  const { regionId } = useParams();
  const dispatch = useDispatch();

  const { regions } = useSelector((state) => state.region);

  useEffect(() => {
    dispatch(getAllRegions());
  }, [dispatch]);

  useEffect(() => {}, [regions]);

  const navigate = useNavigate();
  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumbs aria-label='breadcrumb'>
        <span
          onClick={() => navigate("/admin/regions")}
          className='cursor-pointer'
          //   relative='path'
        >
          Viloyatlar
        </span>
        <Typography color='text.primary'>{regionId}</Typography>
      </Breadcrumbs>
      {regions && (
        <RegionsTableTemp
          data={
            regions[regions.findIndex((item) => item._id === regionId)]
              .districts
          }
          name='Shahar yoki tuman'
          actions={{
            createRegion: (body) =>
              dispatch(createDistrict({ ...body, region: regionId })),
            updateRegion: (body) => dispatch(updateDistrict(body)),
            deleteRegion: (body) => dispatch(deleteDistrict(body)),
          }}
        />
      )}
    </div>
  );
};

export default DistrictsPage;

import React, { useEffect } from "react";
import PageTitle from "../../../../Components/Admin/PageTitle";
import { Routes, Route } from "react-router-dom";
import DistrictsPage from "./DistrictsPage";
import RegionsTableTemp from "../../../../Components/Admin/RegionsPage/RegionsTableTemp";
import { useDispatch, useSelector } from "react-redux";
import {
  createRegion,
  deleteRegion,
  getAllRegions,
  updateRegion,
} from "./regionSlice";

const RegionsPage = () => {
  const dispatch = useDispatch();
  const { regions } = useSelector((state) => state.region);

  useEffect(() => {
    dispatch(getAllRegions());
  }, [dispatch]);

  return (
    <div className='flex flex-col w-full'>
      <PageTitle>Viloyatlar</PageTitle>
      <Routes>
        <Route path='/:regionId' element={<DistrictsPage />} />
        <Route
          path='/*'
          element={
            regions && (
              <RegionsTableTemp
                data={regions}
                name='Viloyat'
                actions={{
                  createRegion: (body) => dispatch(createRegion(body)),
                  updateRegion: (body) => dispatch(updateRegion(body)),
                  deleteRegion: (body) => dispatch(deleteRegion(body)),
                }}
              />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default RegionsPage;

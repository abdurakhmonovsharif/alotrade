import React, { useEffect, useState } from "react";
import AnnouncementCard from "./AnnouncementCard";
import MyAnnouncementCard from "./MyAnnouncementCard";
import { Button, Drawer, Pagination } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import CreateAnnouncements from "./CreateAnnouncements";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAnnsData,
  deleteAnn,
  getAnns,
  getAnnsCount,
} from "./announcementSlice";
import EditAnnouncement from "./EditAnnouncement";
import UniversalModal from "../../../Components/Modal/UniversalModal";
import { universalToast } from "../../../Components/ToastMessages/ToastMessages";
import { DataGrid } from "@mui/x-data-grid";
import TimeAgo from "javascript-time-ago";

// English.
import ru from "javascript-time-ago/locale/ru";

import Api from "../../../Config/Api";
import { Loading } from "@nextui-org/react";

TimeAgo.addDefaultLocale(ru);

const timeAgo = new TimeAgo("ru-Ru");

const columns = [
  { field: "id", headerName: "№", width: 70 },
  // { field: "firstname", headerName: "First name", width: 130 },
  // { field: "lastname", headerName: "Last name", width: 130 },

  {
    field: "name",
    headerName: "Они были заинтересованы",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 300,
    valueGetter: (params) =>
      `${params.row.firstname || ""} ${params.row.lastname || ""} ${
        params.row?.organization ? ", " + params.row?.organization?.name : ""
      }`,
  },
  {
    field: "phone",
    headerName: "Тел",
    type: "number",
    width: 160,
  },
  {
    field: "region",
    headerName: "Регион",

    width: 160,
    valueGetter: (params) =>
      `${params.row.region.name || ""} 
      `,
  },
  {
    field: "district",
    headerName: "Город",

    width: 160,
    valueGetter: (params) =>
      `${params.row.district.name || ""} 
      `,
  },
  // {
  //   field: "date",
  //   headerName: "Дата",

  //   width: 160,
  //   valueGetter: (params) =>
  //     `${timeAgo.format(new Date(params.row.createdAt)) || ""}
  //     `,
  // },
];

const MyAnnouncements = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    logged,
    userData: { user, organization },
  } = useSelector((state) => state.login);
  const { anns, loading } = useSelector((state) => state.anns);
  const { categories, subcategories, tradetypes, regions, districts, name } =
    useSelector((state) => state.filter);
  const [annId, setAnnId] = useState(null);
  const [totalDatas, setTotalDatas] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const countPage = 10;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalBody, setModalBody] = useState(null);

  const [modalVisibleOrg, setModalVisibleOrg] = useState(false);

  const [filterVisible, setFilterVisible] = useState(false);
  const [filterBody, setFilterBody] = useState(null);

  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedAnn, setSelectedAnn] = useState(null);

  const [statistics, setStatistics] = useState([]);

  const [loadingStats, setLoadingStats] = useState(false);

  const fetchStatisticsById = async (id) => {
    setStatistics([]);
    setLoadingStats(true);
    const resFavs = await Api.post(
      `/announcement/post/get/getStatistics/${id}`,
      {
        get: "favorites",
      }
    );
    const resSeen = await Api.post(
      `/announcement/post/get/getStatistics/${id}`,
      {
        get: "whoseen",
      }
    );
    const resInterest = await Api.post(
      `/announcement/post/get/getStatistics/${id}`,
      {
        get: "interest",
      }
    );
    let tempArr = [
      ...resFavs.data?.data,
      ...resInterest.data?.data,
      ...resSeen.data?.data,
    ];
    tempArr.sort((a, b) => {
      {
        var c = new Date(a.createdAt);
        var d = new Date(b.createdAt);
        return c - d;
      }
    });
    tempArr = tempArr.map((el, index) => ({ id: index + 1, ...el }));

    setStatistics(tempArr);
    setLoadingStats(false);
  };

  const closeHandler = () => {
    setModalVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const deleteHandler = (id) => {
    setAnnId(id);
    setModalBody("approve");
    setModalVisible(true);
  };

  const deleteAnnById = () => {
    if (annId) {
      dispatch(deleteAnn({ id: annId })).then(({ error }) => {
        if (!error) {
          setModalVisible(false);
          setAnnId(null);
          universalToast("Товар успешно удален", "success");
        }
      });
    }
  };

  // useEffect(() => {
  //   const data = {
  //     post: "my",
  //     page: 0,
  //     count: countPage,
  //     categories: categories,
  //     subcategories: subcategories,
  //     tradetypes: tradetypes,
  //     regions: regions,
  //     districts: districts,
  //     user: user?._id,
  //     name,
  //   };
  //   setCurrentPage(0);
  //   dispatch(getAnns(data));
  //   dispatch(getAnnsCount(data)).then(({ error, payload: { totalCount } }) => {
  //     if (!error) {
  //       setTotalDatas(totalCount);
  //     }
  //   });
  // }, [
  //   dispatch,
  //   product,
  //   categories,
  //   subcategories,
  //   tradetypes,
  //   regions,
  //   districts,
  //   user,
  //   name,
  // ]);

  const fetchAllData = () => {
    const data = {
      page: currentPage,
      count: countPage,
      post: "my",
      categories: [],
      subcategories: [],
      tradetypes: [],
      regions: [],
      districts: [],
      user: user?._id,
      name,
    };

    dispatch(getAnns(data));
    dispatch(getAnnsCount(data)).then(({ payload: { totalCount }, error }) => {
      if (!error) {
        setTotalDatas(totalCount);
      }
    });
  };
  useEffect(() => {
    fetchAllData();

    //    eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(clearAnnsData());
  }, [dispatch]);
  return (
    <div className='flex flex-col gap-8 p-5 items-center'>
      <div className='flex flex-row w-full items-center gap-3 md:gap-10 px-2 md:px-10'>
        <button
          onClick={() => {
            navigate("/profile/announcements");
            fetchAllData();
          }}
          className='text-[16px] font-bold bg-alotrade/10 px-3 py-2 rounded-lg'
        >
          Мои рекламы
        </button>
        <Button
          onClick={() =>
            organization
              ? organization?.is_active
                ? navigate("/create_announcement")
                : setModalVisibleOrg(true)
              : navigate("/create_announcement")
          }
          color='alotrade'
          variant='contained'
        >
          {"Создать рекламу"}
        </Button>
      </div>

      <Routes>
        <Route path='/edit/:id' element={<EditAnnouncement />} />
        <Route
          path='/*'
          element={
            <>
              {loading ? (
                <Loading />
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-3 gap-3 items-center justify-center w-full'>
                  {anns?.map((el, index) => (
                    <MyAnnouncementCard
                      showStatistcs={async (id) => {
                        setShowDrawer(true);

                        await fetchStatisticsById(id);
                      }}
                      key={el._id}
                      data={el}
                      deleteHandler={deleteHandler}
                    />
                  ))}
                </div>
              )}
              <Pagination
                defaultPage={0}
                variant='outlined'
                color='primary'
                count={Math.ceil(totalDatas / countPage)}
                page={currentPage + 1}
                onChange={(event, value) => {
                  setCurrentPage(value - 1);
                }}
              />
              <UniversalModal
                isOpen={modalVisible}
                body={modalBody}
                closeModal={closeHandler}
                toggleModal={toggleModal}
                productId={annId}
                modalBody={modalBody}
                headerText='Удалить рекламу'
                title='Вы действительно хотите удалить рекламу?'
                approveFunction={deleteAnnById}
              />

              <Drawer
                anchor={"bottom"}
                open={showDrawer}
                onClose={() => setShowDrawer(false)}
              >
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    disableColumnMenu
                    disableColumnFilter
                    rows={statistics}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                    slots={{
                      noRowsOverlay: () => (
                        <div className='flex justify-center items-center h-full w-full'>
                          {loadingStats ? <Loading /> : <span>Нет данных</span>}
                        </div>
                      ),
                    }}
                    componentsProps={{
                      pagination: {
                        labelRowsPerPage: "Элементов на странице",
                      },
                    }}
                    // labelRowsPerPage={"Your text"}
                  />
                </div>
              </Drawer>
            </>
          }
        />
      </Routes>
      <UniversalModal
        body={"warningOrg"}
        isOpen={modalVisibleOrg}
        closeModal={() => setModalVisibleOrg(false)}
        toggleModal={() => setModalVisibleOrg(false)}
      />
    </div>
  );
};

export default MyAnnouncements;

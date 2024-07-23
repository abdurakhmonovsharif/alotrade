import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOrderById } from "../../Pages/User/Orders/orderSlice";
import UniversalModal from "../Modal/UniversalModal";

const CardAdditional = ({
  region,
  phone,
  logged,
  position,
  isOrganization,
  id,
  deleteHandler,
  editHandler,
  updatePosition,
  isProfile,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [phoneValue, setPhoneValue] = useState("Контакты");
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenNumber = () => {
    if (!visible) {
      setPhoneValue(phone);
      setVisible(true);
    } else {
      setPhoneValue("Контакты");
      setVisible(false);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const navigateToDetail = () => {
    dispatch(getOrderById({ id }));
    navigate(`/orders/${id}`);
  };

  if (isProfile) {
    return (
      <div class="pr-6">
        <div class="text-grey-500 flex items-center gap-2 my-4">
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p class="text-xs font-semibold">{region?.name}</p>
        </div>
        <div class="flex justify-end pr-2 pb-4 md:pb-0">
          <button
            onClick={() => editHandler(id)}
            className="bg-orange-500 text-[10px] md:text-[16px] text-white cursor-pointer px-3 py-1 text-center justify-center items-center rounded-l-xl flex space-x-2 flex-row"
          >
            Редактировать
          </button>
          <button
            onClick={() => updatePosition(id)}
            class="bg-green-500 text-[10px] md:text-[16px] text-white cursor-pointer px-3 text-center justify-center items-center py-1 rounded-none flex space-x-2 flex-row"
          >
            {position === "active" ? "Остановить" : "Активировать"}
          </button>
          <button
            onClick={() => deleteHandler(id)}
            class="bg-red-500 text-[10px] md:text-[16px] text-white cursor-pointer px-3 text-center justify-center items-center py-1 rounded-r-xl flex space-x-2 flex-row"
          >
            Удалить
          </button>
        </div>
      </div>
    );
  }
  return (
    <>
      <div class="flex justify-between items-center ">
        <div class="text-grey-500 flex items-center gap-2 my-4">
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p class="text-xs font-semibold">{region?.name}</p>
        </div>
        <div class="flex flex-row gap-2 pr-2">
          {position === "active" && (
            <>
              <button
                onClick={() =>
                  logged && isOrganization ? navigateToDetail() : openModal()
                }
                className="bg-orange-500 text-[12px] md:text-[16px] shadow-lg shadow- shadow-orange-600 text-white cursor-pointer px-3 py-1 text-center justify-center items-center rounded-xl flex space-x-2 flex-row"
              >
                Подробнее
              </button>
              {logged && isOrganization && (
                <div
                  onClick={() => handleOpenNumber()}
                  class="bg-green-500 shadow-lg text-[12px] md:text-[16px] shadow- shadow-green-600 text-white cursor-pointer px-3 text-center justify-center items-center py-1 rounded-xl flex space-x-2 flex-row"
                >
                  {phoneValue}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <UniversalModal
        body={"warningSignIn"}
        isOpen={modalVisible}
        closeModal={() => setModalVisible(false)}
      />
    </>
  );
};

export default CardAdditional;

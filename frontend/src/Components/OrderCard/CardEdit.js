import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { updateOrderPosition } from "../../Pages/User/Orders/orderSlice";

const CardEdit = ({
  editHandler,
  orderId,
  deleteHandler,
  position,
  translations,
}) => {
  const isActive = position === "active";
  const dispatch = useDispatch();
  const updatePosition = () => {
    dispatch(updateOrderPosition({ id: orderId }));
  };

  return (
    <div className="w-full border-t flex m-0">
      <button
        onClick={updatePosition}
        className="w-full flex justify-center border-r py-1 text-neutral-500"
      >
        {isActive ? translations.yakunlash : translations.faollashtirish}
      </button>
      <button
        onClick={() => editHandler(orderId)}
        className="w-full flex justify-center border-r py-1 "
      >
        <BsPencilSquare size={22} className="text-neutral-500" />
      </button>
      <button
        className=" w-full flex justify-center py-1"
        onClick={() => deleteHandler(orderId)}
      >
        <IoTrashOutline size={25} className="text-neutral-500" />
      </button>
    </div>
  );
};

export default CardEdit;

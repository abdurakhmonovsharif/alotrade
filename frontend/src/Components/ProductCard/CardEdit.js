import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";

const CardEdit = ({ editHandler, productId, deleteHandler }) => {
  return (
    <div className="w-full border-t product-t flex m-0">
      <button
        onClick={() => editHandler(productId)}
        className="w-full flex justify-center items-center rounded-bl-xl border-r product-r py-1 bg-orange-500"
      >
        <BsPencilSquare size={18} className="text-white" />
      </button>
      <button
        className=" w-full flex justify-center items-center py-1 rounded-br-xl bg-[#ff0000]"
        onClick={() => deleteHandler(productId)}
      >
        <IoTrashOutline size={22} className="text-white" />
      </button>
    </div>
  );
};

export default CardEdit;

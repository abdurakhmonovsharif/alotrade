import React from "react";
import { IoArrowDownOutline, IoArrowUpOutline } from "react-icons/io5";
import { HiOutlineBellAlert } from "react-icons/hi2";

const ChatUser = ({ offer, user, changeOffer }) => {
  const _id = user?._id;
  const { order, product, messages, createdAt, offererUser } = offer;
  const name = order ? order.name : product ? product.name : "";
  const { message, isRead, user: chatUser } = messages;
  const image = order ? order.images[0] : product ? product.images[0] : null;
  const isUser = offererUser._id === _id;
  const isNew = chatUser !== user?._id && !isRead;

  return (
    <div
      onClick={changeOffer}
      className="bg-white flex items-center hover:bg-grey-lighter cursor-pointer flex-row border-b pl-3"
    >
      <div>
        {image ? (
          <img
            alt={"alotrade.uz"}
            className="h-12 w-12 rounded-full"
            src={image}
          />
        ) : (
          <div className="h-12 w-12 rounded-full border-dashed bg-neutral-200 flex items-center justify-center">
            IMG
          </div>
        )}
        <p className="text-xs text-neutral-600 mt-2">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="ml-4 flex-1 py-4 pr-2">
        <div className="flex items-bottom justify-between">
          <p className="text-neutral-500 font-amazonbold h-6 overflow-hidden">
            {name}
          </p>
          {isNew && <HiOutlineBellAlert className="fill-green-500" size={20} />}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-neutral-500 mt-1 text-sm h-6 overflow-hidden">
            {message && message}
          </p>
          <p className="text-xs text-neutral-600">
            {isUser ? (
              <IoArrowUpOutline size={15} className="rotate-45" />
            ) : (
              <IoArrowDownOutline size={15} className="rotate-45" />
            )}
          </p>
        </div>
      </div>
      {/*<div className="flex h-[90px] bg-green-100 flex items-center text-primary-800">*/}
      {/*  <HiOutlineArrowNarrowUp size={27} />*/}
      {/*</div>*/}
    </div>
  );
};

export default ChatUser;

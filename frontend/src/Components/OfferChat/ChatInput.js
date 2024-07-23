import React from "react";
import { IoSend } from "react-icons/io5";
import { getTranslations } from "../../translation";
import { useTranslation } from "react-i18next";

const ChatInput = ({ changeHandler, enterHandler, sendHandler, value }) => {
  const { t } = useTranslation();
  const { xabarni_kiriting } = getTranslations(t);
  return (
    <div className="bg-white-900 w-full h-[5rem] px-10 py-5 flex">
      <input
        value={value}
        onKeyUp={enterHandler}
        onChange={changeHandler}
        placeholder={xabarni_kiriting}
        className="border rounded-l w-full py-1 px-3 outline-0"
      />
      <button
        onClick={sendHandler}
        className="px-3 border-r border-y text-neutral-500 rounded-r"
      >
        <IoSend color="#fff" />
      </button>
    </div>
  );
};

export default ChatInput;

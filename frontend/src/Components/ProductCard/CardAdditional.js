import React, { useState } from "react";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import { map } from "lodash";

const CardAdditional = ({
  categories,
  district,
  tradetypes,
  region,
  // status,
  subcategories,
  images,
  phone,
  organization,
  description,
}) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("ko'proq ma'lumot");
  const [icon, setIcon] = useState(
    <IoChevronDownOutline size={16} color="#0090A2" className="mt-2" />
  );
  const toggle = () => {
    setTitle(show ? "ko'proq ma'lumot" : "yopish");
    setIcon(
      show ? (
        <IoChevronDownOutline size={16} color="#0090A2" className="mt-2" />
      ) : (
        <IoChevronUpOutline size={16} color="#0090A2" className="mt-2" />
      )
    );
    setShow(!show);
  };
  return (
    <div className="hidden md:block text-neutral-500 rounded-b-xl px-3">
      {show && (
        <div className="col-span-5">
          <h3 className="text-neutral-600 text-justify py-2">{description}</h3>
          <h4 className="">
            <span className="font-amazonbold">Telefon raqam:</span>{" "}
            <span className="lowercase ">
              {organization ? organization?.phone : phone}
            </span>
          </h4>
          <p className="">
            <span className="font-amazonbold">Savdo turi:</span>{" "}
            <span className="lowercase ">
              {map(tradetypes, (tradetype) => tradetype.name + ", ")}
            </span>
          </p>
          <p className="">
            <span className="font-amazonbold">Kategoriyasi:</span>{" "}
            <span className="lowercase ">
              {map(categories, (category) => category.name + ", ")}
            </span>
          </p>
          <p className="">
            <span className="font-amazonbold">Kategoriyasi turlari:</span>{" "}
            <span className="lowercase ">
              {map(subcategories, (subcategory) => subcategory.name + ", ")}
            </span>
          </p>
          {
            <p className="text-neutral-500">
              <span className="font-amazonbold mr-2">Manzil:</span>
              {region?.name}, {district?.name}
            </p>
          }
        </div>
      )}

      <button onClick={toggle} className="w-full text-primary-800 ">
        <span className="w-full flex items-center pointer-events-none">
          <span className="pt-2"> {title}</span>
          <span className="">{icon}</span>
        </span>
      </button>
    </div>
  );
};

export default CardAdditional;

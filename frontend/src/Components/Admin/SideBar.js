import LogoImg from "../../assets/images/logo.png";
import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  HomeIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  MegaphoneIcon,
  RectangleStackIcon,
  MapPinIcon,
  ArrowRightOnRectangleIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const currPath = useLocation().pathname;

  const sidebarMenus = [
    {
      pathName: "/admin/home",
      name: "Bosh sahifa",
      icon: <HomeIcon className='w-[21px] stroke-[1.5px]' />,
    },
    {
      pathName: "/admin/organizations",
      name: "Tashkilotlar",
      icon: <BuildingOffice2Icon className='w-[21px] stroke-[1.5px]' />,
    },
    {
      pathName: "/admin/users",
      name: "Foydalanuvchilar",
      icon: <UserGroupIcon className='w-[21px] stroke-[1.5px]' />,
    },
    {
      pathName: "/admin/products",
      name: "Tovarlar",
      icon: <ShoppingCartIcon className='w-[21px] stroke-[1.5px]' />,
    },
    {
      pathName: "/admin/orders",
      name: "Buyurtmalar",
      icon: <ClipboardDocumentListIcon className='w-[21px] stroke-[1.5px]' />,
    },
    {
      pathName: "/admin/announcements",
      name: "E'lonlar",
      icon: <MegaphoneIcon className='w-[21px] stroke-[1.5px]' />,
    },
    {
      pathName: "/admin/categories",
      name: "Kategoriyalar",
      icon: <RectangleStackIcon className='w-[21px] stroke-[1.5px]' />,
    },
    {
      pathName: "/admin/regions",
      name: "Viloyatlar",
      icon: <MapPinIcon className='w-[21px] stroke-[1.5px]' />,
    },
  ];

  return (
    <div className='flex flex-none h-full w-[300px] fixed'>
      <Sidebar width={"250px"} className='h-full'>
        <Menu
          className='flex flex-col relative h-full'
          menuItemStyles={{
            root: {
              fontSize: "14px",
              fontWeight: 400,
            },
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#00c2cb",
                  },
                  padding: "30px",

                  color: active ? "#fff" : "#000",
                  backgroundColor: active ? "#00c2cb" : undefined,
                };
            },
          }}
        >
          <div className='flex flex-col items-center'>
            <div className='flex justify-center items-center w-full h-[130px] mb-[10px] px-5 py-10'>
              <div className='w-[60px] h-[60px] bg-alotrade rounded-2xl shadow-xl'>
                <img src={LogoImg} className='w-full h-full' />
              </div>
            </div>
            {sidebarMenus.map((menu, index) => (
              <MenuItem
                key={index}
                icon={menu.icon}
                active={currPath.startsWith(menu.pathName)}
                component={<NavLink to={menu.pathName} />}
              >
                {menu.name}{" "}
              </MenuItem>
            ))}
          </div>
          <div className='bottom-0 left-0 w-full p-8'>
            <button
              onClick={() => {
                localStorage.removeItem("admin-token");
                navigate("/admin/login");
              }}
              className='flex flex-row items-center gap-3 py-3 px-8 w-full text-[14px] rounded-md bg-neutral-700 text-white'
            >
              <ArrowRightOnRectangleIcon className='w-[20px]' />
              <span>Chiqish</span>
            </button>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;

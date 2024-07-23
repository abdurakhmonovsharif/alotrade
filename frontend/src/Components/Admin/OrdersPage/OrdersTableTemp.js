import React, { useState, useCallback, useMemo, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  MenuItem,
  // Tooltip,
} from "@mui/material";
import {
  CheckBox,
  CheckBoxOutlineBlankRounded,
  CheckBoxRounded,
  CheckCircleOutlineRounded,
  Delete,
  Edit,
  RemoveRedEye,
  SendRounded,
  ViewAgenda,
} from "@mui/icons-material";

import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import date from "date-and-time";
import CreateEditModal from "../CreateEditModal";
import InfoModal from "../DeleteModal";
import { Popover, Tooltip } from "@nextui-org/react";

const OrdersTableTemp = ({ data, name, actions }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState(null);

  const [tableData, setTableData] = useState(() => data);
  const [validationErrors, setValidationErrors] = useState({});

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmModalData, setconfirmModalData] = useState(null);

  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [publishModalData, setPublishModalData] = useState(null);

  const [actionType, setActionType] = useState("ADD");
  const [currentId, setCurrentId] = useState(null);

  const [initialState, setInitialState] = useState({
    name: "",
    price: "",
  });

  useEffect(() => {}, []);

  const navigate = useNavigate();

  const changeCreateModalOpen = useCallback(
    (val) => {
      setCreateModalOpen(val);
    },
    [setCreateModalOpen]
  );

  const adSchema = yup.object().shape({
    name: yup.string().required("Nomi bo'sh bo'lmasligi kerak!"),
    price: yup.string().required("Narxi bo'sh bolmasligi kerak!"),
    // telegramLink: yup
    //   .string()
    //   .required("Telegram Link bo'sh bo'lmasligi kerak!"),
    // image: yup.mixed().required("Fayl bo'sh bo'lmasligi kerak!"),
  });

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      //send/receive api updates here, then refetch or update local table data for re-render
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row) => {
      setDeleteModalOpen(true);
      setDeleteModalData(row);
    },
    [tableData]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "ID",
        enableColumnOrdering: true,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "name",
        header: "Sarlavhasi",
        size: 140,
        Cell: ({ cell }) => (
          <span className='text-ellipsis overflow-hidden line-clamp-2'>
            {cell.getValue()}
          </span>
        ),
      },

      {
        accessorKey: "description",
        header: "Tavsiloti",
        size: 140,
        Cell: ({ cell }) => (
          <Tooltip placement='left' content={<span>{cell.getValue()}</span>}>
            <span className='text-ellipsis overflow-hidden line-clamp-2'>
              {cell.getValue()}
            </span>
          </Tooltip>
          // <Popover>
          //   <Popover.Trigger>
          //     <span className='text-ellipsis overflow-hidden line-clamp-2'>
          //       {cell.getValue()}
          //     </span>
          //   </Popover.Trigger>
          //   <Popover.Content>
          //     <span>{cell.getValue()}</span>
          //   </Popover.Content>
          // </Popover>
        ),
      },
      {
        accessorKey: "is_confirmed",
        header: "Confirm Statusi",
        size: 140,
        Cell: ({ cell }) =>
          cell.getValue() ? (
            <span className='w-fit h-fit rounded-md p-2 bg-green-400 text-white text-[12px]'>
              Tasdiqlangan
            </span>
          ) : (
            <span className='w-fit h-fit rounded-md p-2 bg-red-400 text-white text-[12px]'>
              Tasdiqlanmagan
            </span>
          ),
      },
      {
        accessorKey: "is_published",
        header: "Publish Statusi",
        size: 140,
        Cell: ({ cell }) =>
          cell.getValue() ? (
            <span className='w-fit h-fit rounded-md p-2 bg-green-400 text-white text-[12px]'>
              Published
            </span>
          ) : (
            <span className='w-fit h-fit rounded-md p-2 bg-red-400 text-white text-[12px]'>
              Not published
            </span>
          ),
      },
      {
        accessorKey: "position",
        header: "Position Statusi",
        size: 140,
        Cell: ({ cell }) =>
          cell.getValue() == "active" ? (
            <span className='w-fit h-fit rounded-md p-2 bg-green-400 text-white text-[12px]'>
              Aktiv
            </span>
          ) : (
            <span className='w-fit h-fit rounded-md p-2 bg-red-400 text-white text-[12px]'>
              Aktiv emas
            </span>
          ),
      },
      {
        accessorKey: "maxPrice",
        header: "Narxi",
        size: 140,
      },
      {
        accessorKey: "currency",
        header: "Currency",
        size: 140,
      },

      {
        accessorKey: "categories",
        header: "Kayegoriya",
        size: 140,
        Cell: ({ cell }) =>
          cell.getValue()?.map((el) => <span>{el.name}</span>),
      },

      {
        accessorKey: "subcategories",
        header: "Sub kategoriya",
        size: 140,
        Cell: ({ cell }) =>
          cell.getValue()?.map((el) => <span>{el.name}</span>),
      },

      {
        accessorKey: "user",
        header: "Foydalanuvchi",
        size: 140,
        Cell: ({ cell }) =>
          cell.getValue() && (
            <div className='flex flex-row'>
              <span className=''>{`${cell?.getValue()?.lastname} ${
                cell?.getValue()?.firstname
              }`}</span>
            </div>
          ),
      },

      {
        accessorKey: "createdAt",
        header: "Qo'shilgan sanasi",
        enableEditing: false,
        size: 140,
        Cell: ({ cell }) => {
          const sana = new Date(cell.getValue());
          return <span>{date.format(sana, "HH:mm - ddd, MMM DD YYYY")}</span>;
        },
      },

      // {
      //   accessorKey: "organization.name",
      //   header: "Tashkilot",
      //   size: 140,
      //   Cell: ({ cell }) => (
      //     <div className='flex flex-row'>
      //       <span className=''>{`${cell.getValue()}`}</span>
      //     </div>
      //   ),
      // },

      {
        accessorKey: "images",
        header: "Rasmlar",
        size: 140,
        Cell: ({ cell }) => (
          <span className='text-ellipsis overflow-hidden line-clamp-1 w-[100px]'>
            {cell.getValue()}
          </span>
        ),
      },

      // {
      //     accessorKey: 'state',
      //     header: 'State',
      //     muiTableBodyCellEditTextFieldProps: {
      //         select: true, //change to select for a dropdown
      //         children: states.map((state) => (
      //             <MenuItem key={state} value={state}>
      //                 {state}
      //             </MenuItem>
      //         )),
      //     },
      // },
    ],
    []
  );
  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 120,
          },
        }}
        columns={columns}
        data={data}
        editingMode='modal' //default
        enableColumnOrdering
        enableRowSelection
        enableRowActions
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderDetailPanel={({ row }) => {
          return (
            <div className='flex flex-row gap-8'>
              {row.getValue("images").map((el) => (
                <img
                  alt='avatar'
                  src={el}
                  loading='lazy'
                  className='w-[210px] h-[210px] object-cover'
                />
              ))}
            </div>
          );
        }}
        // renderRowActionMenuItems={({closeMenu}) => [
        //     <MenuItem
        //         key={0}
        //         onClick={() => {
        //             // View profile logic...
        //             closeMenu();
        //         }}
        //         sx={{m: 0}}
        //     >
        //         <ListItemIcon>
        //             <AccountCircle/>
        //
        //         </ListItemIcon>
        //         View Profile
        //     </MenuItem>,
        //     <MenuItem
        //         key={1}
        //         onClick={() => {
        //             // Send email logic...
        //             closeMenu();
        //         }}
        //         sx={{m: 0}}
        //     >
        //         <ListItemIcon>
        //             <Send/>
        //         </ListItemIcon>
        //         Send Email
        //     </MenuItem>,
        // ]}
        renderRowActionMenuItems={({ row, closeMenu }) => [
          !row.getValue("is_confirmed") && (
            <MenuItem
              key={0}
              onClick={() => {
                setConfirmModalOpen(true);
                setconfirmModalData(row);
              }}
              sx={{ m: 0 }}
            >
              <ListItemIcon>
                <CheckCircleOutlineRounded />
              </ListItemIcon>
              Tasdiqlash
            </MenuItem>
          ),
          !row.getValue("is_published") && (
            <MenuItem
              key={0}
              onClick={() => {
                setPublishModalOpen(true);
                setPublishModalData(row);
              }}
              sx={{ m: 0 }}
            >
              <ListItemIcon>
                <SendRounded />
              </ListItemIcon>
              Publish
            </MenuItem>
          ),
          !row.getValue("isArchive") && (
            <MenuItem
              key={1}
              onClick={() => handleDeleteRow(row)}
              sx={{ m: 0 }}
            >
              <ListItemIcon color='error'>
                <Delete color='error' />
              </ListItemIcon>
              {"O'chirish"}
            </MenuItem>
          ),
        ]}

        // renderTopToolbarCustomActions={() => (
        //   <Button
        //     variant='contained'
        //     color='alotrade'
        //     onClick={() => {
        //       setActionType("ADD");
        //       setCurrentId(null);

        //       setInitialState({
        //         name: "",
        //         price: "",
        //       });
        //       changeCreateModalOpen(true);
        //     }}
        //     // variant="contained"
        //   >
        //     {"Yangi reklama qo'shish"}
        //   </Button>
        // )}
      />
      {/* <CreateEditModal
        currentId={currentId}
        submitHandler={
          actionType == "ADD" ? actions.createAd : actions.updateAd
        }
        validationSchema={adSchema}
        initialValues={initialState}
        fields={[
          { name: "name", type: "text", label: "Nomi" },
          // { name: "telegramLink", type: "text", label: "Telegram Link" },
          { name: "price", type: "text", label: "Narxi" },
        ]}
        actionName={actionType === "ADD" ? "Qo'shish" : "Tashrirlash"}
        title={`${name} ${actionType === "ADD" ? "qo'shish" : "tahrirlash"}`}
        openState={{ open: createModalOpen, setOpen: changeCreateModalOpen }}
      /> */}
      <InfoModal
        openState={{ open: deleteModalOpen, setOpen: setDeleteModalOpen }}
        content={` ${deleteModalData?.getValue("name")}`}
        context={{ title: "O'chirish", btnText: "O'chirish" }}
        idKey={deleteModalData?.getValue("_id")}
        submitHandler={(body) => actions.deleteOrder(body)}
      />
      <InfoModal
        context={{ title: "Publish", btnText: "Publish" }}
        openState={{ open: publishModalOpen, setOpen: setPublishModalOpen }}
        content={publishModalData?.getValue("name")}
        idKey={publishModalData?.getValue("_id")}
        submitHandler={(body) => actions.publishOrder(body)}
      />
      <InfoModal
        context={{ title: "Tasdiqlash", btnText: "Tasdiqlash" }}
        openState={{ open: confirmModalOpen, setOpen: setConfirmModalOpen }}
        content={confirmModalData?.getValue("name")}
        idKey={confirmModalData?.getValue("_id")}
        submitHandler={(body) => actions.confirmOrder(body)}
      />
    </>
  );
};

export default OrdersTableTemp;

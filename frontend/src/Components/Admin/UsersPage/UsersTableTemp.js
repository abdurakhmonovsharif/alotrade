import React, { useState, useCallback, useMemo, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import {
  Delete,
  Edit,
  Money,
  MoneyRounded,
  RemoveRedEye,
  ViewAgenda,
} from "@mui/icons-material";
import CreateEditModal from "../CreateEditModal";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import date from "date-and-time";
import InfoModal from "../DeleteModal";
import { BanknotesIcon } from "@heroicons/react/24/outline";

const UsersTableTemp = ({ data, name, actions }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState(null);

  const [changeBModalOpen, setChangeBModalOpen] = useState(false);
  const [changeBModalData, setChangeBModalData] = useState(null);

  const [tableData, setTableData] = useState(() => data);
  const [validationErrors, setValidationErrors] = useState({});

  const [actionType, setActionType] = useState("ADD");
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {}, []);

  const navigate = useNavigate();

  const changeCreateModalOpen = useCallback(
    (val) => {
      setCreateModalOpen(val);
    },
    [setCreateModalOpen]
  );

  const changeBalanceModalOpen = useCallback(
    (val) => {
      setChangeBModalOpen(val);
    },
    [setChangeBModalOpen]
  );

  const [initialState, setInitialState] = useState({
    sum: 0,
  });

  const balanceSchema = yup.object().shape({
    sum: yup.number().required("Qiymat bo'sh bo'lmasligi kerak!"),
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

  const handleChangeBalanceRow = useCallback(
    (row) => {
      setChangeBModalOpen(true);
      setChangeBModalData(row);
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
        accessorKey: "firstname",
        header: "Ismi",
        size: 140,
      },
      {
        accessorKey: "lastname",
        header: "Familiyasi",
        size: 140,
      },
      {
        accessorKey: "phone",
        header: "Tel. raqami",
        enableEditing: false,
        size: 140,
      },
      {
        accessorKey: "balance",
        header: "Balansi",
        enableEditing: false,
        size: 140,
      },

      {
        accessorKey: "organization.name",
        header: "Tashkilot nomi",
        enableEditing: false,
        size: 140,
      },
      // {
      //   accessorKey: "region",
      //   header: "Viloyat",
      //   enableEditing: false,
      //   size: 140,
      // },
      // {
      //   accessorKey: "district.name",
      //   header: "Shahar yoki tuman",
      //   enableEditing: false,
      //   size: 140,
      // },

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
      //   accessorKey: "is_active",
      //   header: "Statusi",
      //   enableEditing: false,
      //   size: 140,

      //   Cell: ({ cell }) =>
      //     cell.getValue() && (
      //       <span className='rounded-md p-2 bg-red-400 text-white text-[12px]'>
      //         Arxivlangan
      //       </span>
      //     ),
      // },

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
        enableEditing
        enableRowSelection
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
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

        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement='right' title='Change balance'>
              <IconButton
                color='success'
                onClick={() => handleChangeBalanceRow(row)}
              >
                <BanknotesIcon className='w-[25px] text-green-500' />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement='right' title='Delete'>
              <IconButton color='error' onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        // renderTopToolbarCustomActions={() => (
        //   <Button
        //     variant='contained'
        //     color='alotrade'
        //     onClick={() => {
        //       setActionType("ADD");
        //       setCurrentId(null);

        //       setInitialState({
        //         name: "",
        //         telegramLink: "",
        //         image: "",
        //       });
        //       changeCreateModalOpen(true);
        //     }}
        //     // variant="contained"
        //   >
        //     {"Yangi kategoriya qo'shish"}
        //   </Button>
        // )}
      />
      {/* <CreateEditModal
        currentId={currentId}
        submitHandler={
          actionType == "ADD" ? actions.createCategory : actions.editCategory
        }
        validationSchema={loginSchema}
        initialValues={initialState}
        fields={
          type == "main"
            ? [
                { name: "name", type: "text", label: "Nomi" },
                // { name: "telegramLink", type: "text", label: "Telegram Link" },
                { name: "image", type: "file", label: "Rasm" },
              ]
            : [
                { name: "name", type: "text", label: "Nomi" },
                // { name: "telegramLink", type: "text", label: "Telegram Link" },
                // { name: "image", type: "file", label: "Rasm" },
              ]
        }
        actionName={actionType === "ADD" ? "Qo'shish" : "Tashrirlash"}
        title={`${name} ${actionType === "ADD" ? "qo'shish" : "tahrirlash"}`}
        openState={{ open: createModalOpen, setOpen: changeCreateModalOpen }}
      /> */}
      {/* <InfoModal
        openState={{ open: deleteModalOpen, setOpen: setDeleteModalOpen }}
        content={`${deleteModalData?.getValue(
          "firstname"
        )} ${deleteModalData?.getValue("lastname")}`}
        idKey={deleteModalData?.getValue("_id")}
        submitHandler={(body) => actions.deleteCategory(body)}
      /> */}

      <CreateEditModal
        currentId={currentId}
        submitHandler={(body) =>
          actions.changeBalance({
            ...body,
            userId: changeBModalData.getValue("_id"),
          })
        }
        validationSchema={balanceSchema}
        initialValues={initialState}
        fields={[
          { name: "sum", type: "number", label: "Nomi" },
          // { name: "telegramLink", type: "text", label: "Telegram Link" },
          // { name: "image", type: "file", label: "Rasm" },
        ]}
        actionName={"Balansni o'zgartirish"}
        title={`${name} ${"Balansni o'zgartirish"}`}
        openState={{ open: changeBModalOpen, setOpen: changeBalanceModalOpen }}
      />

      <InfoModal
        openState={{ open: deleteModalOpen, setOpen: setDeleteModalOpen }}
        content={` ${deleteModalData?.getValue(
          "firstname"
        )} ${deleteModalData?.getValue("lastname")}`}
        context={{ title: "O'chirish", btnText: "O'chirish" }}
        idKey={deleteModalData?.getValue("_id")}
        submitHandler={(body) => actions.deleteUser(body)}
      />
    </>
  );
};

export default UsersTableTemp;

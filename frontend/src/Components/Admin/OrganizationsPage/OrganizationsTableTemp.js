import React, { useState, useCallback, useMemo } from "react";
import PageTitle from "../../../Components/Admin/PageTitle";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, RemoveRedEye, ViewAgenda } from "@mui/icons-material";
import CreateEditModal from "../CreateEditModal";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import { PowerIcon } from "@heroicons/react/24/outline";
import InfoModal from "../DeleteModal";
import date from "date-and-time";

const OrganizationsTableTemp = ({ data, name, actions }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [activateModalOpen, setActivateModal] = useState(false);
  const [activateModalData, setActivateModalData] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState(null);

  const [disactivateModalOpen, setDisactivateModal] = useState(false);
  const [disactivateModalData, setDisactivateModalData] = useState(null);

  const [tableData, setTableData] = useState(() => data);
  const [validationErrors, setValidationErrors] = useState({});

  const [currentId, setCurrentId] = useState(null);

  const navigate = useNavigate();

  const changeCreateModalOpen = useCallback(
    (val) => {
      setCreateModalOpen(val);
    },
    [setCreateModalOpen]
  );

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
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

  // const handleDeleteRow = useCallback(
  //   (row) => {
  //     setActivateModal(true);
  //     setActivateModalData(row);
  //   },
  //   [tableData]
  // );

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "email"
              ? validateEmail(event.target.value)
              : cell.column.id === "age"
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
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
        header: "Tashkilot nomi",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "user.balance",
        header: "Balansi",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "is_active",
        header: "Statusi",
        enableEditing: false,
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        Cell: ({ cell }) => {
          return cell.getValue() ? (
            <span className='rounded-md p-2 bg-green-400 text-white text-[12px]'>
              Aktiv
            </span>
          ) : (
            <span className='rounded-md p-2 bg-red-400 text-white text-[12px]'>
              Aktiv emas
            </span>
          );
        },
      },
      {
        accessorKey: "phone",
        header: "Tashkilot tel. raqami",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "user.firstname",
        header: "Ismi",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "user.lastname",
        header: "Familiyasi",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "user?.phone",
        header: "User tel. raqami",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
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

      {
        enableEditing: false,
        accessorKey: "image",
        header: "Tashkilot logo",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps]
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
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderDetailPanel={({ row }) =>
          row.getValue("image") && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <img
                alt='avatar'
                src={row.getValue("image")}
                loading='lazy'
                className='w-[210px] h-[210px] object-cover'
              />
            </Box>
          )
        }
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            {/* {name != "Shahar yoki tuman" && (
              <Tooltip arrow placement='left' title="Ko'rish">
                <IconButton onClick={() => navigate(row.getValue("name"))}>
                  <RemoveRedEye />
                </IconButton>
              </Tooltip>
            )} */}
            {row.getValue("is_active") ? (
              <Tooltip arrow placement='left' title='Faolsizlantirish'>
                <IconButton
                  onClick={() => {
                    setDisactivateModal(true);
                    setDisactivateModalData(row);
                  }}
                >
                  <PowerIcon className='w-[25px] stroke-[2px] text-orange-400' />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip arrow placement='left' title='Faollashtirish'>
                <IconButton
                  onClick={() => {
                    setActivateModal(true);
                    setActivateModalData(row);
                  }}
                >
                  <PowerIcon className='w-[25px] stroke-[2px] text-green-400' />
                </IconButton>
              </Tooltip>
            )}
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
        //     onClick={() => changeCreateModalOpen(true)}
        //     // variant="contained"
        //   >
        //     {`Yangi ${name.toLowerCase()} qo'shish`}
        //   </Button>
        // )}
      />

      <InfoModal
        context={{ title: "Faollashtirish", btnText: "Aktivlashtirish" }}
        openState={{ open: activateModalOpen, setOpen: setActivateModal }}
        content={activateModalData?.getValue("name")}
        idKey={activateModalData?.getValue("_id")}
        submitHandler={(body) => actions.activateOrg(body)}
      />

      <InfoModal
        context={{ title: "Faolsizlantirish", btnText: "Faolsizlantirish" }}
        openState={{ open: disactivateModalOpen, setOpen: setDisactivateModal }}
        content={disactivateModalData?.getValue("name")}
        idKey={disactivateModalData?.getValue("_id")}
        submitHandler={(body) => actions.disactivateOrg(body)}
      />

      <InfoModal
        openState={{ open: deleteModalOpen, setOpen: setDeleteModalOpen }}
        content={` ${deleteModalData?.getValue("name")}`}
        context={{ title: "O'chirish", btnText: "O'chirish" }}
        idKey={deleteModalData?.getValue("_id")}
        submitHandler={(body) => actions.deleteOrg(body)}
      />
    </>
  );
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const validateAge = (age) => age >= 18 && age <= 50;

export default OrganizationsTableTemp;

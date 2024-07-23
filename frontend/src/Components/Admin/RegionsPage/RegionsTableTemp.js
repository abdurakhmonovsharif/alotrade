import React, { useState, useCallback, useMemo } from "react";
import PageTitle from "../../../Components/Admin/PageTitle";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, RemoveRedEye, ViewAgenda } from "@mui/icons-material";
import CreateEditModal from "../CreateEditModal";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import InfoModal from "../DeleteModal";

const RegionsTableTemp = ({ data, name, actions }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState(null);

  const [tableData, setTableData] = useState(() => data);
  const [validationErrors, setValidationErrors] = useState({});

  const [actionType, setActionType] = useState("ADD");
  const [currentId, setCurrentId] = useState(null);

  const navigate = useNavigate();

  const [initialState, setInitialState] = useState({
    name: "",
  });

  const changeCreateModalOpen = useCallback(
    (val) => {
      setCreateModalOpen(val);
    },
    [setCreateModalOpen]
  );

  const regionSchema = yup.object().shape({
    name: yup.string().required("Nomi bo'sh bo'lmasligi kerak!"),
  });

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
        header: "Nomi",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },

      // {
      //   accessorKey: "isArchived",
      //   header: "Statusi",
      //   enableEditing: false,
      //   size: 140,
      //   muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //     ...getCommonEditTextFieldProps(cell),
      //   }),
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
            {name != "Shahar yoki tuman" && (
              <Tooltip arrow placement='left' title="Ko'rish">
                <IconButton onClick={() => navigate(row.getValue("_id"))}>
                  <RemoveRedEye />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip arrow placement='left' title='Edit'>
              <IconButton
                onClick={() => {
                  setCurrentId(row.getValue("_id"));
                  setActionType("EDIT");
                  changeCreateModalOpen(true);
                  setInitialState({
                    name: row.getValue("name"),
                  });
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement='right' title='Delete'>
              <IconButton color='error' onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            variant='contained'
            color='alotrade'
            onClick={() => changeCreateModalOpen(true)}
            // variant="contained"
          >
            {`Yangi ${name.toLowerCase()} qo'shish`}
          </Button>
        )}
      />
      <CreateEditModal
        currentId={currentId}
        submitHandler={
          actionType == "ADD" ? actions.createRegion : actions.updateRegion
        }
        validationSchema={regionSchema}
        initialValues={initialState}
        fields={[{ name: "name", type: "text", label: "Nomi" }]}
        actionName={actionType === "ADD" ? "Qo'shish" : "Tashrirlash"}
        title={`${name} ${actionType === "ADD" ? "qo'shish" : "tahrirlash"}`}
        openState={{ open: createModalOpen, setOpen: changeCreateModalOpen }}
      />
      <InfoModal
        openState={{ open: deleteModalOpen, setOpen: setDeleteModalOpen }}
        content={deleteModalData?.getValue("name")}
        idKey={deleteModalData?.getValue("_id")}
        submitHandler={(body) => actions.deleteRegion(body)}
        context={{ title: "O'chirish", btnText: "O'chirish" }}
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

export default RegionsTableTemp;

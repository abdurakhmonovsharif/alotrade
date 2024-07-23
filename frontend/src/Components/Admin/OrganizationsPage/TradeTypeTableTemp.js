import React, { useState, useCallback, useMemo, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, RemoveRedEye, ViewAgenda } from "@mui/icons-material";

import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import date from "date-and-time";
import CreateEditModal from "../CreateEditModal";
import InfoModal from "../DeleteModal";

const TradeTypeTableTemp = ({ data, name, actions }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState(null);

  const [tableData, setTableData] = useState(() => data);
  const [validationErrors, setValidationErrors] = useState({});

  const [actionType, setActionType] = useState("ADD");
  const [currentId, setCurrentId] = useState(null);

  const [initialState, setInitialState] = useState({
    name: "",
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
        header: "Nomi",
        size: 140,
      },

      {
        accessorKey: "isArchived",
        header: "Statusi",
        enableEditing: false,
        size: 140,

        Cell: ({ cell }) =>
          cell.getValue() && (
            <span className='rounded-md p-2 bg-red-400 text-white text-[12px]'>
              Arxivlangan
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
        enableEditing
        enableRowSelection
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
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
            onClick={() => {
              setActionType("ADD");
              setCurrentId(null);

              setInitialState({
                name: "",
              });
              changeCreateModalOpen(true);
            }}
            // variant="contained"
          >
            {"Yangi savdo turi qo'shish"}
          </Button>
        )}
      />
      <CreateEditModal
        currentId={currentId}
        submitHandler={
          actionType == "ADD"
            ? actions.createTradeType
            : actions.updateTradeType
        }
        validationSchema={adSchema}
        initialValues={initialState}
        fields={[{ name: "name", type: "text", label: "Nomi" }]}
        actionName={actionType === "ADD" ? "Qo'shish" : "Tashrirlash"}
        title={`${name} ${actionType === "ADD" ? "qo'shish" : "tahrirlash"}`}
        openState={{ open: createModalOpen, setOpen: changeCreateModalOpen }}
      />
      <InfoModal
        openState={{ open: deleteModalOpen, setOpen: setDeleteModalOpen }}
        content={` ${deleteModalData?.getValue("name")}`}
        idKey={deleteModalData?.getValue("_id")}
        submitHandler={(body) => actions.deleteTradeType(body)}
        context={{ title: "O'chirish", btnText: "O'chirish" }}
      />
    </>
  );
};

export default TradeTypeTableTemp;

import React, {useState, useCallback, useMemo, useEffect} from "react";
import {MaterialReactTable} from "material-react-table";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogContentText,
    DialogActions,
    ListItemIcon,
    MenuItem,
    TextField
} from "@mui/material";
import {
    CheckBox,
    CheckBoxOutlineBlankRounded,
    CheckBoxRounded,
    CheckCircleOutlineRounded,
    Delete, Download,
    Edit,
    RemoveRedEye,
    SendRounded,
    ViewAgenda,
} from "@mui/icons-material";

import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import DeleteModal from "../DeleteModal";
import date from "date-and-time";
import CreateEditModal from "../CreateEditModal";
import InfoModal from "../DeleteModal";
import {Tooltip} from "@nextui-org/react";
import {editProfileImage} from "../../../Pages/Sign/signSlice";
import {useDispatch} from "react-redux";

const AnnsTableTemp = ({data, name, actions}) => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [mediaDialogVisible, setMediaDialogVisible] = useState(false);
    const [mediaDialogData, setMediaDialogData] = useState({images: [], _id: null})
    const [mediaLoading, setMediaLoading] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteModalData, setDeleteModalData] = useState(null);

    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [confirmModalData, setconfirmModalData] = useState(null);

    const [publishModalOpen, setPublishModalOpen] = useState(false);
    const [publishModalData, setPublishModalData] = useState(null);

    const [tableData, setTableData] = useState(() => data);
    const [validationErrors, setValidationErrors] = useState({});

    const [actionType, setActionType] = useState("ADD");
    const [currentId, setCurrentId] = useState(null);

    const [initialState, setInitialState] = useState({
        name: "",
        price: "",
    });


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

    const handleSaveRowEdits = async ({exitEditingMode, row, values}) => {
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
    const handleCloseMediaDialog = () => setMediaDialogVisible(false)
    const handleOpenMediaDialog = (e, cell) => {
        e.preventDefault();
        const images = cell.getValue();
        const column_id = cell.row.getValue("_id");
        setMediaDialogVisible(true)
        setMediaDialogData({images, _id: column_id})
    }
    const handleDownloadMedia = async (row) => {
        const images = row.getValue("images");
        await fetchAndDownloadMedia(images)
    }
    const handleSaveMedias = async (event) => {
        setMediaLoading(true)
        await actions.updateMedias({mediaArray: mediaDialogData.images, _id: mediaDialogData._id});
        setMediaLoading(false)
        handleCloseMediaDialog();
    };
    const dispatch = useDispatch()
    const handleUploadFile = async (e, inputIndex) => {
        e.preventDefault();
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        dispatch(editProfileImage(formData)).then(({error, payload}) => {
            if (!error) {
                const updatedMedias = mediaDialogData.images.map((item, index) => {
                    if (index === inputIndex) {
                        return payload
                    }
                    return item
                })
                setMediaDialogData({...mediaDialogData, images: updatedMedias})
            }
        });
    };
    const fetchAndDownloadMedia = async (medias) => {
        try {
            for (const mediaUrl of medias) {
                const response = await fetch(mediaUrl);
                if (!response.ok) {
                    throw new Error(`Failed to download ${mediaUrl}`);
                }
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = 'downloaded-media';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(blobUrl);
            }
        } catch (error) {
            console.error('Error downloading media:', error);
            // Handle error appropriately (e.g., show error message)
        }
    }
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
                Cell: ({cell}) => (
                    <span className='text-ellipsis overflow-hidden line-clamp-2'>
            {cell.getValue()}
          </span>
                ),
            },
            {
                accessorKey: "description",
                header: "Tavsiloti",
                size: 140,
                Cell: ({cell}) => (
                    <Tooltip placement='left' content={<span>{cell.getValue()}</span>}>
            <span className='text-ellipsis overflow-hidden line-clamp-2'>
              {cell.getValue()}
            </span>
                    </Tooltip>
                ),
            },
            {
                accessorKey: "is_confirmed",
                header: "Confirm status",
                size: 140,
                Cell: ({cell}) =>
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
                header: "Publish Status",
                size: 140,
                Cell: ({cell, row}) =>
                    row.getValue("target.adView") == "orgs" &&
                    (cell.getValue() ? (
                        <span className='w-fit h-fit rounded-md p-2 bg-green-400 text-white text-[12px]'>
              Published
            </span>
                    ) : (
                        <span className='w-fit h-fit rounded-md p-2 bg-red-400 text-white text-[12px]'>
              Not published
            </span>
                    )),
            },
            {
                accessorKey: "isArchive",
                header: "Arxiv",
                enableEditing: false,
                size: 140,

                Cell: ({cell}) =>
                    cell.getValue() && (
                        <span className='rounded-md p-2 bg-red-400 text-white text-[12px]'>
              Arxivlangan
            </span>
                    ),
            },
            {
                accessorKey: "totalSum",
                header: "Umumiy hisob",
                size: 140,
            },
            //   {
            //     accessorKey: "currency",
            //     header: "Currency",
            //     size: 140,
            //   },

            {
                accessorKey: "categories",
                header: "Kayegoriya",
                size: 140,
                Cell: ({cell}) =>
                    cell.getValue()?.map((el) => <span>{`${el.name}, `}</span>),
            },

            {
                accessorKey: "adType",
                header: "Reklama",
                size: 140,
                Cell: ({cell}) =>
                    cell.getValue()?.map((el) => <span>{`${el.name}, `}</span>),
            },

            {
                accessorKey: "region",
                header: "Viloyat",
                size: 140,
                Cell: ({cell}) => <span>{cell.getValue().name}</span>,
            },

            // {
            //   accessorKey: "subcategories",
            //   header: "Sub kategoriya",
            //   size: 140,
            //   Cell: ({ cell }) =>
            //     cell.getValue()?.map((el) => <span>{el.name}</span>),
            // },

            {
                accessorKey: "user",
                header: "Foydalanuvchi",
                size: 140,
                // AggregatedCell: () => ({}),
                Cell: ({cell}) => (
                    <div className='flex flex-row'>
            <span className=''>{`${cell.getValue().lastname} ${
                cell.getValue().firstname
            }`}</span>
                    </div>
                ),
            },

            //   {
            //     accessorKey: "organization",
            //     header: "Tashkilot",
            //     size: 140,
            //     Cell: ({ cell }) => (
            //       <div className='flex flex-row'>
            //         <span className=''>{`${cell.getValue().name}`}</span>
            //       </div>
            //     ),
            //   },

            {
                accessorKey: "createdAt",
                header: "Qo'shilgan sanasi",
                enableEditing: false,
                size: 140,
                Cell: ({cell}) => {
                    const sana = new Date(cell.getValue());
                    return <span>{date.format(sana, "HH:mm - ddd, MMM DD YYYY")}</span>;
                },
            },

            {
                accessorKey: "images",
                header: "Rasmlar",
                size: 140,
                Cell: ({cell}) => (
                    <span onContextMenu={(e) => handleOpenMediaDialog(e, cell)}
                          className='text-ellipsis overflow-hidden line-clamp-1 w-[100px]'>
            {cell.getValue()}
          </span>
                ),
            },

            {
                accessorKey: "target.adView",
                header: "Target",
                size: 140,
                Cell: ({cell}) => (
                    <span className='text-ellipsis overflow-hidden line-clamp-1 w-[100px]'>
            {cell.getValue()}
          </span>
                ),
            },

            //   {
            //     accessorKey: "state",
            //     header: "State",
            //     muiTableBodyCellEditTextFieldProps: {
            //       select: true, //change to select for a dropdown
            //       children: states.map((state) => (
            //         <MenuItem key={state} value={state}>
            //           {state}
            //         </MenuItem>
            //       )),
            //     },
            //   },
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
                onEditingRowSave={handleSaveRowEdits}
                onEditingRowCancel={handleCancelRowEdits}
                renderDetailPanel={({row}) => {
                    return (
                        <div className='flex flex-row gap-8'>
                            {row.getValue("images")?.map((el) => (
                                <img
                                    alt='img'
                                    src={el}
                                    loading='lazy'
                                    className='w-[210px] h-[210px] object-cover'
                                />
                            ))}
                        </div>
                    );
                }}
                enableRowActions
                renderRowActionMenuItems={({row, closeMenu}) => [
                    !row.getValue("is_confirmed") && (
                        <MenuItem
                            key={0}
                            onClick={() => {
                                setConfirmModalOpen(true);
                                setconfirmModalData(row);
                            }}
                            sx={{m: 0}}
                        >
                            <ListItemIcon>
                                <CheckCircleOutlineRounded/>
                            </ListItemIcon>
                            Tasdiqlash
                        </MenuItem>

                    ),
                    !row.getValue("is_published") &&
                    row.getValue("target.adView") == "orgs" && (
                        <MenuItem
                            key={0}
                            onClick={() => {
                                setPublishModalOpen(true);
                                setPublishModalData(row);
                            }}
                            sx={{m: 0}}
                        >
                            <ListItemIcon>
                                <SendRounded/>
                            </ListItemIcon>
                            Publish
                        </MenuItem>
                    ),
                    !row.getValue("isArchive") && (
                        <MenuItem
                            key={1}
                            onClick={() => handleDeleteRow(row)}
                            sx={{m: 0}}
                        >
                            <ListItemIcon color='error'>
                                <Delete color='error'/>
                            </ListItemIcon>
                            {"O'chirish"}
                        </MenuItem>
                    ),
                    !row.getValue("isArchive") && (
                        <MenuItem
                            key={1}
                            onClick={() => handleDownloadMedia(row)}
                            sx={{m: 0}}
                        >
                            <ListItemIcon color='success'>
                                <Download color="success"/>
                            </ListItemIcon>
                            {"Mediani yuklab olish"}
                        </MenuItem>
                    ),
                ]}
                // renderRowActions={({ row, table }) => (
                //   <Box sx={{ display: "flex", gap: "1rem" }}>
                //     {/* <Tooltip arrow placement='left' title='Edit'>
                //       <IconButton
                //         onClick={() => {
                //           setCurrentId(row.getValue("_id"));
                //           setActionType("EDIT");
                //           changeCreateModalOpen(true);
                //           setInitialState({
                //             name: row.getValue("name"),
                //             price: row.getValue("price"),
                //           });
                //         }}
                //       >
                //         <Edit />
                //       </IconButton>
                //     </Tooltip> */}
                //     <Tooltip arrow placement='right' title='Delete'>
                //       <IconButton color='error' onClick={() => handleDeleteRow(row)}>
                //         <Delete />
                //       </IconButton>
                //     </Tooltip>
                //   </Box>
                // )}
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
            <Dialog
                open={mediaDialogVisible}
                onClose={handleCloseMediaDialog}
                maxWidth={"sm"}
                fullWidth={true}
                // PaperProps={{
                //     component: 'form',
                //     onSubmit: handleSaveMedias
                // }}

            >
                <DialogTitle>Rasmlar</DialogTitle>
                <DialogContent>
                    {
                        mediaDialogData?.images?.map((media, index) => <div
                             className={"mt-2 flex items-center gap-x-2"}
                            key={index}>
                            <h5 className={"font-normal"}>{index+1}.{" "}</h5>
                            <input
                            type="file"
                            onChange={(e) => handleUploadFile(e, index)}
                        /></div>)
                    }
                </DialogContent>
                <DialogActions>
                    <Button color={"error"} onClick={handleCloseMediaDialog}>Bekor qilish</Button>
                    <Button loading={mediaLoading} onClick={handleSaveMedias} type="button">Saqlash</Button>
                </DialogActions>
            </Dialog>
            <InfoModal
                context={{title: "Tasdiqlash", btnText: "Tasdiqlash"}}
                openState={{open: confirmModalOpen, setOpen: setConfirmModalOpen}}
                content={confirmModalData?.getValue("name")}
                idKey={confirmModalData?.getValue("_id")}
                submitHandler={(body) => actions.confirmAnn(body)}
            />
            <InfoModal
                context={{title: "Publish", btnText: "Publish"}}
                openState={{open: publishModalOpen, setOpen: setPublishModalOpen}}
                content={publishModalData?.getValue("name")}
                idKey={publishModalData?.getValue("_id")}
                submitHandler={(body) => actions.publishAnn(body)}
            />
            <InfoModal
                openState={{open: deleteModalOpen, setOpen: setDeleteModalOpen}}
                content={` ${deleteModalData?.getValue("name")}`}
                context={{title: "O'chirish", btnText: "O'chirish"}}
                idKey={deleteModalData?.getValue("_id")}
                submitHandler={(body) => actions.deleteAnn(body)}
            />
        </>
    );
};

export default AnnsTableTemp;

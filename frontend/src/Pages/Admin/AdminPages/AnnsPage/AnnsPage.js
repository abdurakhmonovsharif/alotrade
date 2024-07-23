import React, {useEffect, useState} from "react";
import PageTitle from "../../../../Components/Admin/PageTitle";
import {Box, Button, Tab, Tabs, Typography} from "@mui/material";
import AdsTableTemp from "../../../../Components/Admin/AnnsPage/AdsTableTemp";
import {useDispatch, useSelector} from "react-redux";
import {createAd, deleteAd, getAllAds, updateAd} from "./adSlice";
import {confirmAnn, deleteAnn, getAllAnns, publishAnn, updateMediasAnn} from "./annSlice";
import AnnsTableTemp from "../../../../Components/Admin/AnnsPage/AnnsTableTemp";
import {Input} from "@nextui-org/react";
import Api from "../../../../Config/Api";
import {editProfileImage} from "../../../Sign/signSlice";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{paddingTop: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const AnnsPage = () => {
    const dispatch = useDispatch();
    const {ads} = useSelector((state) => state.ads);
    const {anns} = useSelector((state) => state.adminAnns);

    const [pricePerSend, setPricePerSend] = useState();
    const [inputPrice, setInputPrice] = useState();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fetchPricePerSend = async () => {
        const res = await Api.get("/extra/cost");
        setPricePerSend(res.data[0]);
        setInputPrice(res.data[0]?.sum);
    };

    const savePricePerSend = async () => {
        if (pricePerSend) {
            const res = await Api.patch(`/extra/cost/${pricePerSend._id}`, {
                sum: inputPrice,
            });
            fetchPricePerSend();
        } else {
            const res = await Api.post("/extra/cost", {sum: inputPrice});
            fetchPricePerSend();
        }
    };

    useEffect(() => {
        fetchPricePerSend();
        dispatch(getAllAds());
        dispatch(getAllAnns());
    }, []);
    const updateMedias = async (body) => {
        await dispatch(updateMediasAnn(body));
        // Fetch all announcements again after updating media for ads
        dispatch(getAllAds());
        dispatch(getAllAnns());

    };
    return (
        <div className='flex flex-col w-full'>
            <PageTitle>{"E'lonlar"}</PageTitle>
            <div className='flex flex-row items-center justify-end gap-3 px-5 w-full'>
                <span className='text-[14px] '>Saytga reklama yuborish narxi</span>
                <Input
                    value={inputPrice}
                    onChange={(e) => setInputPrice(e.target.value)}
                />
                <Button onClick={savePricePerSend} color='primary' variant='contained'>
                    Saqlash
                </Button>
            </div>
            <Box sx={{width: "100%"}}>
                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label='basic tabs example'
                    >
                        <Tab label="Tasdiqlanmagan e'lonlar" {...a11yProps(0)} />
                        <Tab label="Tasdiqlangan e'lonlar" {...a11yProps(1)} />

                        <Tab label='Reklamalar' {...a11yProps(2)} />
                        {/* <Tab label='Item Three' {...a11yProps(2)} /> */}
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    {anns && (
                        <AnnsTableTemp
                            name="E'lon"
                            data={anns.filter((el) => !el.is_confirmed)}
                            actions={{
                                deleteAnn: (body) => dispatch(deleteAnn(body)),
                                confirmAnn: (body) => dispatch(confirmAnn(body)),
                                publishAnn: (body) => dispatch(publishAnn(body)),
                                updateMedias: (body) => updateMedias(body)
                            }}
                        />
                    )}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {anns && (
                        <AnnsTableTemp
                            name="E'lon"
                            data={anns.filter((el) => el.is_confirmed)}
                            actions={{
                                deleteAnn: (body) => dispatch(deleteAnn(body)),
                                confirmAnn: (body) => dispatch(confirmAnn(body)),
                                publishAnn: (body) => dispatch(publishAnn(body)),
                                updateMedias: (body) => updateMedias(body)


                            }}
                        />
                    )}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {ads && (
                        <AdsTableTemp
                            name='Reklama'
                            data={ads}
                            actions={{
                                createAd: (body) => dispatch(createAd(body)),
                                updateAd: (body) => dispatch(updateAd(body)),
                                deleteAd: (body) => dispatch(deleteAd(body)),
                                updateMedias: (body) => updateMedias(body)

                            }}
                        />
                    )}
                </TabPanel>
                {/* <TabPanel value={value} index={2}>
          Item Three
        </TabPanel> */}
            </Box>
        </div>
    );
};

export default AnnsPage;

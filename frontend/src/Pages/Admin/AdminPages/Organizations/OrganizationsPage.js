import React from "react";
import PageTitle from "../../../../Components/Admin/PageTitle";
import OrganizationsTableTemp from "../../../../Components/Admin/OrganizationsPage/OrganizationsTableTemp";
import { Box, Tab, Tabs } from "@mui/material";
import { TabPanel } from "../AnnsPage/AnnsPage";
import TradeTypeTableTemp from "../../../../Components/Admin/OrganizationsPage/TradeTypeTableTemp";
import { useDispatch, useSelector } from "react-redux";
import {
  createTradeType,
  deleteTradeType,
  getAllTradeTypes,
  updateTradeType,
} from "./tradeTypeSlice";
import { useEffect } from "react";
import {
  activateOrganization,
  deleteOrg,
  disactivateOrganization,
  getAllAdminOrganizations,
} from "./organizationSlice";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const OrganizationsPage = () => {
  const dispatch = useDispatch();
  const { tradeTypes } = useSelector((state) => state.tradeTypes);
  const { organizations } = useSelector((state) => state.adminOrganizations);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getAllTradeTypes());
    dispatch(getAllAdminOrganizations());
  }, []);

  return (
    <div className='flex flex-col w-full'>
      <PageTitle>Tashkilotlar</PageTitle>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label='Tashkilotlar' {...a11yProps(0)} />
            <Tab label='Savdo turlari' {...a11yProps(1)} />
            {/* <Tab label='Item Three' {...a11yProps(2)} /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {organizations && (
            <OrganizationsTableTemp
              data={organizations}
              name='Tashkilot'
              actions={{
                activateOrg: (body) =>
                  dispatch(activateOrganization({ ...body, activate: true })),
                disactivateOrg: (body) =>
                  dispatch(
                    disactivateOrganization({ ...body, activate: false })
                  ),
                deleteOrg: (body) => dispatch(deleteOrg(body)),
              }}
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {tradeTypes && (
            <TradeTypeTableTemp
              name='Savdo turi'
              data={tradeTypes}
              actions={{
                createTradeType: (body) => dispatch(createTradeType(body)),
                updateTradeType: (body) => dispatch(updateTradeType(body)),
                deleteTradeType: (body) => dispatch(deleteTradeType(body)),
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

export default OrganizationsPage;

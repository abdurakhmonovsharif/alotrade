import React, { useEffect } from "react";
import PageTitle from "../../../../Components/Admin/PageTitle";
import OrdersTableTemp from "../../../../Components/Admin/OrdersPage/OrdersTableTemp";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  getAllAdminOrders,
  publishOrder,
} from "./orderSlice";
import { Input } from "@nextui-org/react";
import { Box, Button, Tab, Tabs } from "@mui/material";
import Api from "../../../../Config/Api";
import { useState } from "react";
import { TabPanel } from "../AnnsPage/AnnsPage";
import { a11yProps } from "../AdminMain";

const OrdersPage = () => {
  const [pricePerSend, setPricePerSend] = useState();
  const [inputPrice, setInputPrice] = useState();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.adminOrders);
  useEffect(() => {
    fetchPricePerSend();
    dispatch(
      getAllAdminOrders({
        page: 0,
        // product: "all",
        categories: [],
        subcategories: [],
        subcategories2: [],
        tradetypes: [],
        regions: [],
        districts: [],
        // user: "64875c6305515f992e2359c7",
        name: "",
      })
    );
  }, []);

  const fetchPricePerSend = async () => {
    const res = await Api.get("/extra/cost");
    setPricePerSend(res.data[0]);
    setInputPrice(res.data[0]?.ordersum);
  };

  const savePricePerSend = async () => {
    if (pricePerSend) {
      const res = await Api.patch(`/extra/cost/${pricePerSend._id}`, {
        ordersum: inputPrice,
      });
      fetchPricePerSend();
    } else {
      const res = await Api.post("/extra/cost", { ordersum: inputPrice });
      fetchPricePerSend();
    }
  };

  return (
    <div className='flex flex-col w-full'>
      <PageTitle>Buyurtmalar</PageTitle>
      <div className='flex flex-row items-center justify-end gap-3 px-5 w-full mb-5'>
        <span className='text-[14px] '>Buyurtmani ko'rish narxi</span>
        <Input
          value={inputPrice}
          onChange={(e) => setInputPrice(e.target.value)}
        />
        <Button onClick={savePricePerSend} color='primary' variant='contained'>
          Saqlash
        </Button>
      </div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label='Tasdiqlanmagan buyurtmalar' {...a11yProps(0)} />
            <Tab label='Tasdiqlangan buyurtmalar' {...a11yProps(1)} />

            {/* <Tab label='Reklamalar' {...a11yProps(1)} /> */}
            {/* <Tab label='Item Three' {...a11yProps(2)} /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {orders && (
            <OrdersTableTemp
              data={orders.filter((el) => !el.is_confirmed)}
              actions={{
                deleteOrder: (body) => dispatch(deleteOrder(body)),
                confirmOrder: (body) => dispatch(confirmOrder(body)),
                publishOrder: (body) => dispatch(publishOrder(body)),
              }}
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={1} sx={{ padding: 0 }}>
          {orders && (
            <OrdersTableTemp
              data={orders.filter((el) => el.is_confirmed)}
              actions={{
                deleteOrder: (body) => dispatch(deleteOrder(body)),
                confirmOrder: (body) => dispatch(confirmOrder(body)),
                publishOrder: (body) => dispatch(publishOrder(body)),
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

export default OrdersPage;

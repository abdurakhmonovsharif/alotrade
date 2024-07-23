import React, { useEffect } from "react";
import PageTitle from "../../../../Components/Admin/PageTitle";
import ProductsTableTemp from "../../../../Components/Admin/ProductsPage/ProductsTableTemp";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllAdminProducts } from "./productSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.adminProducts);
  useEffect(() => {
    dispatch(
      getAllAdminProducts({
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
  return (
    <div className='flex flex-col w-full'>
      <PageTitle>Tovarlar</PageTitle>
      {products && (
        <ProductsTableTemp
          data={products}
          actions={{ deleteProduct: (body) => dispatch(deleteProduct(body)) }}
        />
      )}
    </div>
  );
};

export default ProductsPage;

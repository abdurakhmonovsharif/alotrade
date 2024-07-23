import React, {useEffect, useState} from "react";
import CardLogo from "../../../Components/OrganizationCard/CardLogo";
import CardInfo from "../../../Components/OrganizationCard/CardInfo";
import {useDispatch, useSelector} from "react-redux";
import {getOrganizations, getOrganizationsCount} from "./organizationSlice";
import {map, uniqueId} from "lodash";
import Pagination from "../../../Components/Pagination/Pagination";
import {useTranslation} from "react-i18next";
import {getTranslations} from "../../../translation";
import Filter from "../../Filter/Filter";
import PageHeader from "../../../Components/PageHeaders/PageHeader";
import {Link, useNavigate} from "react-router-dom";
import {Loading} from "@nextui-org/react";
import Categories from "../Categories/Categories";
import Countries from "../Countyries/Countries";

const Organizations = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation(["common"]);
    const translations = getTranslations(t);
    const navigate = useNavigate();
    const {
        logged,
        userData: {organization},
    } = useSelector((state) => state.login);
    const {organizations, loading} = useSelector(
        (state) => state.organizations
    );
    const isOrganization = !!organization?._id;
    const {
        order,
        categories,
        subcategories,
        tradetypes,
        regions,
        districts,
        name,
    } = useSelector((state) => state.filter);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalDatas, setTotalDatas] = useState(0);
    const countPage = 10;

    const [modalBody, setModalBody] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [filterVisible, setFilterVisible] = useState(false);
    const [filterBody, setFilterBody] = useState('category');

    const openModal = (body) => {
        setModalBody(body);
        setModalVisible(true);
    };

    useEffect(() => {
        const data = {
            page: 0,
            count: countPage,
            categories,
            subcategories,
            tradetypes,
            regions,
            districts,
            name: "",
        };
        setCurrentPage(0);
        dispatch(getOrganizations(data));
        dispatch(getOrganizationsCount(data)).then(
            ({payload: {totalCount}, error}) => {
                if (!error) {
                    setTotalDatas(totalCount);
                }
            }
        );
    }, [
        dispatch,
        order,
        categories,
        subcategories,
        tradetypes,
        regions,
        districts,
        name,
    ]);

    useEffect(() => {
        const data = {
            page: currentPage,
            count: countPage,
            categories,
            subcategories,
            tradetypes,
            regions,
            districts,
            name: "",
        };
        dispatch(getOrganizations(data));
        dispatch(getOrganizationsCount(data)).then(
            ({payload: {totalCount}, error}) => {
                if (!error) {
                    setTotalDatas(totalCount);
                }
            }
        );
        //    eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, order, currentPage, countPage]);

    return (
        <div className='w-full bg-white pb-[100px]'>
            <div className='md:container'>
                <div className='w-full block md:flex'>
                    <Filter
                        filterBody={filterBody}
                        filterVisible={filterVisible}
                        setFilterVisible={setFilterVisible}
                    />
                    <div className='w-full md:px-4 flex flex-col gap-[20px]'>
                        <PageHeader
                            isOrganization={isOrganization}
                            totalDatas={totalDatas}
                            countPage={countPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            // filter={filter}
                            count={totalDatas}
                            onClick={() => navigate("/sign-up/business")}
                            // handleFilter={handleFilter}
                            // filterData={product}
                            setFilterBody={setFilterBody}
                            setFilterVisible={setFilterVisible}
                            countTitle='Jami:'
                            mainTitle={"Компании"}
                            filterBtnClick={() => setFilterVisible(!filterVisible)}
                        />

                        {loading ? (
                                <Loading/>
                            ) :
                            //  (
                            //   <div className='grid grid-cols-1 px-2 gap-4 md:grid-cols-3 md:gap-3 pt-4'>
                            //     {map(
                            //       organizations,
                            //       ({
                            //         _id,
                            //         image,
                            //         name,
                            //         tradetypes,
                            //         categories,
                            //         subcategories,
                            //         region,
                            //         district,
                            //         phone,
                            //         email,
                            //       }) => (
                            //         <div
                            //           key={uniqueId("organization")}
                            //           className='bg-white-900 overflow-hidden rounded shadow-lg border-t-8 border-[#01c2cc] flex flex-col justify-between'
                            //         >
                            //           <div className='border-neutral-400 mt-2 mx-4 flex gap-1'>
                            //             <h3 className='text-[12px] font-semibold font-amazonbold'>
                            //               {" "}
                            //               {translations.savdo_turi}:
                            //             </h3>
                            //             <h4 className='text-[12px]'>
                            //               {`${map(
                            //                 tradetypes,
                            //                 (tradetype) => tradetype.name
                            //               ).join(", ")}`}
                            //             </h4>
                            //           </div>
                            //           <CardLogo
                            //             logo={image}
                            //             name={name}
                            //             region={region}
                            //             district={district}
                            //           />
                            //           <CardInfo
                            //             translations={translations}
                            //             _id={_id}
                            //             isOrganization={!!organization}
                            //             logged={logged}
                            //             tradetypes={tradetypes}
                            //             categories={categories}
                            //             subcategories={subcategories}
                            //             district={district}
                            //             phone={phone}
                            //             email={email}
                            //             name={name}
                            //             region={region}
                            //           />
                            //         </div>
                            //       )
                            //     )}
                            //   </div>
                            // )

                            <div className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-2">
                                {filterBody === "category" ?
                                    <Categories/>
                                    : <Countries/>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        // <div className="h-full w-full  bg-neutral-100 flex flex-col justify-between">
        //   <div className="bg-white-900 py-3 shadow-md flex justify-between items-center px-4">
        //     <h3 className="font-amazonbold">
        //       {translations.tashkilotlar}:{" "}
        //       <span className="text-primary-900">{totalDatas} </span>
        //     </h3>
        //     {totalDatas > 0 && (
        //       <Pagination
        //         currentPage={currentPage}
        //         countPage={countPage}
        //         setCurrentPage={setCurrentPage}
        //         totalDatas={totalDatas}
        //       />
        //     )}
        //   </div>
        //   <div className="h-full overflow-scroll p-4">
        //     <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4">
        //       {map(
        //         organizations,
        //         ({
        //           _id,
        //           image,
        //           name,
        //           tradetypes,
        //           categories,
        //           subcategories,
        //           region,
        //           district,
        //           phone,
        //           email,
        //         }) => (
        //           <div
        //             key={uniqueId("organization")}
        //             className="bg-white-900 overflow-hidden rounded shadow-lg border-t-4 border-amber-500 flex flex-col justify-between"
        //           >
        //             <CardLogo
        //               logo={image}
        //               name={name}
        //               region={region}
        //               district={district}
        //             />
        //             <CardInfo
        //               translations={translations}
        //               _id={_id}
        //               isOrganization={!!organization}
        //               logged={logged}
        //               tradetypes={tradetypes}
        //               categories={categories}
        //               subcategories={subcategories}
        //               region={region}
        //               district={district}
        //               phone={phone}
        //               email={email}
        //             />
        //           </div>
        //         )
        //       )}
        //     </div>
        //   </div>
        // </div>
    );
};

export default Organizations;

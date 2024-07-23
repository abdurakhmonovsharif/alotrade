import { map, uniqueId } from "lodash";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import CardInfo from "../../../Components/OrganizationCard/CardInfo";
import CardLogo from "../../../Components/OrganizationCard/CardLogo";
import MainCardInfo from "../../../Components/OrganizationCard/MainCardInfo";
import { getTranslations } from "../../../translation";
import { getOrganizations } from "../Organizations/organizationSlice";

const OrganizationCarousel = () => {
  const { t } = useTranslation(["common"]);
  const translations = getTranslations(t);
  const dispatch = useDispatch();

  const {
    logged,
    userData: { organization },
  } = useSelector((state) => state.login);
  const { organizations } = useSelector((state) => state.organizations);

  useEffect(() => {
    const data = {
      page: 0,
      count: 10,
    };
    dispatch(getOrganizations(data));
    //    eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3.5,
      slidesToSlide: 3.5, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 540, min: 0 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
  };

  return (
    <div className="md:container px-2 pt-4 pb-[50px]">
      <h2 className="text-[16px] md:text-[36px] font-bold mb-4">
        С нами работают
      </h2>
      <Carousel
        responsive={responsive}
        sliderClass="flex items-stretch gap-1 md:gap-[10px]"
        autoPlay={true}
        autoPlaySpeed={3000}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        infinite={true}
        itemClass="max-w-[300px] mb-4"
      >
        {map(
          organizations,
          ({
            _id,
            image,
            name,
            tradetypes,
            categories,
            subcategories,
            region,
            district,
            phone,
            email,
          }) => (
            <div
              key={uniqueId("organization")}
              className="h-full bg-white-900 overflow-hidden rounded shadow-lg border-t-8 border-[#01c2cc] flex flex-col justify-between"
            >
              {/* <div className="border-neutral-400 mt-2 mx-4 flex gap-1">
                <h3 className="text-[12px] font-semibold font-amazonbold">
                  {" "}
                  {translations.savdo_turi}:
                </h3>
                <h4 className="text-[12px]">
                  {`${map(tradetypes, (tradetype) => tradetype.name).join(
                    ", "
                  )}`}
                </h4>
              </div> */}
              <CardLogo
                logo={image}
                name={name}
                region={region}
                district={district}
              />
              <MainCardInfo
                translations={translations}
                _id={_id}
                isOrganization={!!organization}
                logged={logged}
                tradetypes={tradetypes}
                categories={categories}
                subcategories={subcategories}
                district={district}
                phone={phone}
                email={email}
                name={name}
                region={region}
              />
            </div>
          )
        )}
      </Carousel>
    </div>
  );
};

export default OrganizationCarousel;

"use client";

import api from "@/utils/api";
import React, { useEffect, useState } from "react";
import CityCard from "./_components/CityCard";
import { ClipLoader } from "react-spinners";

interface CitiesListProps {
  gettingNewDataLoading: any;
}

const CitiesList: React.FC<CitiesListProps> = ({ gettingNewDataLoading }) => {
  const [citiesData, setCitiesData] = useState<any | null>(null);
  const [errorFetchingData, setErrorFetchingData] = useState<any | null>(null);
  const [cityProductsLoading, setCityProductsLoading] =
    useState<boolean>(false);

  // Getting the Cars Data
  const handleGettingCarData = async () => {
    try {
      setErrorFetchingData(null);
      setCityProductsLoading(true);
      const { data } = await api.get("/city/");
      if (data.status === "success") setCitiesData(data.payload.cities);
      setCityProductsLoading(false);
    } catch (error) {
      setErrorFetchingData("Server Error While Fetching Products");
      setCityProductsLoading(false);
    }
  };

  useEffect(() => {
    handleGettingCarData();
  }, [gettingNewDataLoading]);

  return (
    <>
      <h2 className="text-center my-5 text-[#c5c3c3] font-[600] text-lg">
        Latest Cities
      </h2>
      <div className="mt-10 shadow-2xl p-6">
        {citiesData
          ? citiesData.map((city: any) => (
              <CityCard key={city._id} city={city} />
            ))
          : errorFetchingData && <div>{errorFetchingData}</div>}
      </div>
    </>
  );
};

export default CitiesList;

import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import CarCard from "./_components/CarCard"; // Assuming CarCard is the name of your card component
import api from "@/utils/api";
import { ClipLoader } from "react-spinners";

interface City {
  name: string;
  _id: string;
  __v: any;
}

interface Car {
  _id: string;
  car_model: string;
  images_array: string[];
  price: number;
  city: City;
  no_of_copies: number;
  __v: any;
}

const CarProducts = ({
  gettingNewDataLoading,
}: {
  gettingNewDataLoading: any;
}) => {
  const [carProductsData, setCarPorductsData] = useState<any | null>(null);
  const [errorFetchingData, setErrorFetchingData] = useState<any | null>(null);
  const [carProductsLoading, setCarProductsLoading] = useState<boolean>(false);

  // Getting the Cars Data
  const handleGettingCarData = async () => {
    try {
      setErrorFetchingData(null);
      setCarProductsLoading(true);
      const { data } = await api.get("/car/");
      if (data.status == "success") setCarPorductsData(data.payload.carModels);
      setCarProductsLoading(false);
    } catch (error) {
      setErrorFetchingData("Server Error While Fetching Products");
      setCarProductsLoading(false);
    }
  };
  useEffect(() => {
    handleGettingCarData();
  }, [gettingNewDataLoading]);

  console.log(carProductsData);
  return (
    <>
      {carProductsLoading ? (
        <div className="w-[500px] h-[500px] flex justify-center items-center m-auto">
          <ClipLoader />
        </div>
      ) : (
        <>
        
        
          <Flex justify="center" align="center" wrap="wrap">
            {carProductsData
              ? carProductsData.map((car: Car) => (
                  <CarCard key={car._id} car={car} />
                ))
              : errorFetchingData && <div>{errorFetchingData}</div>}
          </Flex>
        </>
      )}
    </>
  );
};

export default CarProducts;

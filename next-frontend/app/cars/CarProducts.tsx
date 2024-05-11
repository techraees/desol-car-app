import React from "react";
import { Flex } from "@chakra-ui/react";
import CarCard from "./_components/CarCard"; // Assuming CarCard is the name of your card component

const CarProducts = () => {
  // Assuming carProductsData is defined here or imported from somewhere
  const carProductsData = [
    {
      id: 1,
      title: "Car 1",
      images: [
        "https://picsum.photos/150/150",
        "https://picsum.photos/150",
        "https://picsum.photos/150/150",
      ],
      price: 10000,
      city: "New York",
      copies: 5,
    },
    {
      id: 2,
      title: "Car 2",
      images: [
        "https://picsum.photos/150",
        "https://picsum.photos/150/150",
        "https://picsum.photos/150",
        "https://picsum.photos/150/150",
        "https://picsum.photos/150",
        "https://picsum.photos/150/150",
      ],
      price: 15000,
      city: "Los Angeles",
      copies: 3,
    },
    // Add more car products here if needed
  ];

  return (
    <Flex justify="center" align="center" wrap="wrap">
      {carProductsData.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </Flex>
  );
};

export default CarProducts;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";

// Import custom arrow icons
import { PrevArrow, NextArrow } from "@/utils/ArrowsIcon";

interface Car {
  id: number;
  title: string;
  images: string[];
  price: number;
  city: string;
  copies: number;
}

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <Card
      maxW="164.5px"
      maxH="264.5px"
      borderRadius="lg"
      overflow="hidden"
      className="shadow-2xl"
      m="2"
    >
      <Slider {...settings}>
        {car.images.map((image: string, index: number) => (
          <div key={index}>
            <Image src={image} alt={car.title} maxW="100%" maxH="30%" className="w-[100%]" />
          </div>
        ))}
      </Slider>

      <CardHeader style={{ padding: "10px 15px" }}>
        <Flex justify="space-between" align="center">
          <Text fontSize="sm">{car.title}</Text>
          <Text fontSize="xs" fontWeight="bold" color="green.500">
            ${car.price}
          </Text>
        </Flex>
      </CardHeader>

      <CardBody style={{ padding: "10px 15px", paddingTop: "0px" }}>
        <Flex justify="space-between">
          <Text fontSize="xs" color="gray.500">
            City: {car.city}
          </Text>
        </Flex>
        <Text mt="0" color="gray.400" className="text-[8px]">
          Number of Copies: <span className="text-[10px]">{car.copies}</span>
        </Text>
      </CardBody>
    </Card>
  );
};

export default CarCard;

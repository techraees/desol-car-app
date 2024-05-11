"use client";

import { Card, CardHeader, CardBody, CardFooter, Text } from "@chakra-ui/react";

import React from "react";

const CityCard = ({ city }: { city: any }) => {
  return (
      <Card className="my-4">
        <CardBody>
          <Text>{city.name}</Text>
        </CardBody>
      </Card>
  );
};

export default CityCard;

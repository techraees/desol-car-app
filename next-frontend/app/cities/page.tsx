"use client";
import { z } from "zod";

import React, { useState } from "react";
import { getCookie } from "@/utils/cookieFunction";
import api from "@/utils/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomFlexInput from "@/app/cars/_components/CustomFlexInput";
import CitiesList from "./CitiesList";
import { ClipLoader } from "react-spinners";
import { Button } from "@chakra-ui/react";

// Define schema for form data validation
const citySchema = z.object({
  name: z.string().min(5, "City Field is required"),
});

type CityFormData = z.infer<typeof citySchema>;

interface CityFormDataPayload {
  name: string;
}

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CityFormData>({
    resolver: zodResolver(citySchema),
  });
  const [createNewCityLoading, setCreateNewCityLoading] =
    useState<boolean>(false);
    
  const [gettingResponse, setGettingResponse] = useState<any | null>(false);

  const onSubmit = async (data: CityFormDataPayload) => {
    try {
      setCreateNewCityLoading(true);
      setGettingResponse(null);
      // Send form data to the server
      const token = getCookie("access_token");
    //   const headers = {
    //     Authorization: `Bearer ${token}`,
    //   };

      const res = await api.post(`/city/`, data);
      setCreateNewCityLoading(false);
      setGettingResponse(res.data.payload);
      reset();
    } catch (error) {
      setCreateNewCityLoading(false);
      console.error("Error submitting form:", error);
    }
  };

  // Check if errors object has any properties
  const hasErrors = (errorsObj: any) => {
    return Object.keys(errorsObj).length > 0;
  };
  return (
    <div className="container mx-auto my-10">
      <form onSubmit={handleSubmit(onSubmit)} className="p-5">
        <CustomFlexInput
          label="City Name"
          errors={errors.name && errors.name.message}
          placeholder="Enter City Name"
          name="name"
          register={register}
        />
        <Button
          type="submit"
          className={`w-[100%] py-1.5 rounded-md text-white my-4`}
          colorScheme="blackAlpha"
          isDisabled={hasErrors(errors) || createNewCityLoading ? true : false}
        >
          {createNewCityLoading ? (
            <div className="h-[100%] flex items-center justify-center">
              <ClipLoader size={20} color="#f00e0e0e0" />
            </div>
          ) : (
            "Add City"
          )}
        </Button>
      </form>

      <CitiesList gettingNewDataLoading={gettingResponse} />
    </div>
  );
};

export default page;

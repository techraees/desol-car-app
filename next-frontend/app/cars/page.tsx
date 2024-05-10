"use client";
import api from "@/utils/api";
import { getCookie, removeCookie } from "@/utils/cookieFunction";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Link } from "@chakra-ui/next-js";
import CustomFlexInput from "./_components/CustomFlexInput";
import CustomRadioGroup from "./_components/CustomRadioGroup";
import { ClipLoader } from "react-spinners";
import { Button } from "@chakra-ui/react";

import "./carservice.css";
import CustomSelectField from "./_components/CustomSelectWithLabel";
import MultipleImageUpload from "./_components/MultipleImageUpload ";
import CarProducts from "./CarProducts";
import currentUserDataHelper from "@/utils/currentUserDataHelper";
import LoadingSkeletalParent from "@/components/LoadingSkeletalParent";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Define schema for form data validation
const carSchema = z.object({
  car_model: z.string().min(5, "Car model is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^[0-9]+$/, "Price must be a valid amount"),
  phone: z.string().min(10, "Phone number must be at least 10 characters long"),
  city: z.string().min(1, "Please select at least one city"),
  no_of_copies: z.string().min(1, "Number of copies must be at least 1"),
});

type CarFormData = z.infer<typeof carSchema>;

interface CarFormDataPayload {
  car_model: string;
  price: string;
  phone: string;
  city: string;
  no_of_copies: string;
}

const Cars = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
  });
  const router = useRouter();
  const [cities, setCities] = useState<any | null>(null);
  const [carsPageLoading, setCarsPageLoading] = useState<boolean>(true);

  // Redirect to other Cars
  useEffect(() => {
    const access_token: string = getCookie("access_token");
    if (access_token) {
      currentUserDataHelper(access_token, router);
      setCarsPageLoading(false);
    } else {
      router.push("/auth/login");
    }
  }, []);

  const [selectedValue, setSelectedValue] = useState("");

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  const gettingCitiesData = async () => {
    try {
      const res = await api.get("/city/");
      setCities(res.data.payload.cities);
    } catch (error) {}
  };
  useEffect(() => {
    gettingCitiesData();
  }, []);

  const onSubmit = async (data: CarFormData) => {
    try {
      // Send form data to the server
      console.log(data);
      // await api.post('/car', data); // Example API call
      router.push("/success"); // Redirect to success page after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  console.log(errors);
  return (
    <>
      {carsPageLoading ? (
        <LoadingSkeletalParent />
      ) : (
        <div className="p-5 container m-auto">
          <h1 className="text-center my-3 text-[#c5c3c3] font-[600] text-lg">
            Create a New Car
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomFlexInput
              label="Car Model"
              errors={errors.car_model && errors.car_model.message}
              placeholder="Enter Car Name"
              name="car_model"
              register={register}
            />
            <CustomFlexInput
              errors={errors.price && errors.price.message}
              label="Price"
              placeholder="Enter Price"
              name="price"
              register={register}
            />
            <CustomFlexInput
              errors={errors.phone && errors.phone.message}
              label="Phone"
              placeholder="Enter your phone number"
              name="phone"
              register={register}
            />
            <CustomRadioGroup
              label="City"
              options={cities}
              selectedValue={selectedValue}
              onChange={handleRadioChange}
              name="city"
              register={register}
              errors={errors.city && errors.city.message}
            />
            <CustomSelectField
              label="No. of copies"
              selectedValue={selectedValue}
              onChange={handleSelectChange}
              name="no_of_copies"
              register={register}
              errors={errors.no_of_copies && errors.no_of_copies.message}
            />
            <MultipleImageUpload />
            <Button
              type="submit"
              className={`w-[100%] py-1.5 rounded-md text-white my-4`}
              colorScheme="blackAlpha"
            >
              {false ? (
                <div className="h-[100%] flex items-center justify-center">
                  <ClipLoader size={20} color="#f00e0e0e0" />
                </div>
              ) : (
                "Add Car"
              )}
            </Button>
          </form>

          <CarProducts />
        </div>
      )}
    </>
  );
};

export default Cars;

"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";
import api from "@/utils/api";
import { getCookie, removeCookie, setCookie } from "@/utils/cookieFunction";
import { useRouter } from "next/navigation";
import LoadingSkeletalParent from "@/components/LoadingSkeletalParent";
import { toast } from "react-toastify";
import Link from "next/link";
import {currentUserDataHelper} from "@/utils/currentUserDataHelper";

// Define your form schema using Zod
const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterWithCredentials {
  email: string;
  password: string;
}

export default function ComposedTextField() {
  const router = useRouter();
  const [formSubmitLoading, setFormSubmitLoading] = useState<boolean>(false);
  const [cookieValue, setCookieValue] = useState<string | null>(null);
  const [registerErrors, setRegisterErrors] = useState<string | null>(null);
  const [registerPageLoading, setRegisterPageLoading] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema), // Initialize React Hook Form with ZodResolver
  });

  const onSubmit = handleSubmit(async (data: RegisterWithCredentials) => {
    console.log(data.email.toLowerCase(), "HELLO WORLD"); // Handle form submission
    try {
      setCookieValue(null);
      setFormSubmitLoading(true);
      const res = await api.post("/auth/register", {
        email: data.email.toLowerCase(),
        password: data.password,
      });
      if (res.data) {
        router.push("/auth/login");
        toast.success("User Created Successfully!", {
          toastId: "User Created",
        });
      }
      setFormSubmitLoading(false);
      setRegisterErrors(null);

      reset();
      setRegisterPageLoading(true);
    } catch (error: any) {
      setFormSubmitLoading(false);
      if (error.response)
        setRegisterErrors(error.response.data.payload.error_message);
    }
  });

  // Redirect to other Page

  useEffect(() => {
    const access_token: string = getCookie("access_token");
    if (access_token) {
      currentUserDataHelper(access_token, router);
    }
    else {
      router.push("/auth/register");
    }
  }, [cookieValue]);

  // Set the Loading Value
  useEffect(() => {
    setRegisterPageLoading(false);
  }, []);
  return (
    // Loading the Page
    <>
      {registerPageLoading ? (
        <LoadingSkeletalParent />
      ) : (
        <div className="flex justify-center h-[92vh] items-center ">
          <Box
            as="form"
            onSubmit={onSubmit}
            noValidate
            autoComplete="off"
            className="flex flex-col h-fit  w-[400px] justify-center items-center shadow-lg p-5"
          >
            <p className="text-lg font-bold py-6">Create an Account</p>

            <FormControl
              isInvalid={!!errors.email || !!registerErrors}
              className="w-[100%]"
            >
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                {...register("email")} // Register input field with validation rules
              />
              <FormErrorMessage>
                {(errors.email && errors.email.message) || registerErrors}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!errors.password || !!registerErrors}
              className="w-[100%]"
            >
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                {...register("password")} // Register input field with validation rules
              />
              <FormErrorMessage>
                {(errors.password && errors.password.message) || registerErrors}
              </FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              className={`w-[100%]  py-1.5 rounded-md text-white my-4 ${
                formSubmitLoading
                  ? "bg-[#e0e0e0]  cursor-not-allowed"
                  : "bg-[#1976d2] cursor-pointer"
              }`}
              disabled={formSubmitLoading}
            >
              {formSubmitLoading ? (
                <div className="h-[100%] flex items-center justify-center">
                  <ClipLoader size={20} color="#f00e0e0e0" />
                </div>
              ) : (
                "Register"
              )}
            </Button>

            <p>
              Already Have a account{" "}
              <span className="text-blue-400 underline">
                <Link href="/auth/login">Log in</Link>
              </span>
            </p>
          </Box>
        </div>
      )}
    </>
  );
}

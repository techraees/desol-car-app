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
import currentUserDataHelper from "@/utils/currentUserDataHelper";

// Define your form schema using Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginWithCredentials {
  email: string;
  password: string;
}

export default function ComposedTextField() {
  const router = useRouter();
  const [formSubmitLoading, setFormSubmitLoading] = useState<boolean>(false);
  const [cookieValue, setCookieValue] = useState<string | null>(null);
  const [loginErrors, setLoginErrors] = useState<string | null>(null);
  const [loginPageLoading, setLoadingPageLoading] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema), // Initialize React Hook Form with ZodResolver
  });

  const onSubmit = handleSubmit(async (data: LoginWithCredentials) => {
    console.log(data.email.toLowerCase(), "HELLO WORLD"); // Handle form submission
    try {
      setCookieValue(null);
      setFormSubmitLoading(true);
      const res = await api.post("/auth/login", {
        email: data.email.toLowerCase(),
        password: data.password,
      });
      if (res.data) {
        setCookie("access_token", res.data.payload.access_token);
        setCookieValue(res.data.payload.access_token);
      }
      setFormSubmitLoading(false);
      setLoginErrors(null);

      reset();
      setLoadingPageLoading(true);
      toast.success("Login Successfully", { toastId: "Login Success" });
    } catch (error: any) {
      setFormSubmitLoading(false);
      if (error.response)
        setLoginErrors(error.response.data.payload.error_message);
    }
  });

  // Redirect to other Page

  useEffect(() => {
    const access_token: string = getCookie("access_token");
    if (access_token) {
      currentUserDataHelper(access_token, router);
    } else {
      router.push("/auth/login");
    }
  }, [cookieValue]);

  // Set the Loading Value
  useEffect(() => {
    setLoadingPageLoading(false);
  }, []);
  return (
    // Loading the Page
    <>
      {loginPageLoading ? (
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
            <p className="text-lg font-bold  py-6">Sign in</p>

            <FormControl
              isInvalid={!!errors.email || !!loginErrors}
              className="w-[100%]"
            >
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                {...register("email")} // Register input field with validation rules
              />
              <FormErrorMessage>
                {(errors.email && errors.email.message) || loginErrors}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!errors.password || !!loginErrors}
              className="w-[100%]"
            >
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                {...register("password")} // Register input field with validation rules
              />
              <FormErrorMessage>
                {(errors.password && errors.password.message) || loginErrors}
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
                "Log in"
              )}
            </Button>

            <p>
              Create an Account{" "}
              <span className="text-blue-400 underline">
                <Link href="/auth/register">Sign up</Link>
              </span>
            </p>
          </Box>
        </div>
      )}
    </>
  );
}

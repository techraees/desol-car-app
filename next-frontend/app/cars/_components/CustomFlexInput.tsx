'use client'

import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import "./customInput.css";

const CustomInputField = ({
  label,
  placeholder,
  name,
  register,
  errors,
}: {
  label: string;
  placeholder: string;
  name: string;
  register: any;
  errors: string | undefined;
}) => {
  return (
    <Flex align={"center"}>
      <FormControl
        className=" flex  p-2 sm:flex-row sm:items-center flex-col items-start"
        isInvalid={!!errors}
      >
        <FormLabel
          className="text-nowrap formLabelText"
          style={{ marginBottom: "0px" }}
        >
          {label.toUpperCase()}:
        </FormLabel>
        <div className="w-[100%]">
          <Input
            placeholder={placeholder}
            className="formLabelTextPlaceHolder w-[100%]"
            name={name}
            {...register(name)}
          />
          {errors && (
            <FormErrorMessage>
              <span className="text-[10px] font-[100]">{errors}</span>
            </FormErrorMessage>
          )}
        </div>
      </FormControl>
    </Flex>
  );
};

export default CustomInputField;

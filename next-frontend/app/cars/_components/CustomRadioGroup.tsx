"use client";

import {
  Flex,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

import "./customInput.css";
import { capitalizeFirstLetter } from "@/utils/helpers";
import ErrorMessage from "@/components/ErrorMessage";
import { useState } from "react";

const CustomRadioGroup = ({
  label,
  name,
  register,
  options,
  errors,
}: {
  label: string;
  options: { _id: string; name: string }[];
  name: string;
  register: any;
  errors: string | undefined;
}) => {
  return (
    <Flex direction="column">
      <FormControl className="flex items-center p-2" isInvalid={!!errors}>
        <FormLabel className="text-nowrap formLabelText">
          {label.toUpperCase()}:
        </FormLabel>
        <RadioGroup>
          <Flex direction="row" className="flex-wrap">
            {options &&
              options.map((option) => (
                <Radio
                  key={option.name}
                  onChange={(e) => {}}
                  value={option.name}
                  {...register(name)}
                  className="ml-10"
                >
                  <span className="formLabelTextRadio">
                    {option.name && capitalizeFirstLetter(option.name)}
                  </span>
                </Radio>
              ))}
          </Flex>
          <div className="ml-11 mt-2">
            <ErrorMessage>
              {errors && "Please Select at least One City"}
            </ErrorMessage>
          </div>
        </RadioGroup>
      </FormControl>
    </Flex>
  );
};

export default CustomRadioGroup;

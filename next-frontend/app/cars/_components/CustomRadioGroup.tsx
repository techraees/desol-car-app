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

const CustomRadioGroup = ({
  label,
  name,
  register,
  options,
  selectedValue,
  onChange,
  errors,
}: {
  label: string;
  options: { _id: string; name: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
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
        <RadioGroup value={selectedValue} onChange={onChange}>
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
                    {capitalizeFirstLetter(option.name)}
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

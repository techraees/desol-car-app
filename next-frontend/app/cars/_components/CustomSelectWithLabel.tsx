import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";

const options = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
];

const CustomSelectField = ({
  label,
  name,
  register,
  errors,
}: {
  label: string;
  name: string;
  register: any;
  errors: string | undefined;
}) => {
  return (
    <Flex direction="column">
      <FormControl
        className="flex sm:items-center p-2 items-start sm:flex-row flex-col"
        isInvalid={!!errors}
      >
        <FormLabel className="text-nowrap formLabelText">
          {label.toUpperCase()}:
        </FormLabel>
        <div className="w-[100%]">
          {" "}
          <Select
            placeholder="Please Select At least one"
            className="formLabelText w-[100%]"
            {...register(name)} // Use name instead of "no_of_copies"
          >
            {options &&
              options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="formLabelText"
                >
                  {option.label}
                </option>
              ))}
          </Select>
          <FormErrorMessage>
            {<span className="text-[10px]">{errors}</span>}
          </FormErrorMessage>
        </div>
      </FormControl>
    </Flex>
  );
};

export default CustomSelectField;

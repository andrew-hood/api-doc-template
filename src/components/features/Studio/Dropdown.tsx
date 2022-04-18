import {
  ButtonFilled,
  foundations,
  SelectDropdown,
  Text,
  View,
} from "@go1d/go1d";
import IconCaretDown from "@go1d/go1d/build/components/Icons/CaretDown";
import { FC, useState } from "react";

const Dropdown = ({
  placeholder,
  options,
  initialValue,
  onChange,
}: {
  placeholder: string;
  options: any[];
  initialValue?: string;
  onChange?: (value: string) => void;
}) => {
  const [value, setValue] = useState<any>(initialValue);

  const handleOnChange = (e: any) => {
    setValue(e.target.value);
    onChange && onChange(e.target.value);
  };

  const getOption = () => {
    return options.find((item) => item.value === value);
  };

  return (
    <span style={{ display: "inline-block" }}>
      <SelectDropdown
        onChange={handleOnChange}
        optionRenderer={(item) => <View width={100}>{item.label}</View>}
        options={options}
        closeOnSelection={true}
      >
        {({ ref, getToggleButtonProps }) => (
          <View>
            <ButtonFilled
              {...getToggleButtonProps()}
              innerRef={ref}
              size="sm"
              icon={IconCaretDown}
              iconColor="contrast"
              height={34}
              border={0}
              css={{
                color: foundations.colors.contrast,
                backgroundColor: getOption()?.color || "#f1f1f1",
                ":hover, :focus": {
                  backgroundColor: getOption()?.color || "#f1f1f1",
                },
              }}
            >
              {getOption()?.label || placeholder}
            </ButtonFilled>
          </View>
        )}
      </SelectDropdown>
    </span>
  );
};

interface DropdownProps {
  value?: string;
  onChange?: (value: string) => void;
}

const MethodDropdown: FC<DropdownProps> = ({ value, onChange }) => {
  const options = [
    { value: "get", label: "GET", color: "#CEEDBF" },
    { value: "post", label: "POST", color: "#B8E6F4" },
    { value: "put", label: "PUT", color: "#FFDEAD" },
    { value: "patch", label: "PATCH", color: "#FFDEAD" },
    { value: "delete", label: "DELETE", color: "#F9C1B4" },
  ];
  return (
    <Dropdown
      placeholder="action"
      options={options}
      initialValue={value}
      onChange={onChange}
    />
  );
};

const StatusCodeDropdown: FC<DropdownProps> = ({ value, onChange }) => {
  const options = [
    { value: "200", label: "200", color: "#CEEDBF" },
    { value: "201", label: "201", color: "#CEEDBF" },
    { value: "204", label: "204", color: "#CEEDBF" },
    { value: "400", label: "400", color: "#FFDEAD" },
    { value: "401", label: "401", color: "#FFDEAD" },
    { value: "403", label: "403", color: "#FFDEAD" },
    { value: "500", label: "500", color: "#F9C1B4" },
  ];
  return (
    <Dropdown
      placeholder="status code"
      options={options}
      initialValue={value}
      onChange={onChange}
    />
  );
};

export { MethodDropdown, StatusCodeDropdown };

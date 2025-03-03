import React from "react";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import CustomSwitch from "./CustomSwitch";

interface BooleanInputProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const BooleanInput: React.FC<BooleanInputProps> = ({
  label,
  value,
  onChange,
}) => {
  const handleChange = () => {
    onChange(!value);
  };

  return (
    <>
      <FormControl
        component="fieldset"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: 'space-between'
        }}
      >
        <Typography fontWeight={300}>
          {label}
        </Typography>
        <CustomSwitch
          title={'Activate/Deactivate'}
          checked={value}
          onChange={handleChange}
          disabled={false}
        />
      </FormControl>
    </>
  );
};

export default BooleanInput;

import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPhSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disable?: boolean }[] | undefined;
  disabled?: boolean;
};

const PhSelect = ({ label, name, options, disabled }: TPhSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            options={options}
            size="large"
            placeholder={`Select ${label}`}
            disabled={disabled}
          />
          {error && (
            <small style={{ color: "#fc033d" }}>{error?.message}</small>
          )}
        </Form.Item>
      )}
    />
  );
};

export default PhSelect;

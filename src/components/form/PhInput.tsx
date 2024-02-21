import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

const PhInput = ({ type, name, label }: TInputProps) => {
  return (
    <div style={{ marginBottom: "12px" }}>
      {label ? `${label} :` : null}
      <Controller
        name={name}
        render={({ field }) => <Input {...field} type={type} name={name} />}
      />
    </div>
  );
};

export default PhInput;

import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

const PhInput = ({ type, name, label }: TInputProps) => {
  return (
    <div style={{ marginBottom: "12px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} name={name} />{" "}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PhInput;

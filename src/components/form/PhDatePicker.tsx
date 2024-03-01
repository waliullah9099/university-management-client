import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  label?: string;
};

const PhDatePicker = ({ name, label }: TDatePickerProps) => {
  return (
    <div style={{ marginBottom: "12px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <DatePicker
              {...field}
              name={name}
              size="large"
              placeholder={label}
              style={{ width: "100%" }}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PhDatePicker;

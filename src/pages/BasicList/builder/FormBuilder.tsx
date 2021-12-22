import { Form, Input } from 'antd';

const FormBuilder = (data?: PageApi.Datum[]) => {
  return (data || []).map((field: any) => {
    return (
      <Form.Item label={field.title} name={field.key} key={field.key}>
        <Input value={field.title} />
      </Form.Item>
    );
  });
};

export default FormBuilder;

import { Field, useFormikContext } from 'formik';
import { Input } from './Input';

type Props = {
  name: string;
  [inp: string]: any;
};

export const DateField = ({ name, ...others }: Props) => {
  const { values, setFieldValue }: any = useFormikContext();
  const handleChange = (ev: any) => {
    setFieldValue(name, new Date(ev.currentTarget.value));
  };

  return (
    <Field
      as={Input}
      type='date'
      name={name}
      value={new Date(values[name])
        .toISOString()
        .substring(0, 10)}
      onChange={handleChange}
      {...others}
    />
  );
};

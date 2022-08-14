import { useFormikContext } from 'formik';
import { BiChevronDown } from 'react-icons/bi';
import Select from 'react-select';

type Props = {
  name: string;
  options: { value: any; label: string }[];
  initOption: any;
  value: any;
  setValue: Function;
};

export const SelectField = ({
  name,
  options,
  setValue,
  value,
}: Props) => {
  const handelChange = (newValue: any) => {
    setValue(name, newValue.value);
  };

  return (
    <Select
      name={name}
      value={options.find(({ value: v }) => v === value)}
      className='w-full'
      onChange={handelChange}
      options={options}
    />
  );
};

export const MultipleSelect = ({
  name,
  fetcher,
  ...others
}: {
  name: string;
  fetcher?: any;
}) => {
  const { setFieldValue, values }: any = useFormikContext();
  const handleChange = (newValue: any) => {
    setFieldValue(name, [...newValue]);
  };
  const { isLoading, options } = fetcher();
  return (
    <Select
      isMulti
      isLoading={isLoading}
      name={name}
      value={values[name]}
      className='w-full'
      onChange={handleChange}
      options={options}
      {...others}
    />
  );
};

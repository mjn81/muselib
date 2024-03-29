import {
  Alert,
  Button,
  DateField,
  FileDrop,
  Input,
  MultipleSelect,
  SelectField,
} from 'components/core';
import {
  ALERT_TYPES,
  FormFieldTypes,
} from 'constants/index';
import { Field, Form, Formik } from 'formik';
import { ZodType, ZodTypeDef } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

type Props = {
  submit: (data: any, helpers: any) => any;
  initialValues: {
    [inp: string]: any;
  };
  validator: ZodType<unknown, ZodTypeDef, unknown>;
  fields: {
    fieldType: FormFieldTypes;
    name: string;
    type?: string;
    placeholder?: string;
    [inp: string]: any;
  }[];
  submitBtn: React.ReactNode | React.ReactNode[];
};

export const Generator = ({
  initialValues,
  fields,
  validator,
  submitBtn,
  submit,
}: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validator)}
      onSubmit={submit}
      enableReinitialize={true}
    >
      {({ isSubmitting, errors, setFieldValue }) => (
        <Form className='w-full py-6 flex flex-col space-y-4 items-center justify-center'>
          {Object.values(errors).length > 0 && (
            <Alert type={ALERT_TYPES.ERROR}>
              {Object.values(errors).map((error, index) => (
                <p key={`err_${index}`}>
                  {error?.toString()}
                </p>
              ))}
            </Alert>
          )}
          {fields.map(({ fieldType, ...other }, index) => (
            <FieldGenerator
              key={index}
              fieldType={fieldType}
              setField={setFieldValue}
              {...other}
            />
          ))}
          <Button type='submit' disabled={isSubmitting}>
            {submitBtn}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

type FieldProps = {
  fieldType: FormFieldTypes;
  name: string;
  setField: Function;
  [inp: string]: any;
};

const FieldGenerator = ({
  fieldType,
  setField,
  ...others
}: FieldProps) => {
  switch (fieldType) {
    case FormFieldTypes.input:
      return <Field as={Input} {...others} />;
    case FormFieldTypes.select:
      return (
        <Field
          as={SelectField}
          setValue={setField}
          {...others}
        />
      );
    case FormFieldTypes.date:
      return <DateField {...others} />;
    case FormFieldTypes.multiselect:
      return <MultipleSelect {...others} />;
    case FormFieldTypes.file:
      return (
        <FileDrop
          fetcher={others.fetcher}
          deleter={others.deleter}
          accessor={others.accessor}
          {...others}
        />
      );
  }
};

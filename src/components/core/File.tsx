import { useDropzone } from 'react-dropzone';
import { RiUploadCloud2Line } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import { postError, postSuccess } from 'utils/res';
import { useEffect, useState } from 'react';
import { SimpleProgress } from './Progress';
import { ButtonIcon } from './Button';
import { useFormikContext } from 'formik';

type Props = {
  name: string;
  extraDataFieldName: string;
  extraDataAccessor: (file: File) => any;
  fetcher: (
    file: File,
    setProgress: (progress: number) => void
  ) => Promise<any>;
  deleter: (id: string) => Promise<any>;
  accessor: (data: any) => any;
};

export const FileDrop = ({
  name,
  fetcher,
  deleter,
  accessor,
  extraDataFieldName,
  extraDataAccessor,
}: Props) => {
  // phase 3 custom hook
  const {
    values,
    setFieldValue,
    isSubmitting,
    initialValues,
  }: any = useFormikContext();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isError, setIsError] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    disabled: isLoading || isFinished,
    maxFiles: 1,
    accept: {
      'audio/*': [
        '.mpeg',
        '.mp3',
        '.wav',
        '.aiff',
        '.aac',
        '.ogg',
      ],
    },
    onDrop: (files: File[], rejected) => {
      // phase 4 adding abort functionality
      if (rejected.length > 1) {
        postError(
          'only one file can be uploaded at a time'
        );
        return;
      }
      if (rejected.length === 1) {
        const err = rejected[0]?.errors;
        if (err) {
          err.map((e) => postError(e.message));
          return;
        }
      }
      const file = files[0] as File;
      setFieldValue(
        extraDataFieldName,
        extraDataAccessor(file)
      );
      // setIsLoading(true);
      // fetcher(file, setProgress)
      //   .then((data: any) => {
      //     setIsFinished(true);
      //     // phase 3 dynamic accessor
      //     setFieldValue(name, accessor(data));
      //     // @ts-ignore
      //     console.log(file.length);
      //     postSuccess(data.message);
      //   })
      //   .catch((err: any) => {
      //     setProgress(0);
      //     setIsError(true);
      //     postError(err.message);
      //   })
      //   .finally(() => {
      //     setIsLoading(false);
      //   });
    },
  });

  const onDeleteHandler = () => {
    const value = values[name];
    deleter(value)
      .then((data: any) => {
        setIsFinished(false);
        setFieldValue(name, initialValues[name]);
        postSuccess(data.message);
      })
      .catch((err: any) => {
        postError(err.message);
      });
  };

  useEffect(() => {
    if (isSubmitting) {
      setIsFinished(false);
      setProgress(0);
    }
  }, [isSubmitting]);

  return (
    <section
      className={
        'flex justify-center w-full h-32 px-4 transition border-2 border-gray-300 border-dashed rounded-md appearance-none hover:border-gray-400 focus:outline-none ' +
        (!isLoading
          ? isFinished
            ? 'bg-white'
            : 'bg-white cursor-pointer'
          : 'bg-gray-50')
      }
    >
      <div
        className='w-full flex items-center justify-center space-x-2'
        {...getRootProps()}
      >
        <input {...getInputProps({ name: name })} />
        {!isLoading && !isFinished && (
          <span className='text-gray-500 text-lg flex items-center justify-center space-x-2'>
            <RiUploadCloud2Line className='text-3xl' />
            <p>
              Drag &apos;n&apos; drop your music here, or
              click to select file
            </p>
          </span>
        )}

        {(isLoading || isFinished) && (
          <span className='w-full flex items-center relative'>
            <SimpleProgress
              color='bg-violet-500'
              percent={progress}
            />
            <p className='absolute text-white left-1/2 -translate-x-1/2'>
              {progress}%
            </p>
          </span>
        )}
        {isFinished && (
          <ButtonIcon
            type='button'
            onClick={onDeleteHandler}
          >
            <MdDelete className='text-xl text-rose-500' />
          </ButtonIcon>
        )}
      </div>
    </section>
  );
};

import { useDropzone } from 'react-dropzone';
import { RiUploadCloud2Line } from 'react-icons/ri';
import { postError } from 'utils/res';

type Props = {
  name: string;
  fetcher?: any;
  setField: Function;
};

export const FileDrop = ({
  name,
  fetcher,
  setField,
}: Props) => {
  const { isLoading, uploadFile, isError, error } =
    fetcher();
  if (isError) postError(error);
  const { getRootProps, getInputProps } = useDropzone({
    disabled: isLoading,
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
    onDrop: (files, rejected) => {
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
      const file = files[0];
      uploadFile(file).then((path: string) => {
        setField(name, path);
      });
    },
  });

  return (
    <section
      className={
        'flex justify-center w-full h-32 px-4 transition border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none ' +
        (!isLoading && !isError ? 'bg-white' : 'bg-gray-50')
      }
    >
      <div
        className='flex items-center space-x-2'
        {...getRootProps()}
      >
        <input {...getInputProps({ name: name })} />
        <span className='text-gray-500 text-lg flex items-center justify-center space-x-2'>
          <RiUploadCloud2Line className='text-3xl' />
          <p>
            Drag &apos;n&apos; drop your music here, or
            click to select file
          </p>
        </span>
      </div>
    </section>
  );
};

export const SimpleProgress = ({
  percent,
  color,
}: {
  percent: number;
  color: string;
}) => {
  return (
    <div className='h-5 bg-gray-200 w-full rounded-md overflow-hidden'>
      <div
        className={
          'transition-all rounded-md h-full ' + color
        }
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

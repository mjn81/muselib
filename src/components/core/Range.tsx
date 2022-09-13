type SimpleRangeType = {
  current: number;
  minimum: number;
  maximum: number;
};
export const SimpleRange = ({
  current,
  minimum,
  maximum,
}: SimpleRangeType) => {
  const percentage =
    ((current - minimum) / (maximum - minimum)) * 100;
  console.log(percentage);
  return (
    <div className='h-2 w-full bg-gray-200 mx-4 rounded-lg relative overflow-hidden'>
      <div
        className='bg-light_purple absolute h-full'
        style={{
          width: `${percentage}%`,
        }}
      ></div>
    </div>
  );
};

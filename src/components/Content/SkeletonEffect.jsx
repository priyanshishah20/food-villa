export const SkeletonRestCard = () => {
  return (
    <>
      <div className='grid grid-cols-3 gap-10'>
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="space-y-3">
            <div className="w-full h-60 bg-gray-100 rounded-lg"></div>
            <div className="w-60 h-4 bg-gray-100 rounded-md"></div>
            <div className="w-40 h-4 bg-gray-100 rounded-md"></div>
          </div>
        ))}
      </div>
    </>
  );
}
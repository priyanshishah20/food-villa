export const SkeletonRestCard = () => {
    return (
        <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="space-y-3">
          <div className="w-full h-40 bg-gray-100"></div>
          <div className="w-60 h-4 bg-gray-100"></div>
          <div className="w-40 h-4 bg-gray-100"></div>
        </div>
      ))}
    </div>
        </>
    );
}
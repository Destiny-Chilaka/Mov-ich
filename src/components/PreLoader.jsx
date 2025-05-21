function PreLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-t-4 border-red-600 border-solid rounded-full animate-spin"></div>
        <div className="w-24 h-24 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin absolute top-0 left-0 opacity-50"></div>
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-semibold">
          Loading...
        </span>
      </div>
    </div>
  );
}

export default PreLoader;

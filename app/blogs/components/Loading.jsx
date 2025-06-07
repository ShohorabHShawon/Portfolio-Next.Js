export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="min-h-screen bg-gray-600 overflow-hidden dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section Skeleton */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <div className="h-12 bg-gray-300 rounded-lg mx-auto mb-4 w-80 animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded-lg mx-auto w-96 animate-pulse"></div>
        </div>
      </div>

      {/* Loading Cards Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
            >
              <div className="aspect-video bg-gray-300"></div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <div className="h-5 bg-gray-300 rounded-full w-16"></div>
                  <div className="h-5 bg-gray-300 rounded-full w-20"></div>
                </div>
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="flex justify-between items-center mb-4">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                </div>
                <div className="h-5 bg-gray-300 rounded w-28"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

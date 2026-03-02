export default function Loading() {
  return (
    <div className="h-screen bg-geopolitical-dark flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">WarMonitor</h2>
        <p className="text-gray-400">Initializing global intelligence dashboard...</p>
      </div>
    </div>
  )
}

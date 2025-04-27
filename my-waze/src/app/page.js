export default function Home() {
  return (
    <div className="flex flex-col items-center text-center gap-6">
      <h1 className="font-bold text-2xl text-black">Welcome to MyWaze</h1>

      <a href="/register" className="w-full">
        <div className="bg-gray-100 w-full py-4 rounded-lg text-lg font-medium hover:bg-gray-200 cursor-pointer transition">
          Register Account
        </div>
      </a>

      <a href="/login" className="w-full">
        <div className="bg-gray-100 w-full py-4 rounded-lg text-lg font-medium hover:bg-gray-200 cursor-pointer transition">
          Login
        </div>
      </a>

      <a href="/vehicle" className="w-full">
        <div className="bg-gray-100 w-full py-4 rounded-lg text-lg font-medium hover:bg-gray-200 cursor-pointer transition">
          Register Vehicle Type
        </div>
      </a>

      <a href="/route" className="w-full">
        <div className="bg-gray-100 w-full py-4 rounded-lg text-lg font-medium hover:bg-gray-200 cursor-pointer transition">
          Define Route and Calculate ETA
        </div>
      </a>

      <a href="/speed" className="w-full">
        <div className="bg-gray-100 w-full py-4 rounded-lg text-lg font-medium hover:bg-gray-200 cursor-pointer transition">
          Alert Speed Limit
        </div>
      </a>
    </div>
  );
}

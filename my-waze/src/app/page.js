export default function Home() {
  return (
    <div className="flex flex-col items-center text-center gap-6">
      <h1 className="font-bold text-2xl text-black">Welcome to MyWaze</h1>

      {/* Scrollable container */}
      <div className="w-full max-h-screen overflow-y-auto flex flex-col gap-4 px-4">
        {[
          { href: "/register", label: "Register Account" },
          { href: "/login", label: "Login" },
          { href: "/vehicle", label: "Register Vehicle Type" },
          { href: "/route", label: "Define Route and Calculate ETA" },
          { href: "/poi", label: "Find POI" },
          { href: "/speed", label: "Alert Speed Limit" },
          { href: "/music", label: "Connect with Music Apps" }, // Adjusted href
        ].map((item, index) => (
          <a href={item.href} key={index} className="w-full">
            <div className="bg-gray-100 w-full py-4 rounded-lg text-lg font-medium hover:bg-gray-200 cursor-pointer transition text-center">
              {item.label}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

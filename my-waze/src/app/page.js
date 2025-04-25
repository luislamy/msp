import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-items-center items-center p-8 rounded-xl text-center gap-8 bg-white mx-auto w-fit text-black">
      <h1 className="font-bold">Welcome to MyWaze</h1>
      <a href="/register"><div className="bg-white">Register Account</div></a>
      <a href="/login"><div className="bg-white">Login</div></a>
      <a href="/vehicle"><div className="bg-yellow-400">Register Vehicle Type*</div></a>
      <a href="/route"><div className="bg-yellow-400">Define Route and Calculate ETA*</div></a>
      <a href="/speed"><div className="bg-yellow-400">Alert Speed Limit*</div></a>
      <div>Features with * are disappearing from this menu when login and tokens are implemented.</div>
    </div>
  );
}

import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col justify-items-center items-center p-8 rounded-xl text-center gap-8 bg-white w-fit mx-auto">
      <h1 className="font-bold">Register Account</h1>
      <a href="/login"><div>Already have an account? Login here.</div></a>
      <a href="/"><div>Back</div></a>
    </div>
  );
}

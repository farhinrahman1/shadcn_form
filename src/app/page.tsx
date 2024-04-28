"use client";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-y-10 bg-slate-900 text-white h-full">
      <h1 className="border-black text-yellow-200 text-[1.5rem] border-2 p-2 rounded-md font-sans font-bold">
        ShadCN
      </h1>
      <button className="bg-yellow-300 text-black font-semibold hover:bg-black hover:text-white p-2 font-sans rounded-md">
        Open Form
      </button>
    </main>
  );
}

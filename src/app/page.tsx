import Image from "next/image";
import Scene from "./_components/Scene";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-6">
      <p className="text-[10vw] font-medium tracking-tighter">
        shaders practice.
      </p>
      <div className="w-full min-h-screen flex flex-wrap gap-4 justify-center">
        <Scene />
        <Scene />
        <Scene />
        <Scene />
        <Scene />
        <Scene />
      </div>
    </main>
  );
}

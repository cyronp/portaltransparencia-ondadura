import HomeCarousel from "./components/HomeCarousel/HomeCarousel";

export default function Home() {
  return (
    <main className="w-full h-dvh lg:h-[calc(100vh-92px)] relative overflow-hidden bg-neutral-950">
      <HomeCarousel />
    </main>
  );
}

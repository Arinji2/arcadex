import { GamesSection } from "./games.client";
import { Hero } from "./hero";
import { HomeInfo } from "./info";

export default function Home() {
  return (
    <>
      <Hero />
      <GamesSection />

      <HomeInfo />
    </>
  );
}

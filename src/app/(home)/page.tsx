import { GamesSection } from "./games";
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

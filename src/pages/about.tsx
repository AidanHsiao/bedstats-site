import React from "react";
import AboutSection from "../components/about/AboutSection";
import NavBar from "../components/common/NavBar";

export default function Page() {
  return (
    <React.Fragment>
      <NavBar headerVisible={false} />
      <main style={{ marginTop: 90 }}>
        <AboutSection
          title="The all-in-one app for BedWars support."
          text="BedStats was built on a need to track statistics and check players. Back 
          when I used to use discord bots to check player stats, there was no easy
          method of comparison. Not only that, I had to go one by one in-lobby to
          check if someone with a 99% win rate was in my lobby. I still believe
          that it is valid to dodge BedWars games because there is no existing MMR
          system, and that's the reason why BedStats exists; to improve the
          playing experience. I created BedStats as a BW player, for BW players."
          background
        />
        <AboutSection
          title="Follow the Developer!"
          text="Click on one of the links below."
          follow
        />
      </main>
    </React.Fragment>
  );
}

export function getStaticProps() {
  return { props: {} };
}

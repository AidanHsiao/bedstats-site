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
          when Discord bots were used to check player stats, there was no simple and efficient
          method of comparison. Not only that, going one by one in-lobby to
          check for high level players was a pain. The lack of an MMR system can make BedWars
          extremely frustrating to play, and that's the reason why BedStats exists; to improve the
          playing experience. BedStats was created as a BedWars player, for BedWars players."
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

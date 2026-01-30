import { useState } from "react";
import RoundCounter from "./RoundCounter";
import styles from "./Battle.module.css";

// Define Rounds interface (or keep it here if not shared elsewhere)
export interface Rounds {
  totalRounds: number;
  currentRound: number;
}

// Optional helper function
const processRounds = (rounds: Rounds) => {
  for (let roundNum = 1; roundNum <= rounds.totalRounds; roundNum++) {
    console.log(`Round ${roundNum} of ${rounds.totalRounds}`);
  }
};

export default function Battle() {
  // Initialize rounds state properly
  const [rounds, setRounds] = useState<Rounds>({
    totalRounds: 10,
    currentRound: 1, // Start from round 1
  });

  // If you want to track current round separately (optional)
  // const [currentRound, setCurrentRound] = useState(1);

  // Function to advance to next round
  const nextRound = () => {
    if (rounds.currentRound < rounds.totalRounds) {
      setRounds((prev) => ({
        ...prev,
        currentRound: prev.currentRound + 1,
      }));
      // Or if using separate state:
      // setCurrentRound(prev => prev + 1);
    }
  };

  // Function to reset rounds
  const resetRounds = () => {
    setRounds({
      totalRounds: 10,
      currentRound: 1,
    });
  };

  return (
    <div className={styles.battle}>
      {/* Pass rounds to RoundCounter */}
      <RoundCounter rounds={rounds} />

      <h1>Vilken är bäst?</h1>

      <div className={styles.pokemonContainer}>
        <div className={styles.pokemonCard}>
          {/* Pokemon 1 content */}
          <h3>Pokemon 1</h3>
          {/* Add image, stats, etc. */}
        </div>

        <div className={styles.pokemonCard}>
          {/* Pokemon 2 content */}
          <h3>Pokemon 2</h3>
          {/* Add image, stats, etc. */}
        </div>
      </div>
    </div>
  );
}

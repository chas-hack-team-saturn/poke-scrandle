import styles from "./RoundCounter.module.css";
import type { Rounds } from "./Battle";

interface RoundCounterProps {
  rounds: Rounds;
}

export default function RoundCounter({ rounds }: RoundCounterProps) {
  // Calculate progress or remaining rounds
  const progress = rounds.currentRound
    ? (rounds.currentRound / rounds.totalRounds) * 100
    : 0;

  return (
    <div className={styles.roundCounterContainer}>
      {/* Round info text */}
      <div className={styles.roundText}>
        {rounds.currentRound
          ? `Round ${rounds.currentRound} of ${rounds.totalRounds}`
          : `Total Rounds: ${rounds.totalRounds}`}
      </div>

      {/* Simple dots/circles for all rounds */}
      <div className={styles.circlesContainer}>
        {Array.from({ length: rounds.totalRounds }).map((_, index) => {
          const roundNumber = index + 1;
          const isCompleted = roundNumber < rounds.currentRound;
          const isCurrent = roundNumber === rounds.currentRound;
          const isUpcoming = roundNumber > rounds.currentRound;

          return (
            <div
              key={index}
              className={`
                ${styles.circle}
                ${isCompleted ? styles.completed : ""}
                ${isCurrent ? styles.current : ""}
                ${isUpcoming ? styles.upcoming : ""}
              `}
              title={`Round ${roundNumber}`}>
              {roundNumber}
            </div>
          );
        })}
      </div>

      {/* Optional: Progress percentage display */}
      <div className={styles.progressText}>
        Progress: {Math.round(progress)}%
      </div>
    </div>
  );
}

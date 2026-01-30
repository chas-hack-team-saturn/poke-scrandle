import styles from "./FinishedModal.module.css";

export default function finishedModal() {
  return (
    <div className={styles.modal}>
      <h2>Du är färdig!</h2>
      <button>Kör infinity mode</button>
      <button>Leaderboards</button>
    </div>
  );
}

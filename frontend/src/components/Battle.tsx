import { useState, useEffect } from "react";
import RoundCounter from "./RoundCounter";
import styles from "./Battle.module.css";
import { PokemonCard } from "./PokemonCard";
import { getPokemon } from "../api/api";
import type { Pokemon } from "../types/pokemon";
import finishedModal from "../components/FinishedModal";

export interface Rounds {
  totalRounds: number;
  currentRound: number;
}

export default function Battle() {
  const [rounds, setRounds] = useState<Rounds>({
    totalRounds: 10,
    currentRound: 1,
  });

  const [pokemon1, setPokemon1] = useState<Pokemon | null>(null);
  const [pokemon2, setPokemon2] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomPokemon = async () => {
    try {
      setIsLoading(true);

      // Fetch two random Pokémon
      const [firstPokemon, secondPokemon] = await Promise.all([
        getPokemon(),
        getPokemon(),
      ]);

      setPokemon1(firstPokemon);
      setPokemon2(secondPokemon);
      setError(null);
    } catch (err) {
      setError("Failed to fetch Pokémon");
      console.error("Error fetching Pokémon:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const advanceRound = () => {
    if (rounds.currentRound < rounds.totalRounds) {
      setRounds((prev) => ({
        ...prev,
        currentRound: prev.currentRound + 1,
      }));

      // Fetch new Pokémon for next round
      fetchRandomPokemon();
    } else {
      finishedModal();
      console.log("Game completed!");
    }
  };

  // Add vote for a specific Pokémon
  const addVote = (pokemonId: number) => {
    // Implement your voting logic here
    console.log(`Voted for Pokémon with ID: ${pokemonId}`);

    // After voting, advance to next round
    advanceRound();
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchRandomPokemon();
  }, [rounds.currentRound]);

  if (isLoading) {
    return <div className={styles.loading}>Loading Pokémon...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button onClick={fetchRandomPokemon}>Try Again</button>
      </div>
    );
  }

  // Don't render until we have Pokémon data
  if (!pokemon1 || !pokemon2) {
    return null;
  }

  return (
    <div className={styles.battle}>
      <RoundCounter rounds={rounds} />

      <h1 className={styles.title}>Vilken är bäst?</h1>

      <div className={styles.pokemonContainer}>
        {/* Pass pokemon1 and create an onVote function for it */}
        <PokemonCard pokemon={pokemon1} onVote={() => addVote(pokemon1.Id)} />

        <img
          className={styles.vsSign}
          src="/src/assets/vs-sign.png"
          alt="Versus sign"
        />

        {/* Pass pokemon2 and create an onVote function for it */}
        <PokemonCard pokemon={pokemon2} onVote={() => addVote(pokemon2.Id)} />
      </div>
    </div>
  );
}

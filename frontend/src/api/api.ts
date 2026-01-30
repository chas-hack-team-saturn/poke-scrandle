import { Pokemon } from "../types/pokemon";

export const getPokemon: Function = async (): Promise<Pokemon[]> => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");

    if (!response.ok) {
      throw new Error("Något gick fel vid hämtning av data!");
    }
    const data: Pokemon[] = await response.json();
    return data.results((item: any, index: number, url: string) => ({
      id: index + 1,
      name: item.name,
    }));
  } catch (error) {
    console.error("Ett fel inträffade", error);
    throw error;
  }
};

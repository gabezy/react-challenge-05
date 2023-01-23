import { useEffect, useState } from "react";
import { Pokemon } from "./Pokemon";

export interface PokemonProps {
  name: string;
  base_experience: string;
  sprites: {
    front_default: string;
  };
}

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonProps[]>([]);

  const getRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch (err) {
      return err;
    }
  };

  const fetchPokemonAPI = async () => {
    const { results } = await fetchData("https://pokeapi.co/api/v2/pokemon");
    const sortedArr: { name: string; url: string }[] = [...results];
    sortedArr.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    const promises = sortedArr.map((item) => {
      return fetchData(item.url);
    });

    const pokemonsStatsList = await Promise.all(promises);
    setPokemonList(pokemonsStatsList);
  };
  useEffect(() => {
    fetchPokemonAPI();
  }, []);

  return (
    <>
      <h1>Challenge React</h1>
      <h2>Consume Pokemon API</h2>
      <hr />
      {pokemonList.map((pokemon) => (
        <Pokemon key={pokemon.name} details={pokemon} />
      ))}
    </>
  );
}

export default App;

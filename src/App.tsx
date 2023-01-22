import { useEffect, useState } from "react";

//base_experience
// sprites - front_default

interface Pokemon {
  name: string;
  experience: number;
  pokemonPhoto: string;
}

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  const fetchApi = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
  };

  useEffect(() => {
    const test = async () => {
      const { results } = await fetchApi("https://pokeapi.co/api/v2/pokemon");
      for (const pokemon of results) {
        const pokemonStats = await fetchApi(pokemon.url);
        const pokemonInfo: Pokemon = {
          name: pokemon.name,
          experience: pokemonStats["base_experience"],
          pokemonPhoto: pokemonStats.sprites["front_default"],
        };

        setPokemonList((prev) => [...prev, pokemonInfo]);
      }
    };
    test();
  }, []);

  return (
    <>
      {pokemonList.length > 0 &&
        pokemonList.map((pokemon, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              fontSize: "1.125rem",
            }}
          >
            <h2>{pokemon.name}</h2>
            <p>EXP {pokemon.experience}</p>
            <img src={pokemon.pokemonPhoto} alt="" />
          </div>
        ))}
    </>
  );
}

export default App;

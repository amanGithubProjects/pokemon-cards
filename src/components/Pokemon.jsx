import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading , setLoading] = useState(true);
  const [error , setError] = useState(null);
  const [search , setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=28";

  const fetchPokemonApi = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      const detailedPokemonData = data.results.map(async (currElm) => {
        const res = await fetch(currElm.url);
        const data = await res.json();
        return data;
      });
      const detailedData = await Promise.all(detailedPokemonData);
      console.log(detailedData);
      setPokemon(detailedData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemonApi();
  }, []);

  // searchin

  const searchData = pokemon.filter((currElm)=>currElm.name.toLowerCase().includes(search.toLowerCase()))

  if(loading){
    return(
      <div>
        <h1>Loading.......</h1>
      </div>
    )
  }

  if(error){
    return(
      <h1>{error.message}</h1>
    )
  }
  return (
    <>
      <section className="container">
        <header>
          <h1> catch Pokémon</h1>
        </header>
        <div className="pokemon-search">
           <input type="text" placeholder="search pokemon" value={search} onChange={(e)=> setSearch(e.target.value)} />
        </div>
        <div>
          <ul className="cards">
            
            {searchData.map((currPokemon) => {
              return <PokemonCards key={currPokemon.id} pokemonData={currPokemon}/>;
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

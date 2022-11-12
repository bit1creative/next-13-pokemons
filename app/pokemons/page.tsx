import NextLink from 'next/link';
import style from '../page.module.css';
import { useState as ReactUseState } from 'react';

const fetchPokemons = async () => {
  const { results: pokemons } = await (await fetch('https://pokeapi.co/api/v2/pokemon')).json();
  return pokemons as any[];
};

export default async function Page() {
  const pokemons = await fetchPokemons();

  return (
    <div className={style.main}>
      <div className={style.pokemonTitle}>Pokemons</div>
      {pokemons.map((pokemon: any) => (
        <NextLink
          href={`/pokemons/${pokemon.url.split('/').at(-2)}`}
          key={pokemon.name}
          className={style.pokemonName}
        >
          {pokemon.name}
        </NextLink>
      ))}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { use, useState, useTransition } from 'react';
import styles from '../page.module.css';

async function fetchPokemons() {
  const pokemons: any[] = [];
  const fetcher = async (url = 'https://pokeapi.co/api/v2/pokemon') => {
    const data = await (await fetch(url, { cache: 'no-store' })).json();
    pokemons.push(...data.results);
    if (data.next) {
      await fetcher(data.next);
    }
  };

  await fetcher();
  return pokemons;
}

const pokemonsPromise = fetchPokemons();

export default function Pokemons() {
  const pokemons = use(pokemonsPromise);
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState('');
  const [pokemonsToRender, setPokemonsToRender] = useState(pokemons);

  const onChange = (pokemonName: string) => {
    setSearch(pokemonName);
    startTransition(() => {
      setPokemonsToRender(pokemons.filter((pokemon) => pokemon.name.includes(pokemonName)));
    });
  };

  return (
    <div className={styles.main}>
      <h3>Pokemons</h3>
      <div>{pokemons.length}</div>

      <input
        type='text'
        value={search}
        onChange={(e: any) => onChange(e.target.value)}
        className={styles.pokemonSearch}
      />

      {pokemonsToRender.map((pokemon: any) => (
        <Link
          key={pokemon.name}
          href={`/pokemons/${pokemon.url.split('/').at(-2)}`}
          className={styles.pokemonLink}
        >
          {pokemon.name}
        </Link>
      ))}
    </div>
  );
}

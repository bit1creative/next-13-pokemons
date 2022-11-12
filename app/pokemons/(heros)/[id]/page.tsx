import Image from 'next/image';
import style from '../../../page.module.css';

const fetchPokemonData = async (pokemonId: string) => {
  const pokemonData = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, { next: { revalidate: 10 } })
  ).json();
  return pokemonData;
};

export default async function Page({ params }: any) {
  const pokemon = await fetchPokemonData(params.id);
  return (
    <div className={style.main}>
      <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={300} height={300} />
      <h2>{pokemon.name}</h2>
    </div>
  );
}

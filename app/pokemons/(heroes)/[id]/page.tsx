import style from '../../../page.module.css';

const fetchPokemonData = async (pokemonId: string) => {
  const pokemon = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, { cache: 'no-cache' } )
  ).json();
  return pokemon;
};

export default async function Page({ params }: any) {
  const pokemon = await fetchPokemonData(params.id);
  return (
    <div className={style.main}>
      <div>{pokemon.name}</div>
    </div>
  );
}

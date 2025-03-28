interface PokemonBioDataTypes {
  name: string;
  id: number;
  picture: string;
  biodata: [
    position: string,
    timeline: string,
    capital: string,
    contro: string,
    power: string,
    legacy: string,
  ];
}

export function PokemonBioData(props: PokemonBioDataTypes) {
  return (
    <section className="grid grid-cols-3">
      <div className="flex">
        <p>[{props.id}]</p>
        <img src={props.picture} alt={props.name} />
      </div>
    </section>
  );
}

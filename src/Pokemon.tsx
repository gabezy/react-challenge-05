import { PokemonProps } from "./App";

interface DetailsProps {
  details: PokemonProps;
}

export const Pokemon = ({ details }: DetailsProps) => {
  if (!details) return <div>-</div>;
  else {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
        <span>
          <img
            src={details.sprites.front_default}
            alt=""
            style={{ width: 70 }}
          />
        </span>
        <span>
          <strong style={{ marginRight: 10 }}>{details.name}</strong>
          <span>EXP {details.base_experience}</span>
        </span>
      </div>
    );
  }
};

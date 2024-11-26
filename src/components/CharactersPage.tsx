import { Character } from "../types/types";
import { CharacterCard } from "./CharacterCard";

interface ICharactersPage {
  data: Character[];
}
export const CharactersPage: React.FC<ICharactersPage> = ({ data }) => {
  return (
    <div className="space-y-8 flex flex-col items-center">
      {data.map((c: Character) => {
        return <CharacterCard key={c.id} character={c} />;
      })}
    </div>
  );
};

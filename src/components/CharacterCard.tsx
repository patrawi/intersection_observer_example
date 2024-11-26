import { useCallback, useEffect, useRef, useState } from "react";
import { Character } from "../types/types";
import { useIntersection } from "../hook/useIntersection";

interface ICharacterCard {
  character: Character;
}
export const CharacterCard: React.FC<ICharacterCard> = ({ character }) => {
  const baseUrl = "https://placehold.co/300x300";
  const imageSection = useRef<HTMLImageElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>(baseUrl); // This is a gray placeholder

  const handleLoadImage = useCallback(() => {
    setImageSrc(character.image ?? "");
  }, [character.image]);
  const { observer } = useIntersection(handleLoadImage);
  useEffect(() => {
    const currentRef = imageSection.current;
    if (currentRef && observer) {
      observer.observe(currentRef);
      return () => {
        observer.unobserve(currentRef);
      };
    }
  }, [observer, imageSrc]);
  return (
    <div className=" bg-slate-400 max-w-xl w-full text-white rounded-xl shadow-2xl">
      <div className="flex gap-4">
        <img
          ref={imageSection}
          src={imageSrc}
          className="rounded-l-lg"
          loading="lazy"
          alt={character.name ?? "some unnamed chracter"}
        />

        <div className="p-4">
          <h3 className="text-2xl font-bold mb-4">{character.name}</h3>
          <p>Status: {character.status}</p>
          <p>Origin: {character.origin?.name}</p>
          <p>Species: {character.species}</p>

          <p className="text-slate-900 font-xl">Last Known Area</p>
          <p>{character.location?.name}</p>

          <p>Gender: {character.gender}</p>
        </div>
      </div>
    </div>
  );
};

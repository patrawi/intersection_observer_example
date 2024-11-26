import { fetcher } from "../utils/fetcher";
import { Character, PaginatedResponse } from "../types/types";

import useSWR from "swr";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIntersection } from "../hook/useIntersection.ts";
import { CharactersPage } from "../components/CharactersPage.tsx";

export default function Index() {
  const loadMoreSection = useRef<HTMLDivElement>(null);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [characterPage, setCharacterPage] = useState<number>(1);

  const { data, isLoading } = useSWR<PaginatedResponse<Character>>(
    characterPage
      ? `https://rickandmortyapi.com/api/character?page=${characterPage}`
      : null,
    {
      fetcher: fetcher,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );
  const scrollPositionRef = useRef(0);
  const saveScrollPosition = useCallback(() => {
    scrollPositionRef.current = window.scrollY;
  }, []);

  const restoreScrollPosition = useCallback(() => {
    if (scrollPositionRef.current) {
      window.scrollTo(0, scrollPositionRef.current);
      requestAnimationFrame(() => {
        if (window.scrollY === scrollPositionRef.current) {
          scrollPositionRef.current = 0;
        }
      });
    }
  }, []);

  const isLoadingRef = useRef(false);
  const handleLoadMore = useCallback(() => {
    if (data?.info.next && !isLoading && !isLoadingRef.current) {
      isLoadingRef.current = true;

      saveScrollPosition();
      setCharacterPage((prev) => prev + 1);
    }
  }, [data?.info.next, isLoading, saveScrollPosition]);

  const { observer } = useIntersection(handleLoadMore);

  useEffect(() => {
    if (data?.results) {
      setAllCharacters((prev) => {
        const newCharacters = data.results.filter(
          (newChar) =>
            !prev.some((existingChar) => existingChar.id === newChar.id)
        );
        return [...prev, ...newCharacters];
      });

      isLoadingRef.current = false;
      restoreScrollPosition();
    }
  }, [data, restoreScrollPosition]);
  useEffect(() => {
    const currentRef = loadMoreSection.current;
    if (currentRef && observer) {
      observer.observe(currentRef);
      return () => {
        observer.unobserve(currentRef);
      };
    }
  }, [observer, loadMoreSection]);
  if (!data && !isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <main className="container mx-auto relative ">
      <h1 className="text-red-400 text-3xl text-center py-4">
        Welcome to the Rick C-137 Directory app
      </h1>

      <CharactersPage data={allCharacters} />

      <div ref={loadMoreSection} className="h-40 w-full bg-red-400">
        Load More...
      </div>
    </main>
  );
}

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Create, Filter } from "~/components/icons";
import { Pokemon } from "~/components/pokemon";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/lib/axios";
import { useState } from "react";

import { Loader2 } from "lucide-react";
import { PokemonType } from "~/types/pokemon";

export default function Pokedex() {
  const [nameFilter, setNameFilter] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const res = await api("/api/pokemon");
      return res;
    },
    queryKey: ["pokemons"],
  });

  const { data: types, isLoading: isLoadingTypes, isError: isErrorOnTypes } = useQuery({
    queryFn: async () => {
      const res = await api("/api/types");
      return res;
    },
    queryKey: ["types"],
  });

  if (isLoading) return <Loader2 className="h-4 w-4 animate-spin" />;
  if (isError) return <div>Sorry There was an Error</div>;

  const router = useRouter();

  function handleCreateNewPokemon() {
    router.push("/pokedex/new");
  }

  const filteredPokemon = data?.data.filter((pokemon: PokemonType) =>
    pokemon.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full flex-1 px-20 pt-10">
      <div className="flex flex-col gap-6 rounded-lg bg-black/70 p-12">
        <h1 className="text-2xl font-bold text-white">Pokedex</h1>

        <div className="flex w-full items-center justify-between">
          <div className="flex w-full items-center gap-3">
            <Input
              className="max-w-xl bg-primary text-white"
              placeholder="Search pokemon"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
            <Button className="gap-2 text-base">
              <Filter />
              Type
            </Button>
          </div>
          <Button
            onClick={handleCreateNewPokemon}
            className="gap-2 text-base font-medium text-white"
          >
            <Create />
            Create New
          </Button>
        </div>

        <div className="flex w-full flex-wrap items-center gap-5">
          {filteredPokemon && filteredPokemon.length > 0 ? (
            filteredPokemon.map((pokemon: PokemonType) => {
              return <Pokemon key={pokemon.id} {...pokemon} />;
            })
          ) : (
            <span className="text-white">no pokemons here...</span>
          )}
        </div>
      </div>
    </div>
  );
}

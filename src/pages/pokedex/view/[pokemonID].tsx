import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ArrowLeft, Pencil, RightArrow, Trash } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { api } from "~/lib/axios";
import { PokemonType } from "~/types/pokemon";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Separator } from "~/components/ui/separator";
import { useState } from "react";
import { useToast } from "~/hooks/use-toast";

export default function Page() {
  const router = useRouter();
  const pokemonID = router.query.pokemonID;
  const { toast } = useToast();

  const [currentlyDeletingPokemon, setCurrentlyDeletingPokemon] = useState<
    string | null
  >(null);

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const res = await api(`/api/pokemon/${pokemonID}`);
      return res;
    },
    queryKey: ["pokemons"],
  });

  if (isLoading) return <Loader2 className="h-4 w-4 animate-spin" />;
  if (isError) return <div>Sorry There was an Error</div>;

  const pokemon = data?.data as PokemonType;

  function handleBack() {
    router.push("/pokedex");
  }

  function handleEditButton() {
    router.push(`/pokedex/edit/${pokemonID}`)
  }

  const handleDeletePokemon = async (id: string) => {
    setCurrentlyDeletingPokemon(id);

    try {
      await api.delete(`/api/pokemon/${pokemonID}`);

      setCurrentlyDeletingPokemon(null);

      router.push("/pokedex");

      toast({
        title: "Pokemon deleted!",
        description: "The pokemon was deleted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error when delete pokemon",
        description: "An error ocurred, please try again!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex-1 px-20 pt-10 text-white">
      <div className="flex flex-col gap-6 rounded-lg bg-black/70 p-12">
        <div className="items-cener flex w-full justify-between">
          <Button
            onClick={handleBack}
            variant="ghost"
            size="icon"
            className="hover:bg-muted-foreground"
          >
            <ArrowLeft />
          </Button>

          <div className="flex items-center gap-4">
            <Button onClick={handleEditButton} className="gap-2 text-base">
              <Pencil />
              Edit
            </Button>

            <Dialog>
              <DialogTrigger className="flex cursor-pointer items-center justify-start gap-2">
                <Button className="gap-2 text-base">
                  {currentlyDeletingPokemon === pokemon.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash />
                  )}
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                </DialogHeader>

                <Separator />

                <DialogDescription>
                  This action is permanent, once your resume is deleted it
                  can&lsquo;t be restored
                </DialogDescription>

                <div className="flex items-center justify-end gap-4">
                  <DialogClose>
                    <Button>Cancel</Button>
                  </DialogClose>
                  <Button
                    onClick={() => handleDeletePokemon(pokemon.id)}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex w-full items-center">
          <Image
            width={476}
            height={447}
            src={pokemon.photo}
            alt={`pokemon: ${pokemon.name}`}
          />

          <div className="flex flex-col gap-4 rounded-lg bg-primary p-5">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold leading-6">
                {pokemon.name}
              </h1>
              <span className="text-base">{`Nº ${pokemon.number}`}</span>
            </div>
            <span className="w-full text-left text-sm capitalize text-orange-500">
              {pokemon.type}
            </span>
            <span className="text-base">{pokemon.description}</span>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Height</span>
                <span className="text-sm">{pokemon.height}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Weight</span>
                <span className="text-sm">{pokemon.weight}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Gender Ratio</span>
                <span className="text-sm">{`${pokemon.genderRatio1} ♂ ${pokemon.genderRatio2} ♀`}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Abilities</span>
                <span className="text-sm">{pokemon.abilities}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Egg Groups</span>
                <span className="text-sm">{pokemon.eggGroups}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Evolutions</span>
              <span className="text-sm">{pokemon.evolutionDesc}</span>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src={pokemon.photo}
                width={120}
                height={120}
                alt={`pokemon: ${pokemon.name}`}
              />
              <RightArrow />
              <Image
                src={pokemon.evolutionPhoto}
                width={120}
                height={120}
                alt={`pokemon evolution: ${pokemon.name}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

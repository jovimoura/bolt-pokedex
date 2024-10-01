import Image from "next/image";
import Link from "next/link";
import { PokemonType } from "~/types/pokemon";

export function Pokemon({ number, name, type, id, photo }: PokemonType) {
  return (
    <Link href={`/pokedex/view/${id}`}>
      <div className="flex max-h-[270px] max-w-[276px] flex-col items-center justify-center rounded-2xl bg-primary p-5">
        <Image width={144} height={135} src={photo} alt="pokemon image" />

        <div className="flex flex-col items-center justify-center gap-1">
          <span className="text-sm font-semibold capitalize text-white">{`Nº ${number}`}</span>
          <span className="text-base font-bold capitalize text-white">
            {name}
          </span>
          <span className="text-sm capitalize text-orange-500">{type}</span>
        </div>
      </div>
    </Link>
  );
}

import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case "GET":
      const pokemons = await db.pokemon.findMany();
      
      const allTypes = new Set<string>();
      pokemons.forEach(pokemon => {
        const types = pokemon.type.split(/[,/]/).map(t => t.trim());
        types.forEach(type => allTypes.add(type));
      });
      
      const uniqueTypes = Array.from(allTypes);
      
      return res.status(200).json(uniqueTypes);
    default:
      break;
  }
}

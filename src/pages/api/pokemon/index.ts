import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  const {
    name,
    number,
    photo,
    type,
    description,
    height,
    weight,
    genderRatio1,
    genderRatio2,
    abilities,
    eggGroups,
    evolutionDesc,
    evolutionPhoto,
  } = req.body;

  switch (method) {
    case "POST":
      const newPokemon = await db.pokemon.create({
        data: {
          name,
          number,
          photo,
          type,
          description,
          height,
          weight,
          genderRatio1,
          genderRatio2,
          abilities,
          eggGroups,
          evolutionDesc,
          evolutionPhoto,
        },
      });
      return res.status(200).json(newPokemon);
    case "GET":
      const pokemons = await db.pokemon.findMany();
      return res.status(200).json(pokemons);
    default:
      break;
  }
  res.status(200).json({ message: "Condor family!" });
}

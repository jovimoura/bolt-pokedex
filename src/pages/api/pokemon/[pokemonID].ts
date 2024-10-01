import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  const { pokemonID } = Array.isArray(req.query) ? req.query[0] : req.query;
  console.log('POKEMON ID', pokemonID)
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
    case "GET":
      const pokemon = await db.pokemon.findUnique({
        where: {
          id: pokemonID,
        },
      });
      return res.status(201).json(pokemon);
    case "PATCH":
      const updatedPokemon = await db.pokemon.update({
        where: {
          id: pokemonID,
        },
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
      return res.status(201).json(updatedPokemon);

    case "DELETE":
      const deletedPokemon = await db.pokemon.delete({
        where: {
          id: pokemonID,
        },
      });
      return res.status(204).json(deletedPokemon);

    default:
      return res.status(404).json({ message: "Wrong method!" });
  }
}

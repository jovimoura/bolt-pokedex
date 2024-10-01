import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import { api } from "~/lib/axios";
import { PokemonType } from "~/types/pokemon";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useToast } from "~/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  number: z.string(),
  photo: z.string(),
  type: z.string().min(2, {
    message: "Type its required.",
  }),
  description: z.string(),
  height: z.string().min(2, {
    message: "Height its required.",
  }),
  weight: z.string().min(2, {
    message: "Weight its required.",
  }),
  genderRatio1: z.string().min(2, {
    message: "Gender Ratio its required.",
  }),
  genderRatio2: z.string().min(2, {
    message: "Gender Ratio its required.",
  }),
  abilities: z.string().min(2, {
    message: "Abilities Ratio its required.",
  }),
  eggGroups: z.string().min(2, {
    message: "Egg Groups Ratio its required.",
  }),
  evolutionDesc: z.string(),
  evolutionPhoto: z.string(),
});

export default function Page() {
  const router = useRouter();
  const pokemonID = router.query.pokemonID;
  const { toast } = useToast();

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

  const [image, setImage] = useState();
  const [evoluationImage, setEvoluationImage] = useState();

  function handleCancel() {
    router.push("/pokedex");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: pokemon.name || "",
      number: `${pokemon.number}` || "",
      photo: pokemon.photo || "",
      type: pokemon.type || "",
      description: pokemon.description || "",
      height: pokemon.height || "",
      weight: pokemon.weight || "",
      genderRatio1: pokemon.genderRatio1 || "",
      genderRatio2: pokemon.genderRatio2 || "",
      abilities: pokemon.abilities || "",
      eggGroups: pokemon.eggGroups || "",
      evolutionDesc: pokemon.evolutionDesc || "",
      evolutionPhoto: pokemon.evolutionPhoto || "",
    },
  });

  const onSubmit = form.handleSubmit(
    async (data: z.infer<typeof formSchema>) => {
      try {
        await api.patch(`/api/pokemon/${pokemonID}`, {
          name: data.name,
          number: parseInt(data.number),
          photo: data.photo,
          type: data.type,
          description: data.description,
          height: data.height,
          weight: data.weight,
          genderRatio1: data.genderRatio1,
          genderRatio2: data.genderRatio2,
          abilities: data.abilities,
          eggGroups: data.eggGroups,
          evolutionDesc: data.evolutionDesc,
          evolutionPhoto: data.evolutionPhoto,
        });

        toast({
          title: "Pokemon edited!",
          description: "The pokemon was edited successfully!",
        });
      } catch (error) {
        toast({
          title: "Something goes wrong",
          description: "Error trying to edit a new pokemon",
          variant: "destructive"
        });
      }
      router.push("/pokedex");
    },
  );

  return (
    <div className="min-h-screen w-full flex-1 px-20 pt-10 text-white">
      <div className="flex flex-col gap-6 rounded-lg bg-black/70 p-12">
        <h1 className="text-2xl font-bold ">Nuevo Pokemon</h1>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="bg-primary placeholder:text-muted-foreground"
                        placeholder="Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="bg-primary placeholder:text-muted-foreground"
                        placeholder="N° 123"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  {!image ? (
                    <FormLabel className="cursor-pointer">
                      <Image
                        className="h-[165px] w-[165px] rounded-full"
                        width={165}
                        height={165}
                        src={pokemon.photo}
                        alt="logo user"
                      />
                    </FormLabel>
                  ) : (
                    <FormLabel className="cursor-pointer">
                      <Image
                        className="h-[165px] w-[165px] rounded-full"
                        width={165}
                        height={165}
                        src={URL.createObjectURL(image)}
                        alt="logo user"
                      />
                    </FormLabel>
                  )}
                  <FormControl>
                    <Input
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        // @ts-ignore
                        setImage(e.target?.files[0]);
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            field.onChange(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-primary placeholder:text-muted-foreground"
                      placeholder="Type (Ex: Eletric, Fire)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="bg-primary placeholder:text-muted-foreground"
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="bg-primary placeholder:text-muted-foreground"
                        placeholder="Height"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="bg-primary placeholder:text-muted-foreground"
                        placeholder="Weight"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="genderRatio1"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="bg-primary placeholder:text-muted-foreground"
                        placeholder="♂ Gender ratio"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genderRatio2"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="bg-primary placeholder:text-muted-foreground"
                        placeholder="♀ Gender ratio"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="abilities"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-primary placeholder:text-muted-foreground"
                      placeholder="Abilities"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eggGroups"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-primary placeholder:text-muted-foreground"
                      placeholder="Egg Groups"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="evolutionDesc"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-primary placeholder:text-muted-foreground"
                      placeholder="Evolution description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="evolutionPhoto"
              render={({ field }) => (
                <FormItem>
                  {!evoluationImage ? (
                    <FormLabel className="cursor-pointer">
                      <Image
                        className="h-[165px] w-[165px] rounded-full"
                        width={165}
                        height={165}
                        src={pokemon.evolutionPhoto}
                        alt="logo user"
                      />
                    </FormLabel>
                  ) : (
                    <FormLabel className="cursor-pointer">
                      <Image
                        className="h-[165px] w-[165px] rounded-full"
                        width={165}
                        height={165}
                        src={URL.createObjectURL(evoluationImage)}
                        alt="logo user"
                      />
                    </FormLabel>
                  )}
                  <FormControl>
                    <Input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        // @ts-ignore
                        setEvoluationImage(e.target?.files[0]);
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            field.onChange(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full items-center justify-end gap-4">
              <Button onClick={handleCancel} className="bg-white text-black">
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

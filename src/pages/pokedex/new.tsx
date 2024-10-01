import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/lib/axios";
import { Textarea } from "~/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import { useToast } from "~/hooks/use-toast";

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

export default function NewPokemon() {
  const router = useRouter();

  const { toast } = useToast()
  const [image, setImage] = useState();
  const [evoluationImage, setEvoluationImage] = useState()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      number: "",
      photo: "",
      type: "",
      description: "",
      height: "",
      weight: "",
      genderRatio1: "",
      genderRatio2: "",
      abilities: "",
      eggGroups: "",
      evolutionDesc: "",
      evolutionPhoto: "",
    },
  });

  const onSubmit = form.handleSubmit(
    async (data: z.infer<typeof formSchema>) => {
      try {
        await api.post("/api/pokemon", {
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
          title: "Pokemon created!",
          description: "The pokemon was created successfully!",
        });
      } catch (error) {
        toast({
          title: "Something goes wrong",
          description: "Error trying to create a new pokemon",
          variant: "destructive"
        });
      }
      router.push("/pokedex");
    },
  );

  function handleCancel() {
    router.push("/pokedex");
  }
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
                  {image ? (
                    <FormLabel className="cursor-pointer">
                      
                      <Image
                        className="h-[165px] w-[165px] rounded-full"
                        width={165}
                        height={165}
                        src={URL.createObjectURL(image)}
                        alt="logo user"
                      />
                    </FormLabel>
                  ) : (
                    <FormLabel className="cursor-pointer flex h-9 w-full rounded-md border border-input bg-primary px-3 py-1 text-sm text-muted-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                      Photo
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
                  {evoluationImage ? (
                    <FormLabel className="cursor-pointer">
                      
                      <Image
                        className="h-[165px] w-[165px] rounded-full"
                        width={165}
                        height={165}
                        src={URL.createObjectURL(evoluationImage)}
                        alt="logo user"
                      />
                    </FormLabel>
                  ) : (
                    <FormLabel className="cursor-pointer flex h-9 w-full rounded-md border border-input bg-primary px-3 py-1 text-sm text-muted-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                      Evolution Photo
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

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");

  useEffect(() => {
    const request = async () => {
      const result = await fetch("/api/pokemon");
      // This is just an example to obtain data from the endpoint. Hint :) avoid no typesafety we hate that
      const resultJson = await result.json();
      console.log({ resultJson });
      setText(resultJson.message);
    };
    void request();
  }, []);

  return (
    <>
      <main className="flex flex-1 w-full min-h-screen flex-col items-center justify-center">
        <div className="flex items-center justify-between bg-pokedex relative px-14 w-full max-w-[713px] h-[520px]">
          <div className="relative">
            <div className="w-60 h-40 p-4 flex flex-col">
              <div className="w-full flex items-center justify-between">
                <h1 className="font-semibold text-base">Pikachu</h1>
                <span className="text-base">N° 25</span>
              </div>
              <span className="text-xs text-left">Electric</span>
              <div className="text-xs text-left">When it is angered, it immediately discharges the energy stored in pouches in its cheeks.</div>
              <div className="flex items-center justify-center gap-2">
                <div className="flex-col">
                  <span className="font-semibold text-sm leading-4">Height</span>
                  <span className="text-sm leading-4">1' 04"</span>
                </div>
                <div className="flex-col">
                  <span className="font-semibold text-sm leading-4">Weight</span>
                  <span className="text-sm leading-4">13.2 lbs</span>
                </div>
              </div>
            </div>

            <Link href='/pokedex' className="text-base font-semibold absolute top-[270px] left-[60px]">Search</Link>
          </div>
          <div className="relative">
            <div className="w-[226px] h-64 items-center justify-center rounded-lg bg-white flex flex-col gap-12 mt-16">
              <Image width={144} height={135} src='/pikachu.png' alt="pikachu image" />
              
            </div>
            <Link href='/pokedex' className="text-base font-semibold absolute -bottom-14 left-3">View more</Link>
          </div>
        </div>
      </main>
    </>
  );
}

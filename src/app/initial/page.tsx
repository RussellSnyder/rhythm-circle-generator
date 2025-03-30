"use client";

import { ChangeEvent, useCallback, useState } from "react";
import { RhythmicCircleContainer } from "../components/RhymicCircleContainer";

export default function Home() {
  const [numberOfBeats, setNumberOfBeats] = useState(5);

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setNumberOfBeats(Number(newValue));
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h2 className="text-4xl">Initial</h2>
      <header>
        <section className="grid grid-col-3">
          <div className="w-full max-w-sm min-w-[200px]">
            <label htmlFor="number-of-beats" className="mr-4">
              Number of Beats:
            </label>
            <input
              className="w-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              type="number"
              value={numberOfBeats}
              max={9}
              min={2}
              onChange={handleOnChange}
            />
          </div>
        </section>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <RhythmicCircleContainer numberOfBeats={numberOfBeats} />
        {/* <RhythmicCircle /> */}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        By Russell for Steffen
      </footer>
    </div>
  );
}

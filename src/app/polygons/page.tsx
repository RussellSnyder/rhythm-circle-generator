"use client";

import { ChangeEvent, useCallback, useMemo, useState } from "react";
import ReactRough, { Line, Point, Polygon } from "react-rough";

const POLYGON_LOOKUP = {
  "5,2": "Pentagram",
};

const SIZE = 300; // TODO use screen size
const PADDING = 5;

export default function Home() {
  // number of vertices
  const [p, setP] = useState(5);
  // number of vertices skipped
  const [q, setQ] = useState(2);

  const handlePChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setP(Number(newValue));
  }, []);

  const handleQChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setQ(Number(newValue));
  }, []);

  const polygon_points: Point[] = useMemo(() => {
    const x = SIZE / 2;
    const y = SIZE / 2;
    // For a circle with origin (j, k) and radius r:
    const distanceBetweenPoints = (2 * Math.PI) / p;
    const offset = Math.PI / 2; // have the first point at the top

    const points: Point[] = [];
    for (let i = 0; i < p + 1; i++) {
      const t = i * distanceBetweenPoints - offset;
      points.push([
        (SIZE / 2 - PADDING) * Math.cos(t) + x,
        (SIZE / 2 - PADDING) * Math.sin(t) + y,
      ]);
    }

    return points;
  }, [p]);

  const connecting_line_pairs: Point[][] = useMemo(() => {
    let current_point_index = 0; // start at index, this can be more than p
    const connections: Point[][] = [];
    for (let i = 0; i < p * p; i++) {
      const next_point_index = current_point_index + q;

      connections.push([
        polygon_points[current_point_index % p],
        polygon_points[next_point_index % p],
      ]);

      if (next_point_index % p === 0) {
        break;
      }

      current_point_index = next_point_index;
    }
    return connections;
  }, [polygon_points, q, p]);

  console.log({ polygon_points });
  console.log({ connecting_line_pairs });

  return (
    <div>
      <header className="mb-6">
        <section>
          <h4>
            {POLYGON_LOOKUP[`${p},${q}` as keyof typeof POLYGON_LOOKUP]
              ? POLYGON_LOOKUP[`${p},${q}` as keyof typeof POLYGON_LOOKUP]
              : "Unknown Polygon"}
          </h4>
          <h5>
            <a
              href="https://en.wikipedia.org/wiki/Schl%C3%A4fli_symbol"
              target="_blank"
            >
              Schlaefli symbols
            </a>
          </h5>
        </section>
        <section className="controls grid grid-col-2 justify-center">
          <div className="w-full max-w-sm min-w-[200px]">
            <label htmlFor="p" className="mr-4">
              P
            </label>
            <input
              id="p"
              className="w-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              type="number"
              value={p}
              min={1}
              onChange={handlePChange}
            />
          </div>
          <div className="w-full max-w-sm min-w-[200px]">
            <label htmlFor="q" className="mr-4">
              Q
            </label>
            <input
              id="q"
              className="w-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              type="number"
              value={q}
              max={p - 1}
              min={1}
              onChange={handleQChange}
            />
          </div>
        </section>
      </header>
      {/* @ts-expect-error not supporting typescript */}
      <ReactRough
        config={{
          options: {
            bowing: 0.3,
          },
        }}
        renderer="svg"
        height={SIZE}
        width={SIZE}
      >
        <Polygon points={polygon_points} />
        {connecting_line_pairs.map((pointPair: Point[], i) => (
          <Line
            strokeWidth={1}
            key={`lie-${i}`}
            x1={pointPair[0][0]}
            y1={pointPair[0][1]}
            x2={pointPair[1][0]}
            y2={pointPair[1][1]}
          />
        ))}
      </ReactRough>
    </div>
  );
}

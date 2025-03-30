import Image from "next/image";
import Link from "next/link";
import initialPreviewSrc from "./initial/initial_preview.png";
import polygonPreviewSrc from "./polygons/polygon_preview.png";

export default function Home() {
  return (
    <div>
      <h2>Represenations</h2>
      <div className="grid grid-cols-2 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div className="text-center">
          <Link className="text-2xl" href="/initial">
            <Image
              className="mb-4"
              src={initialPreviewSrc}
              alt="circles that look like they are drawn by hand"
            />
            Initial
          </Link>
        </div>
        <div className="text-center">
          <Link className="text-2xl" href="/polygons">
            <Image
              className="mb-4"
              src={polygonPreviewSrc}
              alt="Polygons that look like they are drawn by hand"
            />
            Polygons
          </Link>
        </div>
      </div>
    </div>
  );
}

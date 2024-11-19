import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../keystatic.config";
import { ImageCarousel, ImageCarouselProps } from "@/components/image-carousel";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Home() {
  const home = await reader.singletons.home.readOrThrow();

  return (
    <div className="flex justify-center w-full h-full">
      <ImageCarousel items={home.carousel as ImageCarouselProps["items"]} />
    </div>
  );
}

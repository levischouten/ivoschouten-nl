import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../keystatic.config";
import Image from "next/image";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Home() {
  const home = await reader.singletons.home.readOrThrow();

  return (
    <div className="flex justify-center w-full">
      <Carousel
        className="w-full max-w-xl"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {home.carousel.map((item, index) => (
            <CarouselItem key={index}>
              <div className="h-full flex flex-col gap-2">
                <Image
                  src={item.image}
                  alt={item.label}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <p className="text-center">{item.label}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

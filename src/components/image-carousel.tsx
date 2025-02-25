"use client";

import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
export type ImageCarouselProps = {
  items: {
    readonly label: string;
    readonly image: string;
  }[];
};

export function ImageCarousel(props: ImageCarouselProps) {
  const { items } = props;

  return (
    <Carousel
      className="w-full max-w-xl relative h-full pb-8"
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent className="h-full">
        {items.map((item, index) => (
          <CarouselItem key={index} className="relative h-full">
            <div className="flex flex-col gap-2 max-h-[500px] h-full max-w-[500px] w-full mx-auto">
              <Image
                src={item.image}
                alt={item.label}
                width={500}
                height={500}
                className="w-auto h-full object-contain"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

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
      className="w-full max-w-xl"
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {items.map((item, index) => (
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
    </Carousel>
  );
}

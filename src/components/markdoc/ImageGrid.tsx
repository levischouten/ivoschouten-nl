"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
// @ts-expect-error mismatch in React type
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type ImageGridProps = {
  images: {
    label: string;
    image: string;
  }[];
};

export function ImageGrid(props: ImageGridProps) {
  const [selectedImage, setSelectedImage] = React.useState<{
    label: string;
    image: string;
  }>(null!);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-8">
      <Dialog>
        {props.images.map((item, i) => (
          <div key={i}>
            <DialogTrigger asChild>
              <Image
                src={item.image}
                alt={item.label || "Placeholder text"}
                width={400}
                height={400}
                className="h-auto w-full object-cover mx-auto my-0 aspect-square hover:cursor-pointer"
                onClick={() => setSelectedImage(item)}
              />
            </DialogTrigger>
          </div>
        ))}
        <DialogContent className="bg-transparent border-none p-4 outline-none">
          <VisuallyHidden>
            <DialogTitle>{selectedImage?.label}</DialogTitle>
            <DialogDescription>{selectedImage?.label}</DialogDescription>
          </VisuallyHidden>
          <Image
            src={selectedImage?.image}
            alt={selectedImage?.label}
            width={400}
            height={400}
            className="h-auto w-full mx-auto my-0 hover:cursor-pointer"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

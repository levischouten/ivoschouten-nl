import Image from "next/image";

type ImageGridProps = {
  images: {
    label: string;
    image: string;
  }[];
};

export function ImageGrid(props: ImageGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-8">
      {props.images.map((item) => (
        <div key={item.label}>
          <Image
            src={item.image}
            alt={item.label}
            width={400}
            height={400}
            className="h-auto w-full object-cover mx-auto my-0 aspect-square"
          />
        </div>
      ))}
    </div>
  );
}

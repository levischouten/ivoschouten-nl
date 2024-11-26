import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../../keystatic.config";

import Link from "next/link";
import Image from "next/image";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  const posts = await reader.collections.works.all();

  return (
    <div className="mt-6">
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/works/${post.slug}`} className="space-y-1 group">
              <Image
                src={post.entry.image}
                alt={post.entry.title}
                width={320}
                height={180}
                className="h-auto w-full object-cover mx-auto aspect-square grayscale transition-all duration-300 group-hover:grayscale-0"
              />
              <div>
                <h2 className="text-xs">{post.entry.title}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

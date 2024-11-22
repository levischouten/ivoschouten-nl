import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../../keystatic.config";

import Link from "next/link";
import Image from "next/image";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  const posts = await reader.collections.works.all();

  return (
    <div className="mt-6">
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/works/${post.slug}`} className="space-y-4">
              <Image
                src={post.entry.image}
                alt={post.entry.title}
                width={320}
                height={180}
                className="h-auto w-full object-cover mx-auto aspect-square"
              />
              <div>
                <h2 className="text-sm">{post.entry.title}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

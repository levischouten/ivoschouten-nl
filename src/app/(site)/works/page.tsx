import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../../keystatic.config";

import Link from "next/link";
import Image from "next/image";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  const posts = await reader.collections.works.all();

  return (
    <div className="space-y-16">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center">Ivo's Work.</h1>
        <p className="text-center">A list of my works and projects.</p>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/works/${post.slug}`} className="space-y-4">
              <Image
                src={post.entry.image}
                alt={post.entry.title}
                width={320}
                height={180}
                className="w-full h-56 object-cover"
              />
              <div>
                <h2 className="underline underline-offset-2 font-semibold text-lg">
                  {post.entry.title}
                </h2>
                <p>{post.entry.description}</p>
              </div>
              <p className="flex items-center gap-1 font-medium">
                Read more <ArrowTopRightIcon className="w-4 h-4" />
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

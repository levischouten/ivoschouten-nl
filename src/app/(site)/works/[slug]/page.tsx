import { createReader } from "@keystatic/core/reader";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import { components, config } from "@/markdoc/config";

import keystaticConfig from "../../../../../keystatic.config";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const reader = createReader(process.cwd(), keystaticConfig);

export async function generateStaticParams() {
  const works = await reader.collections.works.list();

  return works.map((slug) => ({
    slug,
  }));
}

export default async function Post(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await reader.collections.works.read(await params.slug);

  if (!post) {
    return <div>No Post Found</div>;
  }

  const { node } = await post.content();
  const errors = Markdoc.validate(node, config);

  if (errors.length) {
    console.error(errors);
    throw new Error("Invalid content");
  }

  const renderable = Markdoc.transform(node, config);

  return (
    <div className="space-y-4">
      <div className="flex justify-start items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/works">Works</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{post.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* @ts-expect-error mismatch in React type */}
      {Markdoc.renderers.react(renderable, React, { components })}
    </div>
  );
}

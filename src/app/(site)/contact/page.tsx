import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../../keystatic.config";
import Markdoc from "@markdoc/markdoc";
import React from "react";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Contact() {
  const contact = await reader.singletons.contact.readOrThrow();

  const { node } = await contact.content();
  const errors = Markdoc.validate(node);

  if (errors.length) {
    console.error(errors);
    throw new Error("Invalid content");
  }

  const renderable = Markdoc.transform(node);

  // @ts-expect-error mismatch in React type
  return Markdoc.renderers.react(renderable, React);
}

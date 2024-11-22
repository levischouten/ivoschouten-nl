import { config, fields, collection } from "@keystatic/core";
import { block } from "@keystatic/core/content-components";
import { LayoutGridIcon, VideoIcon } from "lucide-react";
import React, { ReactElement } from "react";
import { Video } from "@/components/markdoc/Video";
import { ImageGrid } from "@/components/markdoc/ImageGrid";

export default config({
  storage: {
    kind: process.env.NODE_ENV === "development" ? "local" : "cloud",
  },
  cloud: {
    project: "ivo-schouten/ivoschouten-nl",
  },
  ui: {
    brand: {
      name: "Ivo Schouten",
    },
    navigation: {
      Pages: ["home", "about", "contact"],
      Collections: ["works"],
    },
  },
  singletons: {
    home: {
      label: "Home",
      schema: {
        title: fields.text({ label: "Title" }),
        description: fields.text({ label: "Description" }),
        carousel: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            image: fields.image({
              label: "Image",
              directory: "public/images/carousel",
              publicPath: "/images/carousel/",
              description: "Image of the carousel",
              validation: { isRequired: true },
            }),
          }),
          {
            label: "Carousel",
            itemLabel(props) {
              return props.fields.label.value;
            },
          },
        ),
      },
    },
    about: {
      label: "About",
      entryLayout: "content",
      format: { contentField: "content" },
      schema: {
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              directory: "public/images/works",
              publicPath: "/images/works/",
            },
          },
        }),
      },
    },
    contact: {
      label: "Contact",
      entryLayout: "content",
      format: { contentField: "content" },
      schema: {
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              directory: "public/images/works",
              publicPath: "/images/works/",
            },
          },
        }),
      },
    },
  },
  collections: {
    works: collection({
      label: "Works",
      slugField: "title",
      entryLayout: "content",
      path: "src/content/works/*",
      format: { contentField: "content" },
      columns: ["title"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        image: fields.image({
          label: "Image",
          directory: "public/images/works",
          publicPath: "/images/works/",
          description: "Cover image of the work",
          validation: { isRequired: true },
        }),
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              directory: "public/images/works",
              publicPath: "/images/works/",
            },
          },
          components: {
            video: block({
              label: "Video",
              description: "Upload a video",
              // @ts-expect-error mismatch in React type
              icon: <VideoIcon />,
              // @ts-expect-error mismatch in React type
              ContentView: ({ value }) => {
                const { src, ...props } = value;

                if (!src) {
                  return null;
                }

                const blob = new Blob([src.data], { type: "video/mp4" });
                const url = URL.createObjectURL(blob);

                return <Video src={url} {...props} />;
              },
              schema: {
                src: fields.file({
                  label: "Video file",
                  description: "Select a video file",
                  directory: "public/videos/",
                  publicPath: "/videos/",
                }),
                controls: fields.checkbox({
                  label: "Controls",
                  description: "Show video controls",
                  defaultValue: false,
                }),
                autoPlay: fields.checkbox({
                  label: "Autoplay",
                  description: "Enable autoplay (will mute the video)",
                  defaultValue: false,
                }),
                loop: fields.checkbox({
                  label: "Loop",
                  description: "Enable looping",
                  defaultValue: false,
                }),
              },
            }),
            imageGrid: block({
              label: "Image Grid",
              description: "Display a grid of images",
              // @ts-expect-error mismatch in React type
              icon: <LayoutGridIcon />,
              // @ts-expect-error mismatch in React type
              ContentView: ({ value }) => {
                const images = value.images
                  .map((item) => {
                    if (!item.image) {
                      return null;
                    }

                    const blob = new Blob([item.image?.data], {
                      type: "image/jpeg",
                    });
                    const image = URL.createObjectURL(blob);

                    return {
                      label: item.label,
                      image,
                    };
                  })
                  .filter(Boolean) as { label: string; image: string }[];

                return <ImageGrid images={images} />;
              },
              schema: {
                images: fields.array(
                  fields.object({
                    label: fields.text({ label: "Label" }),
                    image: fields.image({
                      label: "Image",
                      directory: "public/images/works",
                      publicPath: "/images/works/",
                      description: "Image of the work",
                      validation: { isRequired: true },
                    }),
                  }),
                  {
                    itemLabel(props) {
                      return props.fields.label.value;
                    },
                  },
                ),
              },
            }),
          },
        }),
      },
    }),
  },
});

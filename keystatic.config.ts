import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: process.env.NODE_ENV === "development" ? "local" : "cloud",
  },
  ui: {
    brand: {
      name: "Wansuda",
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
          }
        ),
      },
    },
    about: {
      label: "About",
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
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        image: fields.image({
          label: "Image",
          directory: "public/images/works",
          publicPath: "/images/works/",
          description: "Cover image of the work",
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          description: "Short description of the work",
        }),
        date: fields.date({
          label: "Date",
          description: "Date of the work",
        }),
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
    }),
  },
});

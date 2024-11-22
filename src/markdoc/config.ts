import { Config } from "@markdoc/markdoc";
import { Video } from "@/components/markdoc/Video";
import { ImageGrid } from "@/components/markdoc/ImageGrid";

const config: Config = {
  tags: {
    video: {
      render: "Video",
      attributes: {
        src: {
          type: String,
          required: true,
        },
        controls: {
          type: Boolean,
          required: false,
        },
        autoPlay: {
          type: Boolean,
          required: false,
        },
        loop: {
          type: Boolean,
          required: false,
        },
      },
    },
    imageGrid: {
      render: "ImageGrid",
      attributes: {
        images: {
          type: Array,
          required: true,
        },
      },
    },
  },
};

const components = {
  Video,
  ImageGrid,
};

export { config, components };

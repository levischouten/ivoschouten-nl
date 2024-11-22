type VideoProps = {
  src: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
};

export function Video(props: VideoProps) {
  return <video {...props} muted></video>;
}

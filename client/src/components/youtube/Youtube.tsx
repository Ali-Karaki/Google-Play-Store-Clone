import React from "react";

interface YoutubeProps {
  link: string;
}

const Youtube = ({ link }: YoutubeProps) => (
  <div>
    <iframe
      width="853"
      height="480"
      src={link}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export default Youtube;
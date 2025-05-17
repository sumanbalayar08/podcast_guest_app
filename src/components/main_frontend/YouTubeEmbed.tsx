
import { useState } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
}

const YouTubeEmbed = ({ videoId, title, className = "" }: YouTubeEmbedProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden rounded-lg shadow-lg ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-podcast-dark">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-podcast-primary/30"></div>
            <div className="mt-4 h-4 w-24 bg-podcast-muted/30 rounded"></div>
          </div>
        </div>
      )}
      <iframe 
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title={title || "YouTube video player"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full aspect-video"
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;

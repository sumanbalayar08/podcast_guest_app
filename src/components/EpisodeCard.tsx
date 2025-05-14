import React from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

type Episode = {
  id: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  image: string;
  videoId: string;
};

const EpisodeCard = ({ episode }: { episode: Episode }) => {
  return (
    <div className="bg-white/5 rounded-xl overflow-hidden transition-shadow duration-300 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2 aspect-video">
        <iframe
          className="rounded-lg w-full h-full"
          src={`https://www.youtube.com/embed/${episode.videoId}`}
          title={episode.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <div>
          <h3 className="text-white text-2xl font-semibold mb-2">
            {episode.title}
          </h3>
          <p className="text-podcast-muted text-sm mb-4">
            {episode.description}
          </p>
          <div className="text-sm text-podcast-muted flex gap-4 mb-6">
            <span>{episode.date}</span>
            <span>{episode.duration}</span>
          </div>
        </div>

        <div>
          <Button
            variant="outline"
            className="text-podcast-primary border-podcast-primary hover:bg-podcast-primary/10"
            asChild
          >
            <a
              href={`https://www.youtube.com/watch?v=${episode.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Watch on YouTube
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;

"use client";
import { useState } from "react";
import EpisodeCard from "@/components/main_frontend/EpisodeCard";
import { Search } from "lucide-react";
import { featuredEpisodes, recentEpisodes } from "@/app/data/episodes";
import { Button } from "@/components/ui/button";

const Episodes = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const allEpisodes = [...featuredEpisodes, ...recentEpisodes].filter(
    (ep) => ep.videoId
  );

  const filteredEpisodes = allEpisodes.filter(
    (episode) =>
      episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      episode.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-800">
      <section className="pt-28 pb-10">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            All Episodes
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            Watch conversations with thought leaders and experts across
            technology, mindfulness, and performance.
          </p>

          <div className="mt-8 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search episodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800/30 border border-white/10 rounded-full px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 pl-12"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl font-medium text-white">
              {searchQuery
                ? `Search Results: ${filteredEpisodes.length} episodes`
                : "All Video Episodes"}
            </h2>
          </div>

          {filteredEpisodes.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                No video episodes found matching "{searchQuery}"
              </p>
              <Button
                onClick={() => setSearchQuery("")}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="grid gap-8">
              {filteredEpisodes.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Episodes;

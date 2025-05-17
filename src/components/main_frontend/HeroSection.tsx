import { podcastInfo } from "@/app/data/episodes";
import { Headphones, Play } from "lucide-react";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen py-32 flex items-center overflow-hidden bg-gradient-to-b from-cyan-900 via-indigo-900 to-gray-950">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Audio wave animation */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-1 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`w-1 bg-indigo-600 rounded-full animate-wave-${
              (i % 4) + 1
            }`}
            style={{
              height: `${20 + Math.random() * 40}px`,
              animationDelay: `${i * 0.1}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <img
              src="/wfts.png"
              alt="Podcast Logo"
              className="w-10 h-10 mr-2"
            />{" "}
            <h2 className="text-md text-white font-semibold font-serif">
              {podcastInfo.name}
            </h2>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {podcastInfo.tagline}
          </h1>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {podcastInfo.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center gap-2 text-lg py-6 px-8">
              <Play className="w-5 h-5" /> Listen Latest Episode
            </Button>
            <Button
              variant="outline"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-600/10 rounded-full text-lg py-6 px-8"
            >
              <a href="/episodes">View All Episodes</a>{" "}
            </Button>
          </div>

          <div className="mt-16 flex flex-wrap justify-center items-center gap-8">
            <p className="text-gray-500 font-medium">Available on:</p>
            <div className="flex flex-wrap justify-center gap-8">
              {Object.entries(podcastInfo.socialLinks).map(
                ([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    className="text-gray-500 hover:text-indigo-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

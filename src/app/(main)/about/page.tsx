import { Headphones, Play, Users, Award, Radio } from "lucide-react";
import { podcastInfo } from "@/app/data/episodes";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-800 items-center text-center grid grid-cols-1 gap-25">
      <section className="pt-28 relative overflow-hidden w-full">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-40 -right-20 w-80 h-80 bg-indigo-600/10 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              About Our Podcast
            </h1>
            <p className="text-xl text-gray-300/80 mb-8 leading-relaxed">
              {podcastInfo.description}
            </p>
            <div className="flex justify-center">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2">
                <Play className="w-4 h-4" /> Listen Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-800/70 relative w-full">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <img
                src={podcastInfo.hostImage}
                alt={podcastInfo.hostName}
                className="w-full max-w-xs sm:max-w-md rounded-xl border-4 border-indigo-600/30 object-cover shadow-2xl"
              />
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-3xl font-serif font-bold text-white mb-4">
                Meet Your Host
              </h2>
              <h3 className="text-2xl font-medium text-white mb-2">
                {podcastInfo.hostName}
              </h3>
              <p className="text-gray-400 mb-6">Host & Creator</p>
              <p className="text-lg text-gray-300/80 mb-8 leading-relaxed">
                {podcastInfo.hostBio}
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button
                  variant="outline"
                  className="border-indigo-600/50 text-indigo-600 hover:bg-indigo-600/10"
                >
                  Follow on Twitter
                </Button>
                <Button
                  variant="outline"
                  className="border-indigo-600/50 text-indigo-600 hover:bg-indigo-600/10"
                >
                  LinkedIn Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Listen */}
      <section className="w-full">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              Why Listen to Mindful Bytes
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join thousands of listeners who tune in every week to expand their
              perspective and deepen their understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
            {[
              {
                icon: <Users className="w-6 h-6 text-indigo-600" />,
                title: "Expert Guests",
                desc: "We bring you conversations with leading thinkers, innovators, and practitioners across various disciplines.",
              },
              {
                icon: <Award className="w-6 h-6 text-indigo-600" />,
                title: "Research-Backed",
                desc: "Our episodes are grounded in the latest research and evidence-based practices in technology and psychology.",
              },
              {
                icon: <Radio className="w-6 h-6 text-indigo-600" />,
                title: "Actionable Insights",
                desc: "Each episode provides practical strategies and tools you can apply in your personal and professional life.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-white/5 text-center"
              >
                <div className="inline-flex items-center justify-center p-3 bg-indigo-600/10 rounded-full mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-300/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

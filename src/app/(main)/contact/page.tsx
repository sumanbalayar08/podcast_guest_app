"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Contact = () => {
  return (
    <section className="relative min-h-screen py-32 flex items-center overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Have questions or suggestions for the podcast? Want to be a guest?
              We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white/5 p-6 sm:p-8 rounded-xl border border-white/10 space-y-6">
                <h2 className="text-2xl font-semibold text-white">
                  Contact Information
                </h2>
                {[
                  {
                    icon: <Mail className="w-5 h-5 text-indigo-500" />,
                    label: "Email Us",
                    value: "contact@example.com",
                    note: "We usually respond within 24 hours",
                  },
                  {
                    icon: <Phone className="w-5 h-5 text-indigo-500" />,
                    label: "Call Us",
                    value: "+1 (555) 123-4567",
                    note: "Monday-Friday, 9am-5pm EST",
                  },
                  {
                    icon: <MapPin className="w-5 h-5 text-indigo-500" />,
                    label: "Studio Location",
                    value: "123 Podcast Ave, San Francisco, CA 94107",
                    note: "By appointment only",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="bg-indigo-600/10 p-3 rounded-full">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{item.label}</h3>
                      <p className="text-gray-300">{item.value}</p>
                      <p className="text-sm text-gray-400 mt-1">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 p-6 sm:p-8 rounded-xl border border-white/10">
                <h3 className="text-xl font-medium text-white mb-4">
                  Be a Guest on Our Show
                </h3>
                <p className="text-gray-300 mb-4">
                  Have expertise in technology, psychology or personal
                  development? We're always looking for interesting guests to
                  feature.
                </p>
                <Link href="/respondent">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg px-6 py-4 cursor-pointer">
                    Apply to be a Guest
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white/5 p-6 sm:p-8 rounded-xl border border-white/10 text-center text-gray-400 flex items-center justify-center">
              <p>Contact form will go here in future.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

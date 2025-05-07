import React from "react";

const AboutUs = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-gray-800 mt-10">
      <h1 className="text-3xl font-bold mb-4 text-[#3f1063]">About UdyamAI</h1>
      <p className="mb-4">
        <strong>UdyamAI</strong> is an initiative dedicated to nurturing innovation and entrepreneurship among students, startups, and early-stage ventures. We aim to bridge the gap between ideas and execution by providing a collaborative environment, access to resources, and a network of industry experts.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2 text-[#ed71c4]">Our Schemes & Support</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Startup Mentorship:</strong> Get personalized guidance from industry mentors, technologists, and domain experts.
        </li>
        <li>
          <strong>Workspace Facilities:</strong> Access modern coworking spaces, high-speed internet, and conference rooms tailored for startups.
        </li>
        <li>
          <strong>Incubation Support:</strong> Selected startups are provided incubation support including seed funding, prototyping aid, and business development.
        </li>
        <li>
          <strong>Events & Hackathons:</strong> Participate in entrepreneurship events, coding competitions, and workshops organized throughout the year.
        </li>
        <li>
          <strong>Networking Opportunities:</strong> Connect with investors, entrepreneurs, and ecosystem enablers via our networking events.
        </li>
      </ul>
      <p className="mt-4">
        At UdyamAI, we believe in empowering youth with tools, training, and a community that inspires growth, problem-solving, and impact-driven innovation.
      </p>
    </div>
  );
};

export default AboutUs;

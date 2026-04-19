'use client';

import AboutStory from './AboutStory';
import AboutMission from './AboutMission';
import AboutValues from './AboutValues';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <AboutStory />
      <AboutMission />
      <AboutValues />
    </div>
  );
}
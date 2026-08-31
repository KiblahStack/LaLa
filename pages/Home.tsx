import React from 'react';
import { HeroSlider } from '../components/HeroSlider';
import { QuickActions } from '../components/QuickActions';
import { WhyLala } from '../components/WhyLala';
import { FeaturedProperties } from '../components/FeaturedProperties';
import { RecentRequests } from '../components/RecentRequests';
import { PwaPromo } from '../components/PwaPromo';
import { HowItWorks } from '../components/HowItWorks';

export function Home() {
  return (
    <>
      <HeroSlider />
      <QuickActions />
      <WhyLala />
      <FeaturedProperties />
      <RecentRequests />
      <PwaPromo />
      <HowItWorks />
    </>);

}
import React from 'react';
import { CarouselSection } from './CarouselSection';
import { PropertyCard } from './PropertyCard';
import { useData } from '../context/DataContext';

export function FeaturedProperties() {
  const { listings } = useData();
  const featuredListings = listings.
  filter((l) => l.status === 'Available').
  sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))).
  slice(0, 6);

  return (
    <CarouselSection
      title="Featured Properties"
      viewAllLabel="View all properties"
      viewAllTo="/find">
      
      {featuredListings.map((listing) =>
      <PropertyCard key={listing.id} listing={listing} layout="carousel" />
      )}
    </CarouselSection>);

}
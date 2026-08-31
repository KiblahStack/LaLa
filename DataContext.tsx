import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  listings as seedListings,
  rentalRequests as seedRequests,
  type Listing,
  type RentalRequest } from
'../data/homeData';

export type ListingDraft = Omit<
  Listing,
  'id' | 'landlordId' | 'landlordName' | 'landlordWhatsapp' | 'postedAt' | 'featured'>;


export type RequestDraft = Omit<
  RentalRequest,
  'id' | 'tenantName' | 'tenantWhatsapp' | 'featured' | 'found'>;


export type Enquiry = {
  id: string;
  listingId: string;
  tenantName: string;
  message: string;
  at: string;
};

type Owner = {id: string;name: string;whatsapp: string;};

type DataContextValue = {
  listings: Listing[];
  requests: RentalRequest[];
  enquiries: Enquiry[];
  foundRequestIds: string[];
  addListing: (draft: ListingDraft, owner: Owner) => string;
  updateListing: (id: string, draft: ListingDraft) => void;
  deleteListing: (id: string) => void;
  setListingStatus: (id: string, status: Listing['status']) => void;
  addRequest: (draft: RequestDraft, owner: Owner) => string;
  markRequestFound: (id: string) => void;
  deleteRequest: (id: string) => void;
};

const DataContext = createContext<DataContextValue | null>(null);

const seedEnquiries: Enquiry[] = [
{
  id: 'e1',
  listingId: 'p1',
  tenantName: 'Lukas M.',
  message: 'Revealed your contact details and asked about a viewing this Saturday.',
  at: '2 hours ago'
},
{
  id: 'e2',
  listingId: 'p1',
  tenantName: 'Chantel S.',
  message: 'Asked whether water and electricity are included in the rent.',
  at: 'Yesterday'
},
{
  id: 'e3',
  listingId: 'p3',
  tenantName: 'Dion & Aletta',
  message: 'Connected via WhatsApp about the bachelor flat.',
  at: '3 days ago'
}];


export function DataProvider({ children }: {children: React.ReactNode;}) {
  const [listings, setListings] = useState<Listing[]>(seedListings);
  const [requests, setRequests] = useState<RentalRequest[]>(seedRequests);
  const [enquiries] = useState<Enquiry[]>(seedEnquiries);
  const [foundRequestIds, setFoundRequestIds] = useState<string[]>([]);

  const addListing = useCallback<DataContextValue['addListing']>((draft, owner) => {
    const id = `p-${Date.now()}`;
    setListings((prev) => [
    {
      ...draft,
      id,
      landlordId: owner.id,
      landlordName: owner.name,
      landlordWhatsapp: owner.whatsapp,
      postedAt: 'Just now'
    },
    ...prev]
    );
    return id;
  }, []);

  const updateListing = useCallback<DataContextValue['updateListing']>((id, draft) => {
    setListings((prev) => prev.map((l) => l.id === id ? { ...l, ...draft } : l));
  }, []);

  const deleteListing = useCallback((id: string) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const setListingStatus = useCallback<DataContextValue['setListingStatus']>((id, status) => {
    setListings((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
  }, []);

  const addRequest = useCallback<DataContextValue['addRequest']>((draft, owner) => {
    const id = `r-${Date.now()}`;
    setRequests((prev) => [
    {
      ...draft,
      id,
      tenantName: owner.name,
      tenantWhatsapp: owner.whatsapp
    },
    ...prev]
    );
    return id;
  }, []);

  const markRequestFound = useCallback((id: string) => {
    setFoundRequestIds((prev) => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  const deleteRequest = useCallback((id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      listings,
      requests,
      enquiries,
      foundRequestIds,
      addListing,
      updateListing,
      deleteListing,
      setListingStatus,
      addRequest,
      markRequestFound,
      deleteRequest
    }),
    [
    listings,
    requests,
    enquiries,
    foundRequestIds,
    addListing,
    updateListing,
    deleteListing,
    setListingStatus,
    addRequest,
    markRequestFound,
    deleteRequest]

  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used inside a DataProvider');
  return ctx;
}
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { connectPackages, type ConnectPackage } from '../data/homeData';

type ConnectState = {
  credits: number;
  packageName: string | null;
  expiresInDays: number | null;
  /** Landlord ids this tenant has already connected with — a credit is never charged twice for the same pair. */
  connectedLandlordIds: string[];
  favourites: string[];
};

type ConnectContextValue = ConnectState & {
  hasConnected: (landlordId: string) => boolean;
  /** Returns 'unlocked' (already paired, free), 'charged' (a credit was used) or 'no-credits'. */
  connect: (landlordId: string) => 'unlocked' | 'charged' | 'no-credits';
  purchase: (pkg: ConnectPackage) => void;
  toggleFavourite: (listingId: string) => void;
  isFavourite: (listingId: string) => boolean;
};

const ConnectContext = createContext<ConnectContextValue | null>(null);

export function ConnectProvider({ children }: {children: React.ReactNode;}) {
  const [state, setState] = useState<ConnectState>({
    credits: 4,
    packageName: connectPackages[0].name,
    expiresInDays: 26,
    connectedLandlordIds: ['l3'],
    favourites: ['p2']
  });

  const hasConnected = useCallback(
    (landlordId: string) => state.connectedLandlordIds.includes(landlordId),
    [state.connectedLandlordIds]
  );

  const connect = useCallback<ConnectContextValue['connect']>(
    (landlordId) => {
      if (state.connectedLandlordIds.includes(landlordId)) return 'unlocked';
      if (state.credits < 1) return 'no-credits';
      setState((prev) => ({
        ...prev,
        credits: prev.credits - 1,
        connectedLandlordIds: [...prev.connectedLandlordIds, landlordId]
      }));
      return 'charged';
    },
    [state.connectedLandlordIds, state.credits]
  );

  const purchase = useCallback((pkg: ConnectPackage) => {
    setState((prev) => ({
      ...prev,
      credits: prev.credits + pkg.connections,
      packageName: pkg.name,
      expiresInDays: pkg.validDays
    }));
  }, []);

  const toggleFavourite = useCallback((listingId: string) => {
    setState((prev) => ({
      ...prev,
      favourites: prev.favourites.includes(listingId) ?
      prev.favourites.filter((id) => id !== listingId) :
      [...prev.favourites, listingId]
    }));
  }, []);

  const isFavourite = useCallback(
    (listingId: string) => state.favourites.includes(listingId),
    [state.favourites]
  );

  const value = useMemo(
    () => ({ ...state, hasConnected, connect, purchase, toggleFavourite, isFavourite }),
    [state, hasConnected, connect, purchase, toggleFavourite, isFavourite]
  );

  return <ConnectContext.Provider value={value}>{children}</ConnectContext.Provider>;
}

export function useConnect() {
  const ctx = useContext(ConnectContext);
  if (!ctx) throw new Error('useConnect must be used inside a ConnectProvider');
  return ctx;
}
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useScreenInit } from './useScreenInit.js';
import { AuthProvider, type Role } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ConnectProvider } from './context/ConnectContext';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { Home } from './pages/Home';
import { FindAccommodation } from './pages/FindAccommodation';
import { PropertyDetail } from './pages/PropertyDetail';
import { Pricing } from './pages/Pricing';
import { Requests } from './pages/Requests';
import { RequestDetail } from './pages/RequestDetail';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PostRequest } from './pages/PostRequest';
import { ListingForm } from './pages/ListingForm';
import { TenantDashboard } from './pages/TenantDashboard';
import { LandlordDashboard } from './pages/LandlordDashboard';

export function App() {
  const screenInit = useScreenInit();

  return (
    <AuthProvider initialRole={screenInit?.role as Role | undefined}>
      <DataProvider>
        <ConnectProvider>
          <BrowserRouter>
            <div id="top" className="flex min-h-screen w-full flex-col bg-white">
              <SiteHeader />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/find" element={<FindAccommodation />} />
                  <Route path="/property/:id" element={<PropertyDetail />} />
                  <Route path="/requests" element={<Requests />} />
                  <Route path="/request/:id" element={<RequestDetail />} />
                  <Route path="/post-request" element={<PostRequest />} />
                  <Route path="/listing/new" element={<ListingForm />} />
                  <Route path="/listing/:id/edit" element={<ListingForm />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<TenantDashboard />} />
                  <Route path="/landlord" element={<LandlordDashboard />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </main>
              <SiteFooter />
            </div>
          </BrowserRouter>
        </ConnectProvider>
      </DataProvider>
    </AuthProvider>);

}
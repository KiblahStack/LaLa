import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CheckIcon, ImagePlusIcon, InfoIcon, XIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import {
  Field,
  GhostButton,
  PrimaryButton,
  SelectInput,
  TextArea,
  TextInput } from
'../components/FormControls';
import { propertyTypes, suburbsByTown, towns } from '../data/homeData';
import { useAuth } from '../context/AuthContext';
import { useData, type ListingDraft } from '../context/DataContext';

const PHOTO_LIBRARY = ["/a72c03fb-83a2-4437-bb30-f638accc4391.jpg", "/96431970-b1d4-4f05-8044-0f7744c025d2.jpg", "/ee0a1848-774f-4593-8fb0-fe8e87cba571.jpg", "/2e7e65af-d815-47a7-bd11-9dddfde3ea73.jpg", "/6b5b1eda-085c-4bc5-a237-c121c4f38d38.jpg"];







export function ListingForm() {
  const { id } = useParams<{id: string;}>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { listings, addListing, updateListing } = useData();
  const editing = listings.find((l) => l.id === id);

  const [form, setForm] = useState({
    title: '',
    type: 'Apartment',
    town: 'Windhoek',
    suburb: '',
    bedrooms: '2',
    bathrooms: '1',
    parking: '1',
    rent: '',
    deposit: '',
    description: '',
    status: 'Available' as 'Available' | 'Occupied',
    whatsapp: user?.whatsapp ?? '',
    images: [PHOTO_LIBRARY[0]] as string[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!editing) return;
    setForm({
      title: editing.title,
      type: editing.type,
      town: editing.town,
      suburb: editing.suburb,
      bedrooms: String(editing.bedrooms),
      bathrooms: String(editing.bathrooms),
      parking: String(editing.parking),
      rent: String(editing.rent),
      deposit: String(editing.deposit),
      description: editing.description,
      status: editing.status,
      whatsapp: editing.landlordWhatsapp,
      images: editing.images
    });
  }, [editing]);

  const suburbOptions = useMemo(
    () => suburbsByTown[form.town] ?? [],
    [form.town]
  );

  const set = <K extends keyof typeof form,>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key as string]: '' }));
  };

  const toggleImage = (url: string) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.includes(url) ?
      prev.images.filter((i) => i !== url) :
      [...prev.images, url]
    }));
    setErrors((prev) => ({ ...prev, images: '' }));
  };

  if (!user || user.role !== 'landlord') {
    return (
      <>
        <PageHeader
          title="Advertise your property"
          description="Free registration, free listings, unlimited photos." />
        
        <div className="mx-auto w-full max-w-md px-4 py-16 text-center">
          <p className="text-[13px] text-slate-600">
            Log in with a landlord account to create a listing. Advertising on Lala is always free.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Link
              to="/register"
              className="rounded-lg bg-brand-orange px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#dd551a]">
              
              Register as landlord
            </Link>
            <Link
              to="/login"
              className="rounded-lg border border-slate-200 px-5 py-2.5 text-[13px] font-semibold text-brand-navy hover:bg-slate-50">
              
              Log in
            </Link>
          </div>
        </div>
      </>);

  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.title.trim().length < 5) next.title = 'Give the listing a clear title.';
    if (!form.suburb) next.suburb = 'Select a suburb.';
    if (!form.rent || Number(form.rent) <= 0) next.rent = 'Enter the monthly rent.';
    if (!form.deposit) next.deposit = 'Enter the deposit amount.';
    if (form.description.trim().length < 30)
    next.description = 'Describe the property in at least 30 characters.';
    if (!/^\+?[0-9 ]{9,}$/.test(form.whatsapp.trim()))
    next.whatsapp = 'Enter a valid WhatsApp number.';
    if (form.images.length === 0) next.images = 'Add at least one photo.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const draft: ListingDraft = {
      title: form.title.trim(),
      type: form.type,
      town: form.town,
      suburb: form.suburb,
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      parking: Number(form.parking),
      rent: Number(form.rent),
      deposit: Number(form.deposit),
      description: form.description.trim(),
      status: form.status,
      images: form.images
    };

    if (editing) updateListing(editing.id, draft);else

    addListing(draft, {
      id: user.id,
      name: user.name,
      whatsapp: form.whatsapp.trim()
    });

    navigate('/landlord');
  };

  return (
    <>
      <PageHeader
        title={editing ? 'Edit listing' : 'Create a listing'}
        description="Advertising is free for landlords — unlimited listings, no commission." />
      
      <div className="w-full bg-brand-canvas py-10">
        <form onSubmit={submit} className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8" noValidate>
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
            <h2 className="text-sm font-bold text-brand-navy">Property details</h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Listing title" htmlFor="l-title" required error={errors.title}>
                  <TextInput
                    id="l-title"
                    value={form.title}
                    placeholder="2 Bedroom Apartment in Kleine Kuppe"
                    onChange={(e) => set('title', e.target.value)} />
                  
                </Field>
              </div>

              <Field label="Property type" htmlFor="l-type" required>
                <SelectInput
                  id="l-type"
                  value={form.type}
                  options={propertyTypes.filter((t) => t !== 'All Types')}
                  onChange={(e) => set('type', e.target.value)} />
                
              </Field>
              <Field label="Availability" htmlFor="l-status" required>
                <SelectInput
                  id="l-status"
                  value={form.status}
                  options={['Available', 'Occupied']}
                  onChange={(e) => set('status', e.target.value as 'Available' | 'Occupied')} />
                
              </Field>
              <Field label="Town" htmlFor="l-town" required>
                <SelectInput
                  id="l-town"
                  value={form.town}
                  options={towns.filter((t) => t !== 'All Areas')}
                  onChange={(e) => {
                    set('town', e.target.value);
                    set('suburb', '');
                  }} />
                
              </Field>
              <Field label="Suburb" htmlFor="l-suburb" required error={errors.suburb}>
                <SelectInput
                  id="l-suburb"
                  value={form.suburb}
                  options={['', ...suburbOptions]}
                  onChange={(e) => set('suburb', e.target.value)} />
                
              </Field>

              <Field label="Bedrooms" htmlFor="l-bed" required>
                <SelectInput
                  id="l-bed"
                  value={form.bedrooms}
                  options={['1', '2', '3', '4', '5']}
                  onChange={(e) => set('bedrooms', e.target.value)} />
                
              </Field>
              <Field label="Bathrooms" htmlFor="l-bath" required>
                <SelectInput
                  id="l-bath"
                  value={form.bathrooms}
                  options={['1', '2', '3', '4']}
                  onChange={(e) => set('bathrooms', e.target.value)} />
                
              </Field>
              <Field label="Parking bays" htmlFor="l-park" required>
                <SelectInput
                  id="l-park"
                  value={form.parking}
                  options={['0', '1', '2', '3']}
                  onChange={(e) => set('parking', e.target.value)} />
                
              </Field>
              <Field
                label="WhatsApp number"
                htmlFor="l-whatsapp"
                required
                error={errors.whatsapp}
                hint="Hidden until a tenant uses a connect credit.">
                
                <TextInput
                  id="l-whatsapp"
                  inputMode="tel"
                  value={form.whatsapp}
                  placeholder="+264 81 123 4567"
                  onChange={(e) => set('whatsapp', e.target.value)} />
                
              </Field>
              <Field label="Monthly rent (N$)" htmlFor="l-rent" required error={errors.rent}>
                <TextInput
                  id="l-rent"
                  inputMode="numeric"
                  value={form.rent}
                  placeholder="7500"
                  onChange={(e) => set('rent', e.target.value.replace(/[^0-9]/g, ''))} />
                
              </Field>
              <Field label="Deposit (N$)" htmlFor="l-deposit" required error={errors.deposit}>
                <TextInput
                  id="l-deposit"
                  inputMode="numeric"
                  value={form.deposit}
                  placeholder="7500"
                  onChange={(e) => set('deposit', e.target.value.replace(/[^0-9]/g, ''))} />
                
              </Field>
            </div>

            <div className="mt-4">
              <Field
                label="Description"
                htmlFor="l-description"
                required
                error={errors.description}
                hint="Mention what is included, security, prepaid meters, pets and lease terms.">
                
                <TextArea
                  id="l-description"
                  rows={5}
                  value={form.description}
                  placeholder="Bright two bedroom apartment in a secure complex..."
                  onChange={(e) => set('description', e.target.value)} />
                
              </Field>
            </div>

            <fieldset className="mt-6">
              <legend className="text-[12px] font-semibold text-brand-navy">
                Photos<span className="ml-0.5 text-brand-orange">*</span>
              </legend>
              <p className="mt-1 text-[11px] text-slate-400">
                Select the photos to publish. The first selected photo becomes the cover image.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {PHOTO_LIBRARY.map((url) => {
                  const selected = form.images.includes(url);
                  return (
                    <button
                      key={url}
                      type="button"
                      onClick={() => toggleImage(url)}
                      aria-pressed={selected}
                      className={`relative h-24 overflow-hidden rounded-xl ring-2 transition-all ${
                      selected ? 'ring-brand-orange' : 'ring-slate-200 hover:ring-slate-300'}`
                      }>
                      
                      <img src={url} alt="" className="h-full w-full object-cover" />
                      <span
                        className={`absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-white ${
                        selected ? 'bg-brand-orange' : 'bg-black/40'}`
                        }>
                        
                        {selected ? <CheckIcon className="h-3.5 w-3.5" /> : <ImagePlusIcon className="h-3.5 w-3.5" />}
                      </span>
                    </button>);

                })}
              </div>
              {errors.images &&
              <p role="alert" className="mt-2 text-[11px] font-medium text-brand-orange">
                  {errors.images}
                </p>
              }
              {form.images.length > 0 &&
              <ul className="mt-3 flex flex-wrap gap-2">
                  {form.images.map((url, i) =>
                <li
                  key={url}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-blueSoft px-3 py-1 text-[11px] font-semibold text-brand-navy">
                  
                      {i === 0 ? 'Cover photo' : `Photo ${i + 1}`}
                      <button
                    type="button"
                    onClick={() => toggleImage(url)}
                    aria-label={`Remove photo ${i + 1}`}
                    className="text-slate-400 hover:text-brand-orange">
                    
                        <XIcon className="h-3 w-3" />
                      </button>
                    </li>
                )}
                </ul>
              }
            </fieldset>

            <p className="mt-6 flex items-start gap-2 rounded-xl bg-brand-blueSoft px-4 py-3 text-[12px] leading-relaxed text-brand-navy">
              <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
              Listings are reviewed before they appear in search. You will be notified once approved.
            </p>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <GhostButton type="button" onClick={() => navigate('/landlord')}>
                Cancel
              </GhostButton>
              <PrimaryButton type="submit">
                {editing ? 'Save changes' : 'Publish listing'}
              </PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </>);

}
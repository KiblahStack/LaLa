import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InfoIcon } from 'lucide-react';
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
import { useData } from '../context/DataContext';

export function PostRequest() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addRequest } = useData();

  const [form, setForm] = useState({
    propertyType: 'Apartment',
    budget: '',
    town: 'Windhoek',
    area: '',
    moveDate: '',
    description: '',
    whatsapp: user?.whatsapp ?? ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const suburbOptions = useMemo(
    () => ['Any Area', ...(suburbsByTown[form.town] ?? [])],
    [form.town]
  );

  const set = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  if (!user) {
    return (
      <>
        <PageHeader
          title="Post a rental request"
          description="Tell landlords what you need and let them come to you." />
        
        <div className="mx-auto w-full max-w-md px-4 py-16 text-center">
          <p className="text-[13px] text-slate-600">
            You need an account before posting a request. Registration is free.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Link
              to="/register"
              className="rounded-lg bg-brand-orange px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#dd551a]">
              
              Create account
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
    if (!form.budget || Number(form.budget) <= 0) next.budget = 'Enter your monthly budget.';
    if (!form.moveDate) next.moveDate = 'When do you want to move in?';
    if (form.description.trim().length < 20)
    next.description = 'Add a bit more detail — at least 20 characters.';
    if (!/^\+?[0-9 ]{9,}$/.test(form.whatsapp.trim()))
    next.whatsapp = 'Enter a valid WhatsApp number.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    addRequest(
      {
        propertyType: form.propertyType,
        budget: Number(form.budget),
        town: form.town,
        area: form.area || 'Any Area',
        moveDate: new Date(form.moveDate).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        description: form.description.trim()
      },
      { id: user.id, name: user.name, whatsapp: form.whatsapp.trim() }
    );
    navigate('/dashboard');
  };

  return (
    <>
      <PageHeader
        title="Post a rental request"
        description="Tell landlords what you are looking for. Posting a request is included in your connect package." />
      
      <div className="w-full bg-brand-canvas py-10">
        <form
          onSubmit={submit}
          className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-8"
          noValidate>
          
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
            <h2 className="text-sm font-bold text-brand-navy">What are you looking for?</h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Property type" htmlFor="req-type" required>
                <SelectInput
                  id="req-type"
                  value={form.propertyType}
                  options={propertyTypes.filter((t) => t !== 'All Types')}
                  onChange={(e) => set('propertyType', e.target.value)} />
                
              </Field>
              <Field
                label="Monthly budget (N$)"
                htmlFor="req-budget"
                required
                error={errors.budget}>
                
                <TextInput
                  id="req-budget"
                  inputMode="numeric"
                  value={form.budget}
                  placeholder="6500"
                  onChange={(e) => set('budget', e.target.value.replace(/[^0-9]/g, ''))} />
                
              </Field>
              <Field label="Town" htmlFor="req-town" required>
                <SelectInput
                  id="req-town"
                  value={form.town}
                  options={towns.filter((t) => t !== 'All Areas')}
                  onChange={(e) => {
                    set('town', e.target.value);
                    set('area', '');
                  }} />
                
              </Field>
              <Field label="Preferred suburb" htmlFor="req-area">
                <SelectInput
                  id="req-area"
                  value={form.area || 'Any Area'}
                  options={suburbOptions}
                  onChange={(e) => set('area', e.target.value)} />
                
              </Field>
              <Field label="Move-in date" htmlFor="req-date" required error={errors.moveDate}>
                <TextInput
                  id="req-date"
                  type="date"
                  value={form.moveDate}
                  onChange={(e) => set('moveDate', e.target.value)} />
                
              </Field>
              <Field
                label="WhatsApp number"
                htmlFor="req-whatsapp"
                required
                error={errors.whatsapp}>
                
                <TextInput
                  id="req-whatsapp"
                  inputMode="tel"
                  value={form.whatsapp}
                  placeholder="+264 81 123 4567"
                  onChange={(e) => set('whatsapp', e.target.value)} />
                
              </Field>
            </div>

            <div className="mt-4">
              <Field
                label="Description"
                htmlFor="req-description"
                required
                error={errors.description}
                hint="Mention household size, employment, pets and anything else a landlord should know.">
                
                <TextArea
                  id="req-description"
                  rows={5}
                  value={form.description}
                  placeholder="Working couple looking for a 2 bedroom flat in a secure complex..."
                  onChange={(e) => set('description', e.target.value)} />
                
              </Field>
            </div>

            <p className="mt-5 flex items-start gap-2 rounded-xl bg-brand-blueSoft px-4 py-3 text-[12px] leading-relaxed text-brand-navy">
              <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
              Landlords contact you for free. Your WhatsApp number is only shown on your request
              once it is published.
            </p>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <GhostButton type="button" onClick={() => navigate('/dashboard')}>
                Cancel
              </GhostButton>
              <PrimaryButton type="submit">Publish request</PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </>);

}
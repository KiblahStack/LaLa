import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon, UserIcon } from 'lucide-react';
import {
  Field,
  PrimaryButton,
  SelectInput,
  TextInput } from
'../components/FormControls';
import { LalaLogo } from '../components/LalaLogo';
import { useAuth, type Role } from '../context/AuthContext';
import { towns } from '../data/homeData';

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [role, setRole] = useState<Role>('tenant');
  const [form, setForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    town: 'Windhoek',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Tell us your name.';
    if (!form.email.trim()) next.email = 'We need an email for your account.';
    if (!/^\+?[0-9 ]{9,}$/.test(form.whatsapp.trim()))
    next.whatsapp = 'Enter a valid WhatsApp number, e.g. +264 81 123 4567.';
    if (form.password.length < 6) next.password = 'Use at least 6 characters.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    register({
      name: form.name.trim(),
      email: form.email.trim(),
      whatsapp: form.whatsapp.trim(),
      town: form.town,
      role
    });
    navigate(role === 'tenant' ? '/dashboard' : '/landlord');
  };

  return (
    <div className="flex w-full justify-center bg-brand-canvas px-4 py-14">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-card ring-1 ring-slate-100">
        <LalaLogo withTagline />
        <h1 className="mt-6 text-xl font-extrabold text-brand-navy">Create your free account</h1>
        <p className="mt-1.5 text-[13px] text-slate-500">
          Landlords advertise for free. Tenants browse free and only pay to connect.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2" role="group" aria-label="Account type">
          {(
          [
          { value: 'tenant', label: "I'm looking", Icon: UserIcon },
          { value: 'landlord', label: "I'm renting out", Icon: HomeIcon }] as
          const).
          map((option) =>
          <button
            key={option.value}
            type="button"
            onClick={() => setRole(option.value)}
            aria-pressed={role === option.value}
            className={`inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-[13px] font-semibold transition-colors ${
            role === option.value ?
            'border-brand-orange bg-brand-orangeSoft text-brand-orange' :
            'border-slate-200 text-brand-navy hover:bg-slate-50'}`
            }>
            
              <option.Icon className="h-4 w-4" />
              {option.label}
            </button>
          )}
        </div>

        <form onSubmit={submit} className="mt-5 space-y-4">
          <Field label="Full name" htmlFor="reg-name" required error={errors.name}>
            <TextInput
              id="reg-name"
              value={form.name}
              autoComplete="name"
              placeholder="Maria Shipanga"
              onChange={(e) => set('name', e.target.value)} />
            
          </Field>
          <Field label="Email address" htmlFor="reg-email" required error={errors.email}>
            <TextInput
              id="reg-email"
              type="email"
              autoComplete="email"
              value={form.email}
              placeholder="you@example.com"
              onChange={(e) => set('email', e.target.value)} />
            
          </Field>
          <Field
            label="WhatsApp number"
            htmlFor="reg-whatsapp"
            required
            error={errors.whatsapp}
            hint="This is how the other party reaches you — it is never shown until a connection is made.">
            
            <TextInput
              id="reg-whatsapp"
              inputMode="tel"
              value={form.whatsapp}
              placeholder="+264 81 123 4567"
              onChange={(e) => set('whatsapp', e.target.value)} />
            
          </Field>
          <Field label="Town" htmlFor="reg-town">
            <SelectInput
              id="reg-town"
              value={form.town}
              options={towns.filter((t) => t !== 'All Areas')}
              onChange={(e) => set('town', e.target.value)} />
            
          </Field>
          <Field label="Password" htmlFor="reg-password" required error={errors.password}>
            <TextInput
              id="reg-password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              placeholder="At least 6 characters"
              onChange={(e) => set('password', e.target.value)} />
            
          </Field>

          <PrimaryButton type="submit" className="w-full">
            Create account
          </PrimaryButton>
        </form>

        <p className="mt-5 text-center text-[12px] text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-brand-orange hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>);

}
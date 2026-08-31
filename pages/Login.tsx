import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon, UserIcon } from 'lucide-react';
import { Field, PrimaryButton, TextInput } from '../components/FormControls';
import { useAuth, type Role } from '../context/AuthContext';
import { LalaLogo } from '../components/LalaLogo';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState<Role>('tenant');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Enter your email and password to continue.');
      return;
    }
    login(email.trim(), role);
    navigate(role === 'tenant' ? '/dashboard' : '/landlord');
  };

  return (
    <div className="flex w-full justify-center bg-brand-canvas px-4 py-14">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-card ring-1 ring-slate-100">
        <LalaLogo withTagline />
        <h1 className="mt-6 text-xl font-extrabold text-brand-navy">Welcome back</h1>
        <p className="mt-1.5 text-[13px] text-slate-500">
          Log in to manage your listings, requests and connect credits.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2" role="group" aria-label="Account type">
          {(
          [
          { value: 'tenant', label: 'Tenant', Icon: UserIcon },
          { value: 'landlord', label: 'Landlord', Icon: HomeIcon }] as
          const).
          map((option) =>
          <button
            key={option.value}
            type="button"
            onClick={() => setRole(option.value)}
            aria-pressed={role === option.value}
            className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-[13px] font-semibold transition-colors ${
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
          <Field label="Email address" htmlFor="login-email" required error={error}>
            <TextInput
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }} />
            
          </Field>
          <Field label="Password" htmlFor="login-password" required>
            <TextInput
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }} />
            
          </Field>

          <PrimaryButton type="submit" className="w-full">
            Log in
          </PrimaryButton>
        </form>

        <p className="mt-5 text-center text-[12px] text-slate-500">
          New to Lala?{' '}
          <Link to="/register" className="font-semibold text-brand-orange hover:underline">
            Create a free account
          </Link>
        </p>
      </div>
    </div>);

}
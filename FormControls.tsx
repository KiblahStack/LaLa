import React from 'react';

const base =
'mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[13px] text-brand-navy placeholder:text-slate-400 focus:border-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40';

type FieldProps = {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
};

export function Field({ label, htmlFor, hint, error, required, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-[12px] font-semibold text-brand-navy">
        {label}
        {required && <span className="ml-0.5 text-brand-orange">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-[11px] text-slate-400">{hint}</p>}
      {error &&
      <p role="alert" className="mt-1 text-[11px] font-medium text-brand-orange">
          {error}
        </p>
      }
    </div>);

}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${base} ${props.className ?? ''}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${base} ${props.className ?? ''}`} />;
}

export function SelectInput({
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {options: string[];}) {
  return (
    <select {...props} className={`${base} cursor-pointer ${props.className ?? ''}`}>
      {options.map((o) =>
      <option key={o} value={o}>
          {o}
        </option>
      )}
    </select>);

}

export function PrimaryButton({
  children,
  tone = 'orange',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {tone?: 'orange' | 'navy';}) {
  return (
    <button
      {...props}
      className={`rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white transition-colors disabled:opacity-50 ${
      tone === 'orange' ?
      'bg-brand-orange hover:bg-[#dd551a]' :
      'bg-brand-navy hover:bg-brand-navyDark'} ${
      props.className ?? ''}`}>
      
      {children}
    </button>);

}

export function GhostButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-lg border border-slate-200 px-5 py-2.5 text-[13px] font-semibold text-brand-navy transition-colors hover:bg-slate-50 ${
      props.className ?? ''}`
      }>
      
      {children}
    </button>);

}
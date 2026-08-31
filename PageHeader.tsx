import React from 'react';

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="bg-brand-navy py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white sm:text-3xl">{title}</h1>
          {description &&
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">{description}</p>
          }
        </div>
        {children && <div className="flex shrink-0 flex-wrap gap-3">{children}</div>}
      </div>
    </div>);

}
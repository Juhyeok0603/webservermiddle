import React from 'react';
import Image from 'next/image';

type Props = {
  name: string;
  role?: string;
  email?: string;
  avatarSrc?: string;
};

export default function PortfolioHeader({ name, role, email, avatarSrc }: Props) {
  return (
    <header className="w-full max-w-4xl mx-auto flex items-center gap-6">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
        {avatarSrc ? (
          <Image src={avatarSrc} alt={`${name} avatar`} width={96} height={96} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xl text-gray-500">{name[0]}</div>
        )}
      </div>
      <div className="flex-1">
        <h1 className="text-2xl font-semibold">{name}</h1>
        {role && <p className="text-sm text-gray-600">{role}</p>}
  {email && <p className="text-sm mt-2 text-gray-700"><a href={`mailto:${email}`} className="underline">{email}</a></p>}
      </div>
    </header>
  );
}

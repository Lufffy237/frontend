import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  variant?: 'full' | 'icon' | 'compact';
  className?: string;
}

export function Logo({ variant = 'full', className = '' }: LogoProps) {
  if (variant === 'icon') {
    return (
      <Link href="/" className={`flex items-center ${className}`} aria-label="Ã‰lÃ©gance Pressing - Accueil">
        <div className="relative w-10 h-10">
          <Image
            src="/images/logo.png"
            alt="Ã‰lÃ©gance Pressing"
            fill
            className="object-contain"
            priority
          />
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href="/" className={`flex items-center gap-3 ${className}`} aria-label="Ã‰lÃ©gance Pressing - Accueil">
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="Ã‰lÃ©gance Pressing"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-secondary">
            ElÃ©gance <span className="text-primary">PRESSING</span>
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link href="/" className={`flex flex-col items-start ${className}`} aria-label="Ã‰lÃ©gance Pressing - Accueil">
      <div className="relative w-48 h-20 flex-shrink-0">
        <Image
          src="/images/logo.png"
          alt="Ã‰lÃ©gance Pressing - Propre c'est Ã©lÃ©gant"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}
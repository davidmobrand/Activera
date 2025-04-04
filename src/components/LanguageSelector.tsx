'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Button } from './ui/Button';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={language === 'en' ? 'primary' : 'outline'}
        onClick={() => setLanguage('en')}
        className="w-12"
      >
        EN
      </Button>
      <Button
        variant={language === 'sv' ? 'primary' : 'outline'}
        onClick={() => setLanguage('sv')}
        className="w-12"
      >
        SV
      </Button>
    </div>
  );
} 
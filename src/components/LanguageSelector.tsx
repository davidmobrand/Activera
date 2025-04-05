'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Button } from './ui/Button';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant={language === 'en' ? 'secondary' : 'outline'}
        onClick={() => setLanguage('en')}
      >
        EN
      </Button>
      <Button
        size="sm"
        variant={language === 'sv' ? 'secondary' : 'outline'}
        onClick={() => setLanguage('sv')}
      >
        SV
      </Button>
    </div>
  );
} 
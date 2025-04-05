'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Button } from './ui/Button';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        onClick={() => setLanguage('en')}
        className={`border-mindful-200 text-mindful-700 hover:bg-mindful-50 ${
          language === 'en' ? 'bg-mindful-50' : ''
        }`}
      >
        EN
      </Button>
      <Button
        size="sm"
        onClick={() => setLanguage('sv')}
        className={`border-mindful-200 text-mindful-700 hover:bg-mindful-50 ${
          language === 'sv' ? 'bg-mindful-50' : ''
        }`}
      >
        SV
      </Button>
    </div>
  );
} 
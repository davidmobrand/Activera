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
        className={`${
          language === 'en' 
            ? 'bg-mindful-100 text-mindful-700' 
            : 'bg-white/80 text-mindful-600 hover:bg-mindful-50'
        } border border-mindful-200`}
      >
        EN
      </Button>
      <Button
        size="sm"
        onClick={() => setLanguage('sv')}
        className={`${
          language === 'sv'
            ? 'bg-mindful-100 text-mindful-700'
            : 'bg-white/80 text-mindful-600 hover:bg-mindful-50'
        } border border-mindful-200`}
      >
        SV
      </Button>
    </div>
  );
} 
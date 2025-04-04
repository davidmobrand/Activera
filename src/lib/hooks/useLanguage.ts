import { useCallback, useState } from 'react'

export type Language = 'en' | 'sv'

export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en')

  const toggleLanguage = useCallback(() => {
    setCurrentLanguage(prev => prev === 'en' ? 'sv' : 'en')
  }, [])

  return {
    currentLanguage,
    toggleLanguage,
  }
} 
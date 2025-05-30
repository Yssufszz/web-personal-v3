import React, { createContext, useContext, useState } from 'react'
import { translations } from '../locales'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')

  const t = (key) => {
    return translations[language][key] || key
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'id' : 'en')
  }

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
'use client'

import React, { useState } from 'react'

import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'
import { ThemeSwitcher } from '@/components/kibo-ui/theme-switcher'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState<'light' | 'dark' | 'auto' | undefined>(undefined)

  const onThemeChange = (themeToSet: 'light' | 'dark' | 'auto') => {
    if (themeToSet === 'auto') {
      setTheme(null)
      setValue('auto')
    } else {
      setTheme(themeToSet)
      setValue(themeToSet)
    }
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    if (preference === 'light' || preference === 'dark' || preference === 'auto') {
      setValue(preference)
    } else {
      setValue('auto')
    }
  }, [])

  return <ThemeSwitcher defaultValue="auto" onChange={onThemeChange} value={value} />
}

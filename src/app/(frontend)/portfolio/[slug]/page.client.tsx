'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

const PageClient: React.FC = () => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light') // или 'dark', в зависимости от дизайна
  }, [setHeaderTheme])

  return <React.Fragment />
}

export default PageClient

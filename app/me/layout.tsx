'use client'

import { redirect, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Page({ children }) {
  useEffect(() => {
    AOS.init()
  }, [])
  return <>{children}</>
}

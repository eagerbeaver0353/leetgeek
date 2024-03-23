'use client'

import { redirect, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    const defaultUser = localStorage.getItem('me')
    redirect(defaultUser == null ? '/' : `/me/${defaultUser}`)
  }, [])
  return <></>
}

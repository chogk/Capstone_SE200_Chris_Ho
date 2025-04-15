'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RedirectToPolicies() {
  const router = useRouter()

  useEffect(() => {
    router.push('../policies')
  }, [router])

  return null // or a spinner
}

'use client'

import { useEffect, useState } from 'react'
import Dashboard from '@/components/Dashboard'
import Loading from '@/components/Loading'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <main className="min-h-screen bg-geopolitical-dark">
      <Dashboard />
    </main>
  )
}

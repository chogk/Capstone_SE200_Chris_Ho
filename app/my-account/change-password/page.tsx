'use client'

import { useState } from 'react'
import { changePassword } from '../actions'

export default function ChangePasswordPage() {
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    try {
      await changePassword(formData)
      // auto-redirect to /login from server if success
    } catch (err: any) {
      setError(err?.message || 'Something went wrong')
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow space-y-4">
      <h1 className="text-xl font-bold text-black">Change Password</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-black mb-1">Current Password</label>
          <input type="password" name="currentPassword" required className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-black mb-1">New Password</label>
          <input type="password" name="newPassword" required className="w-full border p-2 rounded" />
        </div>

        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Change Password
        </button>

        {error && <p className="text-red-600 font-medium">{error}</p>}
      </form>
    </div>
  )
}

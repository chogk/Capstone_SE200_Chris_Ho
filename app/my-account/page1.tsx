'use client'

import { useState } from 'react'
import { uploadProfilePhoto, changePassword } from './actions'
import { useRouter } from 'next/navigation'

export default function MyAccountPage() {
  const [preview, setPreview] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await uploadProfilePhoto(formData)
    window.location.reload() // Refresh to update session
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h1 className="text-lg font-bold mb-4">Upload Profile Photo</h1>
      <input type="file" name="photo" accept="image/*" onChange={handleFileChange} className="mb-4" />
      {preview && <img src={preview} alt="Preview" className="w-32 h-32 rounded-full mb-4" />}
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">Upload</button>
    </form>
  )
}

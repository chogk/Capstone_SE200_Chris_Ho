'use client'

import { useState } from 'react'
import { uploadProfilePhoto, changePassword } from './actions'
import { useRouter } from 'next/navigation'

export default function MyAccountPage() {
  const [preview, setPreview] = useState<string | null>(null)
  const [photoMessage, setPhotoMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [passwordMessage, setPasswordMessage] = useState<string>('')
  const router = useRouter()

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  const handlePhotoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const res = await uploadProfilePhoto(formData)
  
    if (res.success) {
      setPhotoMessage({ text: res.message, type: 'success' })
  
      // ✅ Wait 2 seconds, then redirect
      await new Promise(resolve => setTimeout(resolve, 3000))
      //router.push('/dashboard')
      window.location.href = '/dashboard'
    } else {
      setPhotoMessage({ text: res.message, type: 'error' })
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      await changePassword(formData)
      // If successful, user is redirected automatically by the server action
    } catch (err: any) {
      setPasswordMessage(err?.message || 'Something went wrong')
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow space-y-8">
      <h1 className="text-xl font-bold text-black">My Account</h1>

      {/* --- Upload Profile Photo --- */}
      <form onSubmit={handlePhotoSubmit} className="space-y-4">
        <div>
          <label className="block text-black mb-3">Upload Profile Photo</label>
          <input type="file" name="photo" accept="image/*" onChange={handlePhotoChange} />
        </div>
        {preview && <img src={preview} alt="Preview" className="w-32 h-32 rounded-full" />}
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">Upload</button>

        {/* ✅ Upload feedback message */}
        {photoMessage && (
          <div className={`font-medium pt-2 ${photoMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {photoMessage.text}
          </div>
        )}
      </form>

      
    </div>
  )
}

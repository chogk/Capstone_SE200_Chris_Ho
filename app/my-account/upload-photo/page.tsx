'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { uploadProfilePhoto } from '../actions'
import { toast } from 'sonner'
import { useTransition } from 'react'

export default function UploadPhotoPage() {
  const [preview, setPreview] = useState<string | null>(null)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  //const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
  
    try {
      const res = await uploadProfilePhoto(formData)
  
      if (res.success) {
        toast.success('Profile image uploaded successfully!')
        
        // ✅ Wait 2s, then navigate
        await new Promise((resolve) => setTimeout(resolve, 2000))
       // router.push('/dashboard')
       // router.refresh()
       window.location.href = '/dashboard'
      } else {
        toast.error(res.message || 'Upload failed!')
      }
  
    } catch (error: any) {
      toast.error(error?.message || 'Upload failed!')
    }
  }
  

  return (
    

      <div className="min-h-screen flex items-start justify-center pt-20 bg-gray-100">
        <div className="p-6 max-w-md w-full bg-white rounded shadow space-y-4">
            <div><h1 className="text-xl font-bold text-black">Upload Profile Photo</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                    Choose a profile image
                </label>
                <input type="file" name="photo" accept="image/*" onChange={handleChange} />
            </div>
            {preview && (
            <img src={preview} alt="Preview" className="w-32 h-32 rounded-full border" />
        )}

        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Upload
        </button>

        {message && (
          <p className={`font-medium ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message.text}
          </p>
        )}
      </form>
    </div>
  </div>  
  )
}

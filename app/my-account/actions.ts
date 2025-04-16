'use server'

import { hash, compare } from 'bcryptjs'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth1"
import { prisma } from "@/lib/db"
import path from "path"
import fs from "fs"
import { writeFile } from "fs/promises"
import { v4 as uuidv4 } from "uuid"
import { redirect } from 'next/navigation'

// Uploading Profile Photo
export async function uploadProfilePhoto(formData: FormData) {
 try {
      const session = await getServerSession(authOptions)
      const userEmail = session?.user?.email
  
      if (!userEmail) throw new Error("User not authenticated")

      const file = formData.get("photo") as File
      if (!file || file.size === 0) throw new Error("No file")

      const buffer = Buffer.from(await file.arrayBuffer())
      const fileName = `${uuidv4()}-${file.name}`
      const uploadDir = path.join(process.cwd(), "public", "uploads")

      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })
      const filePath = path.join(uploadDir, fileName)

      await writeFile(filePath, buffer)

      const imageUrl = `/uploads/${fileName}`

      await prisma.user.update({
        where: { email: userEmail },
        data: { image: imageUrl },
      })

      return ({
        success: true,
        message: 'Profile image uploaded successfully!',
      })
      } catch (error) {
        console.error('Upload error:', error)
        return ({
          success: false,
          message: 'Something went wrong during upload.',
        })
      }
    }

// Change Password
export async function changePassword(formData: FormData) {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  if (!email) throw new Error("Not authenticated")

  const currentPassword = formData.get('currentPassword')?.toString() || ''
  const newPassword = formData.get('newPassword')?.toString() || ''

  if (!currentPassword || !newPassword) {
    throw new Error("Missing fields")
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user?.password) throw new Error("User has no password set")

  const isMatch = await compare(currentPassword, user.password)
  if (!isMatch) throw new Error("Current password is incorrect")

  const hashedNewPassword = await hash(newPassword, 10)

  await prisma.user.update({
    where: { email },
    data: { password: hashedNewPassword },
  })

   // Sign the user out after password change
   redirect("/api/auth/signout?callbackUrl=/login")
  }
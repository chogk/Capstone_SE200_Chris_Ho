'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth1"
import { prisma } from "@/lib/db"
import path from "path"
import fs from "fs"
import { writeFile } from "fs/promises"
import { v4 as uuidv4 } from "uuid"

export async function uploadProfilePhoto(formData: FormData) {
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

  return { success: true }
}


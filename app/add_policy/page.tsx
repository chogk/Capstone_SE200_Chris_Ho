"use client";

import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


type PolicyType = {
    id: number
    type_of_policy: string
  }
  

const formSchema = z.object({
  id: z.string().min(5, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
  base_price_sgd: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: 'Price is required',
  }),
  type_of_policy_id: z.string().min(1, 'Policy type is required'),
})

type FormValues = z.infer<typeof formSchema>

export default function AddPolicyForm() {
  const [policyTypes, setPolicyTypes] = useState<PolicyType[]>([])
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    const fetchPolicyTypes = async () => {
      const res = await fetch('/api/policy-types-insurance')
      const data = await res.json()
      console.log(data); // Add this line to check the response
      setPolicyTypes(data)
    }
    fetchPolicyTypes()
  }, [])

  const onSubmit = async (data: FormValues) => {
    const res = await fetch('/api/add-policy', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (res.ok) {
      toast.success('Policy added!')  //Show Success message at bottom right corner, wait for 2000ms before redirect to add-policy main page
      setTimeout(() => {
        router.push('../policies');
      }, 2000); 
      } else {
      toast.error('Failed to add policy.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-8 p-4  bg-white rounded shadow">
      {/* Header and Subheader */}
      <div className="text-left">
        <h1 className="text-3xl font-bold text-gray-900">Add Policy</h1>
        <p className="text-sm text-gray-600 mt-2">Add a new policy</p>
      </div>

    <form onSubmit={handleSubmit(onSubmit)} >
      <div>
        <Label>ID</Label>
        <Input {...register('id')} />
        {errors.id && <p className="text-sm text-red-500">{errors.id.message}</p>}
      </div>

      <div className='pt-4'>
        <Label>New Policy Name</Label>
        <Input {...register('name')} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div className='pt-4'>
        <Label>Price</Label>
        <Input {...register('base_price_sgd')} />
        {errors.base_price_sgd && <p className="text-sm text-red-500">{errors.base_price_sgd.message}</p>}
      </div>

      <div className='pt-4'>
        <Label>Type</Label>
        <Select onValueChange={(val) => setValue('type_of_policy_id', val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select policy type" />
          </SelectTrigger>
          <SelectContent>
            {policyTypes.map((type) => (
              <SelectItem key={type.id} value={type.id.toString()}>
                {type.type_of_policy}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.type_of_policy_id && <p className="text-sm text-red-500">{errors.type_of_policy_id.message}</p>}
      </div>   
        <div className='pt-8'><Button type="submit">Add Policy</Button></div>
    </form>
  </div>
  )
}

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

type InsurancePolicy = {
  id: string
  name: string
}

const formSchema = z.object({
  id: z.string().min(5, 'Policy Holder ID is required'),
  email: z.string().email('Invalid email'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  insurance_policy_ids: z.array(z.string()).min(1, 'At least one policy is required'),
})

type FormValues = z.infer<typeof formSchema>

export default function AddPolicyHolderForm() {
  const [policies, setPolicies] = useState<InsurancePolicy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      insurance_policy_ids: [],
    }
  })

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setIsLoading(true)
        const res = await fetch('/api/insurance_policies')
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        console.log('Frontend received policies:', data)
        setPolicies(data)
      } catch (error) {
        console.error('Failed to fetch policies:', error)
        toast.error('Failed to load insurance policies')
      } finally {
        setIsLoading(false)
      }
    }
    fetchPolicies()
  }, [])

  const handlePolicySelect = (policyId: string) => {
    setValue('insurance_policy_ids', [policyId]);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch('/api/add_policy_holder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        toast.success('Policy Holder added successfully!')
        setTimeout(() => {
          router.push('../policy_holders')
        }, 2000)
      } else {
        const errorData = await res.json()
        toast.error(errorData.error || 'Failed to add policy holder')
      }
    } catch (err) {
      console.error('Error submitting form:', err)
      toast.error('Failed to submit form. Please try again.')
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-8 bg-white rounded-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Add Policy Holder</h1>
        <p className="text-sm text-gray-500">Add a new policy holder</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-[200px,1fr] items-center gap-4">
          <Label htmlFor="id" className="text-base font-bold">Policy Holder ID</Label>
          <div>
            <Input 
              id="id" 
              {...register('id')} 
              placeholder="S1234567A"
              className="h-10 px-3 rounded-md border border-gray-200"
            />
            {errors.id && <p className="text-sm text-red-500 mt-1">{errors.id.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-[200px,1fr] items-center gap-4">
          <Label htmlFor="email" className="text-base font-bold">Email</Label>
          <div>
            <Input 
              id="email" 
              {...register('email')} 
              type="email" 
              placeholder="jerry@email.com"
              className="h-10 px-3 rounded-md border border-gray-200"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-[200px,1fr] items-center gap-4">
          <Label htmlFor="firstName" className="text-base font-bold">First Name</Label>
          <div>
            <Input 
              id="firstName" 
              {...register('firstName')} 
              placeholder="Jerry"
              className="h-10 px-3 rounded-md border border-gray-200"
            />
            {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-[200px,1fr] items-center gap-4">
          <Label htmlFor="lastName" className="text-base font-bold">Last Name</Label>
          <div>
            <Input 
              id="lastName" 
              {...register('lastName')} 
              placeholder="Tan"
              className="h-10 px-3 rounded-md border border-gray-200"
            />
            {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-[200px,1fr] items-center gap-4">
          <Label className="text-base font-bold">Policies</Label>
          <div>
            {isLoading ? (
              <p className="text-sm text-gray-500">Loading policies...</p>
            ) : (
              <Select onValueChange={handlePolicySelect}>
                <SelectTrigger className="h-10 px-3 rounded-md border border-gray-200">
                  <SelectValue placeholder="Select a policy" />
                </SelectTrigger>
                <SelectContent>
                  {policies.map((policy) => (
                    <SelectItem key={policy.id} value={policy.id}>
                      {policy.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {errors.insurance_policy_ids && (
              <p className="text-sm text-red-500 mt-1">{errors.insurance_policy_ids.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-[200px,1fr] items-center gap-4">
          <div></div>
          <Button 
            type="submit" 
            className="w-auto px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800">
            Add Policy Holder
          </Button>
        </div>
      </form>
    </div>
  )
}
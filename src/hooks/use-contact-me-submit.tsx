import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { contactMe } from '@/app/actions/contact-me'
import {
  type ContactMeFormData,
  contactMeSchema,
} from '@/app/actions/contact-me-type'

export function useContactMeSubmit() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactMeFormData>({
    resolver: zodResolver(contactMeSchema),
  })

  const onSubmit = async (data: ContactMeFormData) => {
    const result = await contactMe(data)
    if (result.data?.id === undefined) {
      toast.error('Intergalactic error', {
        description: 'The alien receiver is offline! Try later please.',
        duration: 5000,
      })
      return
    }
    toast.success('Cosmic success!', {
      description:
        'Your message has been beamed to our extraterrestrial friends.',
      duration: 5000,
    })
    reset()
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  }
}

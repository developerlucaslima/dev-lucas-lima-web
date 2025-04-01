import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { contactMe } from '@/app/actions/contact-me'
import {
  type ContactMeFormData,
  contactMeSchema,
} from '@/app/actions/contact-me-type'
import { english } from '@/config/english-config'

interface ContactMeSubmiTProps {
  shouldAnimate: () => void
}

export function useContactMeSubmit({ shouldAnimate }: ContactMeSubmiTProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactMeFormData>({
    resolver: zodResolver(contactMeSchema),
  })

  const submitToastMessages = english.contactMe.submitToastMessages

  const onSubmit = async (data: ContactMeFormData) => {
    shouldAnimate()
    const result = await contactMe(data)
    if (result.data?.id === undefined) {
      toast.error(submitToastMessages.error.title, {
        description: submitToastMessages.error.description,
        duration: 5000,
      })
      return
    }
    toast.success(submitToastMessages.success.title, {
      description: submitToastMessages.success.description,
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

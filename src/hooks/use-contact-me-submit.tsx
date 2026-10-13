import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { contactMe } from '@/app/actions/contact-me'
import { english } from '@/config/english-config'
import {
  type ContactMessageInput,
  contactMessageSchema,
} from '@/features/contact/contracts/contact-message.schema'
import type { ContactMessageResult } from '@/features/contact/contracts/contact-result.types'

interface ContactMeSubmiTProps {
  shouldAnimate: () => void
}

export function useContactMeSubmit({ shouldAnimate }: ContactMeSubmiTProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactMessageInput>({
    resolver: zodResolver(contactMessageSchema),
  })

  const submitToastMessages = english.contactMe.submitToastMessages

  const onSubmit = async (data: ContactMessageInput) => {
    let result: ContactMessageResult

    try {
      result = await contactMe(data)
    } catch {
      result = { status: 'unexpected_error' }
    }

    if (result.status !== 'success') {
      toast.error(submitToastMessages.error.title, {
        description: submitToastMessages.error.description,
      })
      return
    }
    toast.success(submitToastMessages.success.title, {
      description: submitToastMessages.success.description,
    })
    reset()
    shouldAnimate()
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  }
}

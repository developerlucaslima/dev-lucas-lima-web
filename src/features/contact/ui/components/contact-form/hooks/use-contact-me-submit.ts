import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { contactMe } from '@/app/actions/contact-me'
import {
  type ContactMessageInput,
  contactMessageSchema,
} from '@/features/contact/contracts/contact-message.schema'
import type { ContactMessageResult } from '@/features/contact/contracts/contact-result.types'
import type { ContactUiCopy } from '@/features/contact/ui/contact-ui-copy.types'

interface ContactMeSubmiTProps {
  shouldAnimate: () => void
  submitToastMessages: ContactUiCopy['submitToastMessages']
}

export function useContactMeSubmit({
  shouldAnimate,
  submitToastMessages,
}: ContactMeSubmiTProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactMessageInput>({
    resolver: zodResolver(contactMessageSchema),
  })

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

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { contactMe } from '@/app/actions/contact-me'
import {
  type ContactMessageInput,
  createContactMessageSchema,
} from '@/features/contact/contracts/contact-message.schema'
import type { ContactMessageResult } from '@/features/contact/contracts/contact-result.types'
import type { ContactUiCopy } from '@/features/contact/ui/contact-ui-copy.types'

interface ContactMeSubmitProps {
  formErrorMessages: ContactUiCopy['formErrorMessages']
  shouldAnimate: () => void
  submitToastMessages: ContactUiCopy['submitToastMessages']
}

export function useContactMeSubmit({
  formErrorMessages,
  shouldAnimate,
  submitToastMessages,
}: ContactMeSubmitProps) {
  const schema = useMemo(
    () => createContactMessageSchema(formErrorMessages),
    [formErrorMessages],
  )
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getFieldState,
    trigger,
  } = useForm<ContactMessageInput>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    const invalidFields = schema
      .keyof()
      .options.filter((field) => getFieldState(field).invalid)

    if (invalidFields.length > 0) trigger(invalidFields)
  }, [getFieldState, schema, trigger])

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

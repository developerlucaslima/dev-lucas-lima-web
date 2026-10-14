'use client'

import { Button } from '@fradelli/ui/button'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@fradelli/ui/card'
import { Field, FieldError, FieldLabel } from '@fradelli/ui/field'
import { Input } from '@fradelli/ui/input'
import { Send } from 'lucide-react'

import { GlassCard } from '@/components/shared/glass-card/glass-card'
import { Textarea } from '@/components/shared/textarea/textarea'

import { contactFormStyles } from './contact-form.styles'
import type { ContactFormProps } from './contact-form.types'
import { useContactMeSubmit } from './hooks/use-contact-me-submit'

export function ContactForm({
  copy,
  formErrorMessages,
  submitToastMessages,
  shouldAnimate,
}: ContactFormProps) {
  const { errors, handleSubmit, isSubmitting, onSubmit, register } =
    useContactMeSubmit({
      formErrorMessages,
      shouldAnimate,
      submitToastMessages,
    })

  return (
    <GlassCard className={contactFormStyles.card}>
      <CardHeader className={contactFormStyles.header}>
        <h3 className={contactFormStyles.title}>{copy.formTitle}</h3>
        <CardDescription className={contactFormStyles.description}>
          {copy.formSubtitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className={contactFormStyles.form}
        >
          {copy.inputs.map((item) => {
            const fieldName = item.register
            const fieldError = errors[fieldName]?.message
            const errorId = `${fieldName}-error`

            return (
              <Field
                key={item.name}
                data-invalid={Boolean(fieldError)}
                className={contactFormStyles.field}
              >
                <FieldLabel htmlFor={fieldName}>{item.name}</FieldLabel>
                <Input
                  className={contactFormStyles.input}
                  id={fieldName}
                  type={item.type}
                  placeholder={item.placeholder}
                  autoComplete={item.register}
                  aria-invalid={Boolean(fieldError)}
                  aria-describedby={fieldError ? errorId : undefined}
                  {...register(fieldName)}
                />
                {fieldError && (
                  <FieldError id={errorId} className={contactFormStyles.error}>
                    {fieldError}
                  </FieldError>
                )}
              </Field>
            )
          })}
          <Field
            data-invalid={Boolean(errors.message)}
            className={contactFormStyles.field}
          >
            <FieldLabel htmlFor="message">{copy.textArea.name}</FieldLabel>
            <Textarea
              id={copy.textArea.register}
              placeholder={copy.textArea.placeholder}
              className={contactFormStyles.message}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              {...register(copy.textArea.register)}
            />
            {errors.message && (
              <FieldError
                id="message-error"
                className={contactFormStyles.error}
              >
                {errors.message.message}
              </FieldError>
            )}
          </Field>
          <CardFooter className={contactFormStyles.footer}>
            <Button
              className={contactFormStyles.submitButton}
              variant="default"
              type="submit"
              disabled={isSubmitting}
            >
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting
                ? copy.buttonTexts.isSubmitting
                : copy.buttonTexts.isNotSubmitting}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </GlassCard>
  )
}

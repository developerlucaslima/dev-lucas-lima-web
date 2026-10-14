'use client'

import { Send } from 'lucide-react'

import { Button } from '@/components/shared/button/button'
import { Card } from '@/components/shared/card/card'
import { CardContent } from '@/components/shared/card-content/card-content'
import { CardDescription } from '@/components/shared/card-description/card-description'
import { CardFooter } from '@/components/shared/card-footer/card-footer'
import { CardHeader } from '@/components/shared/card-header/card-header'
import { CardTitle } from '@/components/shared/card-title/card-title'
import { Input } from '@/components/shared/input/input'
import { Label } from '@/components/shared/label/label'
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
    <Card className={contactFormStyles.card}>
      <CardHeader className={contactFormStyles.header}>
        <CardTitle className={contactFormStyles.title}>
          {copy.formTitle}
        </CardTitle>
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
              <div key={item.name} className={contactFormStyles.field}>
                <Label htmlFor={fieldName}>{item.name}</Label>
                <Input
                  id={fieldName}
                  type={item.type}
                  placeholder={item.placeholder}
                  autoComplete={item.register}
                  aria-invalid={Boolean(fieldError)}
                  aria-describedby={fieldError ? errorId : undefined}
                  {...register(fieldName)}
                />
                {fieldError && (
                  <p id={errorId} className={contactFormStyles.error}>
                    {fieldError}
                  </p>
                )}
              </div>
            )
          })}
          <div className={contactFormStyles.field}>
            <Label htmlFor="message">{copy.textArea.name}</Label>
            <Textarea
              id={copy.textArea.register}
              placeholder={copy.textArea.placeholder}
              className={contactFormStyles.message}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              {...register(copy.textArea.register)}
            />
            {errors.message && (
              <p id="message-error" className={contactFormStyles.error}>
                {errors.message.message}
              </p>
            )}
          </div>
          <CardFooter>
            <Button
              className={contactFormStyles.submitButton}
              variant="ghost"
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
    </Card>
  )
}

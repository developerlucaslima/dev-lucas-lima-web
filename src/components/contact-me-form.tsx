'use client'

import { Label } from '@radix-ui/react-label'
import { Send } from 'lucide-react'

import type { ContactUiCopy } from '@/features/contact/ui/contact-ui-copy.types'
import { useContactMeSubmit } from '@/hooks/use-contact-me-submit'

import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

interface ContactMeFormProps {
  readonly copy: ContactUiCopy['form']
  readonly submitToastMessages: ContactUiCopy['submitToastMessages']
  shouldAnimate: () => void
}

export const ContactMeForm = ({
  copy,
  submitToastMessages,
  shouldAnimate,
}: ContactMeFormProps) => {
  const { errors, handleSubmit, isSubmitting, onSubmit, register } =
    useContactMeSubmit({ shouldAnimate, submitToastMessages })

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="form-element text-center text-2xl uppercase">
          {copy.formTitle}
        </CardTitle>
        <CardDescription className="form-element">
          {copy.formSubtitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {copy.inputs.map((item) => {
            const fieldName = item.register
            const fieldError = errors[fieldName]?.message
            const errorId = `${fieldName}-error`

            return (
              <div key={item.name} className="form-element space-y-2">
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
                  <p id={errorId} className="text-sm text-red-500">
                    {fieldError}
                  </p>
                )}
              </div>
            )
          })}
          <div className="form-element space-y-2">
            <Label htmlFor="message">{copy.textArea.name}</Label>
            <Textarea
              id={copy.textArea.register}
              placeholder={copy.textArea.placeholder}
              className="min-h-[120px]"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              {...register(copy.textArea.register)}
            />
            {errors.message && (
              <p id="message-error" className="text-sm text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>
          <CardFooter>
            <Button
              className="form-element w-full cursor-pointer"
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

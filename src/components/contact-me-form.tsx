'use client'

import { Label } from '@radix-ui/react-label'
import { Send } from 'lucide-react'

import { english } from '@/config/english-config'
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

export const ContactMeForm = () => {
  const config = english.contactMe.form
  const { errors, handleSubmit, isSubmitting, onSubmit, register } =
    useContactMeSubmit()

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="form-element text-center text-2xl uppercase">
          {config.formTitle}
        </CardTitle>
        <CardDescription className="form-element">
          {config.formSubtitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {config.inputs.map((item) => (
            <div key={item.name} className="form-element space-y-2">
              <Label htmlFor="name">{item.name}</Label>
              <Input
                id={item.register}
                placeholder={item.placeholder}
                {...register(item.register as 'message' | 'name' | 'email')}
              />
              {errors.name && (
                <p className="text-sm text-red-500">
                  {
                    errors[item.register as 'message' | 'name' | 'email']
                      ?.message
                  }
                </p>
              )}
            </div>
          ))}
          <div className="form-element space-y-2">
            <Label htmlFor="message">{config.textArea.name}</Label>
            <Textarea
              id={config.textArea.register}
              placeholder={config.textArea.placeholder}
              className="min-h-[120px]"
              {...register(
                config.textArea.register as 'message' | 'name' | 'email',
              )}
            />
            {errors.message && (
              <p className="text-sm text-red-500">
                {
                  errors[
                    config.textArea.register as 'message' | 'name' | 'email'
                  ]?.message
                }
              </p>
            )}
          </div>
          <CardFooter>
            <Button
              className="form-element w-full"
              variant="ghost"
              type="submit"
              disabled={isSubmitting}
            >
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting
                ? config.buttonTexts.isSubmitting
                : config.buttonTexts.isNotSubmitting}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}

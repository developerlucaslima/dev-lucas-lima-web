'use client'

import { Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useContactMeSubmit } from '@/hooks/use-contact-me-submit'

export function ContactMeSection() {
  const { errors, handleSubmit, isSubmitting, onSubmit, register } =
    useContactMeSubmit()

  return (
    <div className="relative overflow-hidden">
      <div className="container px-4 py-20 md:px-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* Form Side */}
          <div className="w-full lg:w-1/2">
            <Card className="mx-auto w-full max-w-md">
              <CardHeader>
                <CardTitle className="form-element text-2xl">
                  Let's chat
                </CardTitle>
                <CardDescription className="form-element">
                  Send me a message
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="form-element space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="form-element space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="form-element space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      className="min-h-[120px]"
                      {...register('message')}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <CardFooter>
                    <Button
                      className="form-element w-full"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Character Side */}
          <div className="flex w-full items-center justify-center"></div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { Button } from '@rag/ui/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@rag/ui/Form'
import { Popover, PopoverContent } from '@rag/ui/Popover'
import { Textarea } from '@rag/ui/Textarea'
import { useForm } from 'react-hook-form'

import { Feedback_FeedbackCreateDocument } from '@gql/graphql'

interface IFeedBackProps {
  children: React.ReactNode
  onOpenChange: (open: boolean) => void
  open: boolean
}

export const Feedback = ({ onOpenChange, open }: IFeedBackProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const [feedbackCreate] = useMutation(Feedback_FeedbackCreateDocument, {})

  const defaultValues = {
    feedback: '',
    subject: '',
  }

  const form = useForm({
    defaultValues,
    values: { ...defaultValues },
  })
  const resetForm = () => form.reset(defaultValues)

  const onSubmit = async () => {
    const subject = form.getValues().subject
    const feedback = form.getValues().feedback
    if (!feedback) {
      setError(true)
      return
    }

    try {
      await feedbackCreate({
        variables: {
          feedback,
          subject,
        },
      })
      setIsSubmitted(true)
      resetForm()
      setError(false)
      setTimeout(function () {
        onOpenChange(false)
      }, 3500)

      setTimeout(() => {
        setIsSubmitted(false)
      }, 4000)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Popover onOpenChange={onOpenChange} open={open}>
      <PopoverContent
        align="center"
        className="bg-background-secondary ml-3"
        side="right"
        sideOffset={100}
      >
        <div className="h-fit w-[350px] ">
          <div className="flex flex-col gap-2 px-[20px] pb-[5px] pt-[14px]">
            <h2 className="tracking-light text-lg font-semibold leading-none text-white">
              {!isSubmitted ? 'Submit Feedback' : 'Thank you for your feedback!'}
            </h2>
            <p>
              {!isSubmitted
                ? 'Have feedback about Canyon? Let the team know!'
                : "You'll hear back from us if we have any questions"}
            </p>
          </div>
          {!isSubmitted && (
            <Form {...form}>
              <form className="" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="m-5 flex flex-col text-white">
                  <FormLabel className={`${error ? 'text-red-500' : ''} mb-2`}>
                    Feedback *
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="feedback"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormControl>
                          <Textarea
                            {...field}
                            className="bg-background-contrast min-h-[120px] resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button size="lg" type="submit" variant="cta">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

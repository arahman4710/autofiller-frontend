'use client'

import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { Button } from '@canyon/ui/Button'
import { Dialog, DialogClose, DialogContent, DialogFooter } from '@canyon/ui/Dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@canyon/ui/Form'
import { Textarea } from '@canyon/ui/Textarea'
import { Question } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'

import { FeedbackDialog_CreateFeedbackDocument } from '@gql/graphql'

interface IFeedbackDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const FeedbackDialog = ({ open, setOpen }: IFeedbackDialogProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const [feedbackCreate] = useMutation(FeedbackDialog_CreateFeedbackDocument, {})

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
        setOpen(false)
      }, 3500)

      setTimeout(() => {
        setIsSubmitted(false)
      }, 4000)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent title="Submit Feedback" titleIcon={<Question />}>
        {isSubmitted && (
          <div className="flex flex-col gap-2 px-[20px] pb-[5px] pt-[14px]">
            <h2 className="tracking-light text-lg font-semibold leading-none text-white">
              Thank you for your feedback!
            </h2>
            <p>You'll hear back from us if we have any questions.</p>
          </div>
        )}

        {!isSubmitted && (
          <Form {...form}>
            <form className="" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="m-2 flex flex-col text-white">
                <FormLabel className={`${error ? 'text-red-500' : ''} mb-2`}>Feedback *</FormLabel>
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
              </div>
            </form>
          </Form>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" variant="cta">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

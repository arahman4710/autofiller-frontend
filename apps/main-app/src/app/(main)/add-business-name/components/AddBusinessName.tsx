'use client'

import { useMutation } from '@apollo/client'
import { Button } from '@rag/ui/Button'
import { useToast } from '@rag/ui/useToast'
import { useRouter } from 'next/navigation'

import { PageHeader } from '@/components/PageHeader'
import { AddBusinessNameDocument, UseCurrentUser_UsersDocument } from '@/gql/__generated__/graphql'
import { ADD_BUSINESS_NAME_FORM_ID, AddBusinessNameForm } from '@/forms/AddBusinessNameForm'
import { useAddBusinessNameForm } from '@/forms/hooks/useAddBusinessNameForm'

export const AddBusinessName = () => {
  const { errorToast } = useToast()
  const router = useRouter()
  const { form } = useAddBusinessNameForm()

  const [addBusinessName, { loading }] = useMutation(AddBusinessNameDocument,
    { refetchQueries: [UseCurrentUser_UsersDocument] }
  )

  const handleOnSubmit = async () => {
    const formValues = form.getValues()

    try {
      const result = await addBusinessName({
        variables: {
          name: formValues.name
        }
      })

      if (result?.data?.updateBusiness) {
        router.replace('/')
      } else {
        errorToast()
      }
    } catch (e) {
      console.error(e)

      errorToast()
    }
  }

  const isValid = form.formState.isValid

  return (
    <div className="flex ml-6 mt-2">
      <div className="w-[400px]">
        <PageHeader
            title="Add your business' name to get started"
        />
        <AddBusinessNameForm form={form} onSubmit={handleOnSubmit} />
        <Button
            className="mt-4"
            disabled={!isValid}
            form={ADD_BUSINESS_NAME_FORM_ID}
            fullWidth={true}
            loading={loading}
            size="lg"
            type="submit"
            variant="cta"
        >
            Continue
        </Button>
      </div>
    </div>
  ) 
}

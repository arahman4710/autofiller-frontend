import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@rag/ui/Accordion'

import { SupportLink } from '@/components/SupportLink'

export const PricingFAQAccordion = () => {
  return (
    <Accordion className="mx-auto max-w-[500px]" collapsible type="single">
      <AccordionItem value="cancel-subscription">
        <AccordionTrigger className="text-muted-foreground">
          Can I cancel my subscription?
        </AccordionTrigger>
        <AccordionContent className="space-y-3">
          <p>
            Yes, you can cancel your subscription at any time by going to{' '}
            <span className="bg-background-contrast rounded-md p-1 font-mono text-sm">
              Settings &rsaquo; Manage Billing
            </span>
            . Plans canceled before the next billing date will not be charged.
          </p>
          <p>
            For further questions, contact <SupportLink />, we are available 24/7.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="payment">
        <AccordionTrigger className="text-muted-foreground">
          Are my payments secure?
        </AccordionTrigger>
        <AccordionContent>
          Yes, payments are made through Stripe, a trusted payment provider. All transactions are
          secure and encrypted.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="questions">
        <AccordionTrigger className="text-muted-foreground">
          How do I contact support?
        </AccordionTrigger>
        <AccordionContent>
          Canyon Pro users receive priority support from our team and can contact us at{' '}
          <SupportLink />, we are available 24/7.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

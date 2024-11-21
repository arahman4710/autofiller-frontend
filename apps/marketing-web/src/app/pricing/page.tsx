import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@rag/ui/Accordion'
import { Badge } from '@rag/ui/Badge'
import {
  SwitchTabs,
  SwitchTabsContent,
  SwitchTabsList,
  SwitchTabsTrigger,
} from '@rag/ui/SwitchTabs'
import { Metadata } from 'next'

import { Plans } from '@/components/Plans'
import { SectionHeader } from '@/components/SectionHeader'

export const metadata: Metadata = {
  description: 'Plans made to fit your needs. Get started today.',
  title: 'SKUGrep • Pricing',
}

export default function PricingPage() {
  const faq = [
    {
      answer:
        'Yes, you can cancel your plan anytime. You can do this by going to the billing section of your account and canceling your plan.',
      question: 'Can I cancel my plan anytime?',
    },
    {
      answer: 'Yes, your payments are secure. We use Stripe to process payments.',
      question: 'Are my payments secure?',
    },
    {
      answer: 'All payments can made via credit card using our secure payment processor, Stripe.',
      question: 'What are my payment options?',
    },
  ]
  return (
    <div className="container min-h-[85dvh] space-y-20 p-[24px] md:p-[48px]">
      <section>
        <SectionHeader
          subtitle="Plans made to fit your needs. Start today for free."
          title="Pricing"
        />

        <div className="mt-10">
          <SwitchTabs
            className="flex w-full flex-col items-center justify-center self-center"
            defaultValue="quarterly"
          >
            <SwitchTabsList>
              <SwitchTabsTrigger className="flex flex-row gap-2" value="quarterly">
                Quarterly <Badge variant="discount">-14%</Badge>
              </SwitchTabsTrigger>
              <SwitchTabsTrigger value="monthly">Monthly</SwitchTabsTrigger>
            </SwitchTabsList>

            <SwitchTabsContent value="quarterly">
              <Plans isQuarterly />
            </SwitchTabsContent>
            <SwitchTabsContent value="monthly">
              <Plans isQuarterly={false} />
            </SwitchTabsContent>
          </SwitchTabs>
        </div>
      </section>

      <section className="mx-auto max-w-[900px]">
        <SectionHeader title="Frequently asked questions" />
        <div className="hidden grid-cols-2 gap-x-5 gap-y-8 md:grid">
          {faq.map((item) => (
            <div className="space-y-2" key={item.question}>
              <span className="font-semibold">{item.question}</span>
              <p className="text-white/80">{item.answer}</p>
            </div>
          ))}
        </div>

        <Accordion className="md:hidden" collapsible={true} type="single">
          {faq.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-10">
          Additional questions?{' '}
          <a className="text-emerald-200" href="mailto:support@skugrep.xyz">
            Contact support
          </a>
          .
        </div>
      </section>
    </div>
  )
}

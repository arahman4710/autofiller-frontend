import { Metadata } from 'next'

import { SectionHeader } from '@/components/SectionHeader'

export const metadata: Metadata = {
  title: 'Canyon • Privacy Policy',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container p-[48px]">
      <SectionHeader title="Privacy Policy" />

      <article className="prose prose-stone prose-invert mx-auto pb-4">
        <section>
          <i>Last updated on January 16, 2024</i>
          <p>
            Canyon operates the <a href="https://www.usecanyon.com">https://www.usecanyon.com</a>{' '}
            website, which provides the SERVICE.
          </p>
          <p>
            This page is used to inform website visitors regarding our policies with the collection,
            use, and disclosure of Personal Information if anyone decided to use our Service, the
            Canyon website.
          </p>
          <p>
            If you choose to use our Service, then you agree to the collection and use of
            information in relation with this policy. The Personal Information that we collect are
            used for providing and improving the Service. We will not use or share your information
            with anyone except as described in this Privacy Policy.
          </p>
          <p>
            The terms used in this Privacy Policy have the same meanings as in our Terms and
            Conditions, which is accessible at{' '}
            <a href="https://www.usecanyon.com">https://www.usecanyon.com</a>, unless otherwise
            defined in this Privacy Policy.
          </p>
        </section>
        <section>
          <h2>1. Information Collection and Use</h2>
          <p>
            For a better experience while using our Service, we may require you to provide us with
            certain personally identifiable information, including but not limited to your name,
            phone number, and postal address. The information that we collect will be used to
            contact or identify you.
          </p>
        </section>
        <section>
          <h2>2. Log Data</h2>
          <p>
            We want to inform you that whenever you visit our Service, we collect information that
            your browser sends to us that is called Log Data. This Log Data may include information
            such as your computer&apos;s Internet Protocol (&quot;IP&quot;), browser version, pages
            of our Service that you visit, the time and date of your visit, the time spent on those
            pages, and other statistics.
          </p>
        </section>
        <section>
          <h2>3. Cookies</h2>
          <p>
            Cookies are files with small amount of data that is commonly used an anonymous unique
            identifier. These are sent to your browser from the website that you visit and are
            stored on your computer&apos;s hard drive.
          </p>
          <p>
            Our website uses these &quot;cookies&quot; to collection information and to improve our
            Service. You have the option to either accept or refuse these cookies, and know when a
            cookie is being sent to your computer. If you choose to refuse our cookies, you may not
            be able to use some portions of our Service. use some portions of our Service.
          </p>
        </section>
        <section>
          <h2>4. CAN SPAM Act</h2>
          <p>
            The CAN-SPAM Act is a law that sets the rules for commercial email, establishes
            requirements for commercial messages, gives recipients the right to have emails stopped
            from being sent to them, and spells out tough penalties for violations.
          </p>
          <p>‍We collect your email address in order to:</p>
          <ul>
            <li>Send information, respond to inquiries, and/or other requests or questions.</li>
            <li>Process orders and to send information and updates pertaining to orders.</li>
            <li>Send you additional information related to your product and/or service.</li>
          </ul>
          <p>
            If at any time you would like to unsubscribe to receiving future emails, You can
            unsubscribe from our marketing email list at any time by clicking on the unsubscribe
            link in the emails that we send or by contacting us using the details provided below.
            You will then be removed from the marketing email list – however, we will still need to
            send you service-related emails that are necessary for the administration and use of
            your account.
          </p>
        </section>
        <section>
          <h2>5. Service Providers</h2>
          <p>We may employ third-party companies and individuals due to the following reasons:</p>
          <ul>
            <li>To facilitate our Service;</li>
            <li>To provide the Service on our behalf;</li>
            <li>To perform Service-related services; or</li>
            <li>To assist us in analyzing how our Service is used.</li>
          </ul>
          <p>
            We want to inform our Service users that these third parties have access to your
            Personal Information. The reason is to perform the tasks assigned to them on our behalf.
            However, they are obligated not to disclose or use the information for any other
            purpose.
          </p>
        </section>
        <section>
          <h2>6. Security</h2>
          <p>
            We value your trust in providing us your Personal Information, thus we are striving to
            use commercially acceptable means of protecting it. But remember that no method of
            transmission over the internet, or method of electronic storage is 100% secure and
            reliable, and we cannot guarantee its absolute security.
          </p>
        </section>
        <section>
          <h2>7. Links to Other Sites</h2>
          <p>
            Our Service may contain links to other sites. If you click on a third-party link, you
            will be directed to that site. Note that these external sites are not operated by us.
            Therefore, we strongly advise you to review the Privacy Policy of these websites. We
            have no control over, and assume no responsibility for the content, privacy policies, or
            practices of any third-party sites or services.
          </p>
          <p>Children&apos;s Privacy</p>
          <p>
            Our Services do not address anyone under the age of 13. We do not knowingly collect
            personal identifiable information from children under 13. In the case we discover that a
            child under 13 has provided us with personal information, we immediately delete this
            from our servers. If you are a parent or guardian and you are aware that your child has
            provided us with personal information, please contact us so that we will be able to do
            necessary actions.
          </p>
        </section>
        <section>
          <h2>8. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. Thus, we advise you to review this
            page periodically for any changes. We will notify you of any changes by posting the new
            Privacy Policy on this page. These changes are effective immediately, after they are
            posted on this page.
          </p>
        </section>
        <section>
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to
            contact us at <a href="mailto:support@usecanyon.com">support@usecanyon.com</a>.
          </p>
        </section>
      </article>
    </div>
  )
}

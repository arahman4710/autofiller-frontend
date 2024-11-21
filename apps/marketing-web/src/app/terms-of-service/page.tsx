import { Metadata } from 'next'

import { SectionHeader } from '@/components/SectionHeader'

export const metadata: Metadata = {
  title: 'SKUGrep • Terms of Service',
}

export default function TermsOfService() {
  return (
    <div className="container p-[48px]">
      <SectionHeader title="Terms of Service" />

      <article className="prose prose-stone prose-invert mx-auto pb-4">
        <section id="introduction">
          <i>Last updated on June 13, 2024</i>
          <h2>1. Terms of Service</h2>
          <p>
            Welcome to SKUGrep (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;). By accessing or
            using our software available at{' '}
            <a href="https://skugrep.xyz">https://skugrep.xyz</a>, you agree to comply with and
            be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree with these
            Terms, please do not use our software.
          </p>
        </section>

        <section id="use-of-software">
          <h2>2. Use of Software</h2>
          <h3>2.1 License</h3>
          <p>
            We grant you a limited, non-exclusive, non-transferable, and revocable license to use
            our software in accordance with these Terms.
          </p>

          <h3>2.2 Restrictions</h3>
          <p>You agree not to:</p>
          <ul>
            <li>Reverse engineer, decompile, or disassemble the software.</li>
            <li>Use the software for any unlawful purpose.</li>
            <li>Distribute or resell the software without our permission.</li>
          </ul>
        </section>

        <section id="account-registration-and-content">
          <h2>3. Account Registration and Content</h2>
          <h3>3.1 Accuracy of Information</h3>
          <p>
            You agree to provide accurate and complete information when registering an account with
            us.
          </p>

          <h3>3.2 Security</h3>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and
            for all activities that occur under your account.
          </p>

          <h3>3.3 Account Creation</h3>
          <p>Users can create accounts to access various features of the software.</p>

          <h3>3.4 Content Creation and Upload</h3>
          <p>
            Users can create and upload content using our software. You retain ownership of any
            content you create and upload, but you grant us a non-exclusive, worldwide, royalty-free
            license to use, reproduce, and display your content within our software as necessary.
          </p>
        </section>

        <section id="payments-and-subscriptions">
          <h2>4. Payments and Subscriptions</h2>
          <h3>4.1 Fees</h3>
          <p>
            If our software is provided on a subscription basis, you agree to pay the applicable
            subscription fees.
          </p>

          <h3>4.2 Billing</h3>
          <p>
            Billing occurs at the beginning of each subscription period. You may cancel your
            subscription at any time, but refunds are not provided for unused portions of the
            subscription.
          </p>

          <h3>4.3 Purchase of Services</h3>
          <p>Users can purchase various services offered through our software.</p>

          <h3>4.4 Paid Subscription Plans</h3>
          <p>
            We offer paid subscription plans that provide access to additional features and
            services.
          </p>
        </section>

        <section id="intellectual-property">
          <h2>5. Intellectual Property</h2>
          <h3>5.1 Ownership</h3>
          <p>
            We retain all rights, title, and interest in and to the software, including all related
            intellectual property rights.
          </p>

          <h3>5.2 Content</h3>
          <p>
            You retain ownership of any content you create and upload using our software. However,
            you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and
            display your content within our software as necessary.
          </p>
        </section>

        <section id="termination">
          <h2>6. Termination</h2>
          <h3>6.1 By You</h3>
          <p>You may terminate your account at any time by contacting us.</p>

          <h3>6.2 By Us</h3>
          <p>
            We may terminate or suspend your access to the software at our sole discretion, without
            prior notice, for conduct that we believe violates these Terms or is harmful to other
            users of the software, us, or third parties, or for any other reason.
          </p>
        </section>

        <section id="limitation-of-liability">
          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, we are not liable for any indirect, incidental,
            special, consequential, or punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible
            losses resulting from your use of the software.
          </p>
        </section>

        <section id="disclaimer-of-warranties">
          <h2>8. Disclaimer of Warranties</h2>
          <p>
            Our software is provided &quot;as is&quot; and &quot;as available&quot; without any
            warranties of any kind, either express or implied, including, but not limited to,
            implied warranties of merchantability, fitness for a particular purpose, and
            non-infringement.
          </p>
        </section>

        <section id="governing-law">
          <h2>9. Governing Law</h2>
          <p>
            These Terms will be governed by and construed in accordance with the laws of the United
            States and the state of Delaware, without regard to its conflict of law principles.
          </p>
        </section>

        <section id="changes-to-terms">
          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify you of any
            changes by posting the new Terms on our website. Your continued use of the software
            after such changes constitutes your acceptance of the new Terms.
          </p>
        </section>

        <section id="contact-us">
          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at{' '}
            <a href="mailto:support@skugrep.xyz">support@skugrep.xyz</a>.
          </p>
          <p>
            For more information on how we handle your data, please refer to our{' '}
            <a href="https://skugrep.xyz/privacy-policy">Privacy Policy</a>.
          </p>
        </section>
      </article>
    </div>
  )
}

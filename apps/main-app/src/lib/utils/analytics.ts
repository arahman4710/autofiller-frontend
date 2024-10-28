import posthog from 'posthog-js'

export const trackEvent = (event: string, properties?: Record<string, unknown>) => {
  posthog.capture(`[Canyon App] ${event}`, properties)
}

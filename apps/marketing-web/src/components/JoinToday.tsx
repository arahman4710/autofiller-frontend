import { GetStartedButton } from './GetStartedButton'

export const JoinToday = () => {
  return (
    <div className="mx-auto flex max-w-[1088px] flex-col space-y-6 rounded-lg bg-stone-300 p-8">
      <div className="flex flex-col gap-2">
        <h3 className="leading-snug text-stone-900 md:text-[26px]">Ready to get started?</h3>
        <p className="text-white/90">
          Join thousands of users that use Autofiller to accelerate their form filling.
        </p>
      </div>
      <GetStartedButton className="bg-emerald-200 text-black hover:bg-emerald-300" />
    </div>
  )
}

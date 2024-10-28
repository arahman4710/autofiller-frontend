import { TabsList, TabsTrigger } from '@rag/ui/Tabs'
import { AsteriskSimple, Coins, GraduationCap, Lightbulb, Pulse } from '@phosphor-icons/react'

export const TabsNavigation = () => {
  return (
    <TabsList
      aria-label="Manage your application"
      className="scrollbar-none overflow-y-hidden overflow-x-scroll pl-6"
    >
      <TabsTrigger icon={<Pulse />} value="activity">
        Activity
      </TabsTrigger>
      <TabsTrigger icon={<Lightbulb />} value="matchScore">
        ATS Match Score
      </TabsTrigger>
      <TabsTrigger icon={<AsteriskSimple />} value="optimizeResume">
        Optimize Resume
      </TabsTrigger>
      <TabsTrigger icon={<Coins />} value="salaryInsights">
        Salary Insights
      </TabsTrigger>
      <TabsTrigger icon={<GraduationCap />} value="learnSkills">
        Learn Skills
      </TabsTrigger>
    </TabsList>
  )
}

import { SocialInvolvementCard } from "./SocialInvolvementCard"
import { socialInvolvements } from "./socialInvolvements.data"

export function SocialInvolvementList() {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 pb-2 md:grid-cols-3 lg:grid-cols-4">
      {socialInvolvements.map((item) => (
        <SocialInvolvementCard
          key={item.title}
          title={item.title}
          description={item.description}
          imageUrl={item.imageUrl}
        />
      ))}
    </div>
  )
}

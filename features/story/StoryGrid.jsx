import {
  DriveGridItem,
  LeadershipGridItem,
  PartnerGridItem,
  PhotoGridItem,
  StoryGridItem,
  VisionGridItem,
} from './index';

const classname = `
    grid
    bg-red-50
    [grid-template-columns:3fr_1fr_4fr_4fr]
    [grid-template-rows:5fr_2fr_1fr]
    gap-4
    [&>div]:rounded-lg
    [grid-template-areas:'s1_s2_s2_s3'_'s4_s4_s5_s3'_'s4_s4_s6_s6']
  `

export function StoryGrid({ stories }) {
  return (
    <div className={classname}> 
      <LeadershipGridItem gridArea="[grid-area:s1]" />
      <PhotoGridItem gridArea="[grid-area:s2]" url='/images/person/drb-speech.jpg'/>
      <StoryGridItem gridArea="[grid-area:s3]" />
      <VisionGridItem gridArea="[grid-area:s5]" />
      <DriveGridItem gridArea="[grid-area:s4]" />
      <PartnerGridItem gridArea="[grid-area:s6]" />
    </div>
  );
}


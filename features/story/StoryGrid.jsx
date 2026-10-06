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
  gap-4
  [&>div]:rounded-lg
  w-full

  [grid-template-columns:1fr_4fr]
  [grid-template-rows:auto_50vw_20vw_auto_auto_auto]
  [grid-template-areas:'s3_s3'_'s2_s2'_'s7_s5'_'s1_s1'_'s4_s4'_'s6_s6']

  md:[grid-template-columns:3fr_1fr_4fr_4fr]
  md:[grid-template-rows:5fr_2fr_1fr]
  md:[grid-template-areas:'s1_s2_s2_s3'_'s4_s4_s5_s3'_'s4_s4_s6_s6']
`;

export function StoryGrid({ stories }) {
  return (
    <div className={classname}>
      <LeadershipGridItem gridArea="[grid-area:s1]" />
      <PhotoGridItem gridArea="[grid-area:s2]" url="/images/person/drb-speech.jpg" />
      <StoryGridItem gridArea="[grid-area:s3]" />
      <VisionGridItem gridArea="[grid-area:s5]" />
      <DriveGridItem gridArea="[grid-area:s4]" />
      <PartnerGridItem gridArea="[grid-area:s6]" />
    </div>
  );
}

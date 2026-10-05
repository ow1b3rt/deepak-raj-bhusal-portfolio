import { ItemHead } from '.'

export function LeadershipGridItem({ gridArea }) {
  return (
    <div className={`bg-white p-4 ${gridArea}`}>
      <ItemHead text="Leadership & Vision" className='text-chart-3' />
      <p>Content for the Leadership grid item goes here.</p>
    </div>
  );
}

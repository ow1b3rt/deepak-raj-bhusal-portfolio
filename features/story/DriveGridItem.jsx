import { ItemHead } from '.'

export function DriveGridItem({ gridArea }) {
  return (
    <div className={`bg-black text-white p-4 ${gridArea}`}>
      <ItemHead text='what drives me' className='text-white'/>
      <p>Content for the Vision grid item goes here.</p>
    </div>
  );
}

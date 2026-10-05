import { ItemHead } from '.'

export function VisionGridItem({ gridArea }) {
  return (
    <div className={`relative bg-black text-white ${gridArea}`}>
      <div className="absolute bg-red-50 -ml-4 pl-4 pt-4 flex bottom-0 left-0 right-0 h-[150%] rounded-tl-lg z-10">
        <div className="bg-red-200 flex-1 rounded-lg">
          <ItemHead text='turning vision into action' className='text-white' />
          <p>Content for the Drive grid item goes here.</p>
        </div>
      </div>
    </div>
  );
}

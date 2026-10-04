import { GalleryCard } from "./GalleryCard";

export function GalleryGrid({ items }) {
  if (!items || items.length === 0) {
    return null;
  }

  let columns = [[], [], []];

  items.forEach((item, index) => {
    columns[index % 3].push(item);
  });

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-6">
          {column.map((item, itemIndex) => (
            <GalleryCard key={itemIndex} item={item} />
          ))}
        </div>
      ))}
    </div>
  )
}


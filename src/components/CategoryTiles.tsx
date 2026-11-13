import { Link } from 'react-router-dom';
import { Reveal } from './motion.tsx';

interface CategoryTilesProps {
  categories: string[];
  counts: Record<string, number>;
  images?: Record<string, string>;
}

const TILE_STYLES: Record<string, string> = {
  electronics: 'bg-pastel-sky',
  jewelery: 'bg-pastel-blush',
  "men's clothing": 'bg-pastel-sage',
  "women's clothing": 'bg-pastel-butter',
};

function titleCase(value: string): string {
  return value
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function CategoryTiles({ categories, counts, images = {} }: CategoryTilesProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {categories.map((category, index) => {
        const count = counts[category] ?? 0;
        const image = images[category];
        return (
          <Reveal key={category} delay={index * 0.08} className="h-full">
            <Link
              to={`/?category=${encodeURIComponent(category)}#featured`}
              className={`group flex h-full min-h-44 flex-col justify-between overflow-hidden rounded-[1.5rem] p-5 transition-shadow hover:shadow-md ${TILE_STYLES[category] ?? 'bg-creamdark'}`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-sm font-medium text-ink/70">
                  {count > 0 ? `${count} ${count === 1 ? 'product' : 'products'}` : ''}
                </span>
                {image && (
                  <img
                    src={image}
                    alt=""
                    aria-hidden="true"
                    className="h-20 w-20 rounded-2xl bg-white/70 object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
              </div>
              <div>
                <h3 className="font-display text-xl font-bold leading-tight text-ink">
                  {titleCase(category)}
                </h3>
                <span className="mt-1 inline-block text-sm font-medium text-clay">
                  Shop now &rarr;
                </span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}

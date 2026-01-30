import Link from 'next/link';

const categories = [
  { name: 'Pure Horror', slug: 'Horror', color: 'from-red-900/40' },
  { name: 'Sunday Suspense', slug: 'Sunday-Suspense', color: 'from-blue-900/40' },
  { name: 'Paranormal', slug: 'Paranormal', color: 'from-purple-900/40' },
  { name: 'RJ Russell', slug: 'Bhoot.Com all Episode With Rj Russell', color: 'from-emerald-900/40' },
];

export default function CategoryGrid() {
  return (
    <section className="py-12">
      <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-500 mb-8 text-center">Browse by Mood</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/explore?category=${cat.slug}`} className="relative h-32 rounded-2xl overflow-hidden border border-white/10 group transition-all hover:border-[#00DB80]/50">
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} to-black`}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold uppercase tracking-widest text-xs group-hover:scale-110 transition-transform">{cat.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
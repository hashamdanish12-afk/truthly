export default function ArticleCard({ item }) {
  return (
    <article className="bg-[#1A1A1A] p-4 rounded-md mb-4 hover:shadow-[0_0_10px_#00FF88] transition">
      <h3 className="text-lg font-semibold text-[#00FF88]">{item.title}</h3>
      <p className="text-sm text-[#BDBDBD] line-clamp-3">{item.description}</p>
      <div className="mt-2 flex items-center justify-between">
        <a className="text-sm text-[#EDEDED] underline" href={item.link || '#'} target="_blank" rel="noreferrer">Read</a>
        <span className="text-xs text-[#888]">{item.source || ''}</span>
      </div>
    </article>
  );
}

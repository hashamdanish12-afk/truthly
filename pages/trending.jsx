import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import rssSources from '../rssSources';

export default function Trending() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function load() {
      const all = [];
      for (const s of rssSources) {
        try {
          const res = await fetch(`/api/rss?url=${encodeURIComponent(s.url)}`);
          const j = await res.json();
          if (j.ok && j.items) {
            all.push(...j.items.map((it) => ({ ...it, source: s.name })));
          }
        } catch {}
      }
      const grouped = {};
      for (const it of all) {
        const key = (it.title || '').slice(0, 120);
        grouped[key] = grouped[key] ? grouped[key] + 1 : 1;
      }
      const ranked = Object.keys(grouped).sort((a, b) => grouped[b] - grouped[a]);
      const mapped = ranked.map((k) => all.find((x) => (x.title || '').startsWith(k))).filter(Boolean);
      setItems(mapped.slice(0, 30));
    }
    load();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl text-[#00FF88] font-bold mb-4">Trending</h1>
      {items.map((it, i) => <ArticleCard key={i} item={it} />)}
    </Layout>
  );
}

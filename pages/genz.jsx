import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import rssSources from '../rssSources';

export default function GenZ() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function load() {
      const picks = rssSources.filter(s => /reddit|youtube|substack|popbase|genz/i.test(s.name + s.url));
      const all = [];
      for (const s of picks) {
        try {
          const res = await fetch(`/api/rss?url=${encodeURIComponent(s.url)}`);
          const j = await res.json();
          if (j.ok && j.items) all.push(...j.items.map(it => ({ ...it, source: s.name })));
        } catch {}
      }
      const sorted = all.sort((a,b) => new Date(b.pubDate||0)-new Date(a.pubDate||0));
      setItems(sorted.slice(0, 50));
    }
    load();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl text-[#00FF88] font-bold mb-4">Gen Z — What's Poppin'</h1>
      {items.map((it, i) => <ArticleCard key={i} item={it} />)}
    </Layout>
  );
}

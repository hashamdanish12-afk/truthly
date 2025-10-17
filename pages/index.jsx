import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ArticleCard from '../components/ArticleCard';
import rssSources from '../rssSources';

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const all = [];
        for (const s of rssSources.slice(0, 12)) {
          try {
            const res = await fetch(`/api/rss?url=${encodeURIComponent(s.url)}`);
            const j = await res.json();
            if (j.ok && j.items) {
              const mapped = j.items.map((it) => ({ ...it, source: s.name }));
              all.push(...mapped);
            }
          } catch (e) {
            // ignore single feed errors
          }
        }
        const sorted = all.sort((a, b) => new Date(b.pubDate || 0) - new Date(a.pubDate || 0));
        setItems(sorted.slice(0, 30));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <Layout>
      <section className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <h2 className="text-2xl text-[#00FF88] font-bold mb-4">Top Trending</h2>
            {loading ? <p>Loading...</p> : <ArticleCard item={items[0] || { title: 'No items' }} />}
          </div>
          <div>
            <h3 className="text-xl text-[#00FF88] mb-4">Quick Picks</h3>
            {items.slice(1, 6).map((it, i) => <ArticleCard key={i} item={it} />)}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-[#00FF88] font-bold mb-4">For You</h2>
        {items.slice(6).map((it, i) => <ArticleCard key={i} item={it} />)}
      </section>
    </Layout>
  );
}

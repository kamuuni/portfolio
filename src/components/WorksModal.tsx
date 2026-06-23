import { useState } from 'react';

type Work = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  github: string | null;
  image: string | null;
  why: string;
  what: string;
};

const works: Work[] = [
  {
    title: 'Synapse',
    subtitle: 'チーム開発・ハッカソン',
    description:
      'チームのコンディションと心理的安全性を可視化するプラットフォーム。ハッカソンでチーム開発を重ねる中で、「チームの状態が見えないまま進んでいる」という課題を発見し、プロダクト化しました。',
    tags: ['Next.js', 'Laravel', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/posse-ap/teamdev-2026-posse3-team5C',
    image: '/work-synapse.png',
    why: 'チームの状態を可視化することで、心理的安全性を高めながら開発を進められると考えた。',
    what: '設計力・チーム開発・プロダクト思考',
  },
  {
    title: 'Laravel クイズサイト',
    subtitle: '自力実装・バックエンド',
    description:
      'PHP / Laravel で構築したクイズサービス。生成AIを一切使わずに自力で実装することで、フレームワークの動作原理を深く理解することを目的としました。',
    tags: ['PHP', 'Laravel'],
    github: null,
    image: null,
    why: 'ブラックボックスのまま使うのではなく、「なぜ動くか」を説明できる状態を目指した。',
    what: '自力実装・バックエンド基礎・フレームワーク理解',
  },
  {
    title: '空き家 LINE 通知',
    subtitle: '課題発見 → 軌道修正',
    description:
      '空き家情報をLINEで通知するツールとして始まり、ユーザーの声を聞く中でマッチングサービスへと進化。課題の本質を見極めながらピボットする経験を積みました。',
    tags: ['Python', 'Next.js', 'Firebase'],
    github: 'https://github.com/kamuuni/akiya-now',
    image: null,
    why: '「誰の何を解決するか」を常に問い直し、ピボットする判断ができた。',
    what: '課題発見・アジャイル思考・ユーザー視点',
  },
];

const tagColors: Record<string, string> = {
  'Next.js': 'bg-sky-50 text-sky-700 border-sky-200',
  'Laravel': 'bg-red-50 text-red-700 border-red-200',
  'PostgreSQL': 'bg-blue-50 text-blue-700 border-blue-200',
  'Docker': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'PHP': 'bg-violet-50 text-violet-700 border-violet-200',
  'Python': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'Firebase': 'bg-orange-50 text-orange-700 border-orange-200',
};

export default function WorksModal() {
  const [selected, setSelected] = useState<Work | null>(null);

  return (
    <>
      {/* Card grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {works.map(work => (
          <article
            key={work.title}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-md transition-all group cursor-pointer hover:-translate-y-1"
            style={{ borderColor: '#e0ece6' }}
            onClick={() => setSelected(work)}
          >
            {/* Thumbnail */}
            <div className="aspect-video overflow-hidden" style={{ background: 'linear-gradient(135deg, #e8f4ee 0%, #d1e8db 100%)' }}>
              {work.image ? (
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-wrap items-center justify-center gap-1 p-4">
                  {work.tags.map(tag => (
                    <span key={tag} className={`text-xs font-mono border rounded px-2 py-0.5 ${tagColors[tag] ?? 'bg-stone-50 text-stone-600 border-stone-200'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Card footer */}
            <div className="p-4">
              <h3 className="font-bold text-base mb-1" style={{ color: '#111f17' }}>{work.title}</h3>
              <p className="text-xs font-mono" style={{ color: '#6b9e84' }}>{work.subtitle}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{ backgroundColor: 'rgba(17,31,23,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row"
            onClick={e => e.stopPropagation()}
          >
            {/* Left: detail */}
            <div className="md:w-2/5 p-8 overflow-y-auto flex flex-col">
              {/* Close button (mobile) */}
              <button
                className="self-end md:hidden mb-4 text-stone-400 hover:text-stone-600"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>

              <p className="font-mono text-xs mb-3" style={{ color: '#6b9e84' }}>{selected.subtitle}</p>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#111f17' }}>{selected.title}</h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#3d6651' }}>{selected.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selected.tags.map(tag => (
                  <span key={tag} className={`text-xs font-mono border rounded-full px-3 py-1 ${tagColors[tag] ?? 'bg-stone-50 text-stone-600 border-stone-200'}`}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Why */}
              <div className="border-l-2 border-emerald-400 pl-4 mb-6">
                <p className="font-mono text-xs text-emerald-600 mb-1">// 技術選定の理由</p>
                <p className="text-sm leading-relaxed" style={{ color: '#3d6651' }}>{selected.why}</p>
              </div>

              <p className="text-xs mb-6" style={{ color: '#6b9e84' }}>
                <span style={{ color: '#3d6651' }}>示せること：</span>{selected.what}
              </p>

              {/* Links */}
              <div className="flex gap-3 mt-auto">
                {selected.github && (
                  <a
                    href={selected.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-stone-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            </div>

            {/* Right: screenshot */}
            <div className="md:w-3/5 relative bg-stone-100 flex items-center justify-center min-h-48">
              {/* Close button (desktop) */}
              <button
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors shadow"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>

              {selected.image ? (
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-cover object-top"
                  style={{ maxHeight: '90vh' }}
                />
              ) : (
                <div className="flex flex-col items-center gap-3 p-12" style={{ color: '#6b9e84' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="3" width="20" height="14" rx="2"/>
                    <path d="M8 21h8M12 17v4"/>
                  </svg>
                  <p className="font-mono text-sm">// screenshot coming soon</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

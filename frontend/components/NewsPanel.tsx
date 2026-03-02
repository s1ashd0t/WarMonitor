'use client'

import { useDashboardStore } from '@/store/dashboardStore'
import { FiTrendingUp, FiCalendar } from 'react-icons/fi'

export default function NewsPanel({ isLoading }: { isLoading: boolean }) {
  const { articles } = useDashboardStore()

  if (isLoading) {
    return (
      <div className="p-4 flex gap-3 overflow-x-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-shrink-0 w-80 h-48 bg-geopolitical-light rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto p-4 flex gap-3 h-full">
      {articles.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <p className="text-sm">No articles available</p>
        </div>
      ) : (
        articles.slice(0, 10).map((article) => (
          <div
            key={article.id}
            className="flex-shrink-0 w-80 bg-geopolitical-light rounded-lg border border-gray-700 hover:border-blue-500 transition overflow-hidden group cursor-pointer"
          >
            {article.imageUrl && (
              <div className="h-32 bg-cover bg-center overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
            )}
            <div className="p-3 flex flex-col h-32">
              <h3 className="font-semibold text-sm line-clamp-2 mb-1">{article.title}</h3>
              <p className="text-xs text-gray-400 line-clamp-2 mb-2">{article.description}</p>

              <div className="mt-auto flex gap-2 items-center text-xs text-gray-500">
                <span className="bg-geopolitical-dark px-2 py-1 rounded">{article.source}</span>
                <span className={`px-2 py-1 rounded ${
                  article.sentiment === 'negative' ? 'bg-red-900/30 text-red-300' :
                  article.sentiment === 'positive' ? 'bg-green-900/30 text-green-300' :
                  'bg-gray-900/30 text-gray-300'
                }`}>
                  {article.sentiment}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

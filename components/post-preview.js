import DateFormatter from '../components/date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  slug,
}) {
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div className="flex-shrink-0">
        <img 
          className="h-48 w-full object-cover"
          alt={`blog: ${title}`}
          src={coverImage}
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
          <div className="flex-1">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="text-xl font-semibold text-gray-900">{title}</a>
            </Link>
          </div>
        <div className="mt-3 flex items-center">
          <div className="ml-3">
            <div className="flex space-x-1 text-sm text-gray-500">
              <DateFormatter dateString={date} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

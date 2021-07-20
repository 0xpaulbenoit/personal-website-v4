import DateFormatter from '../components/date-formatter'
import PostTitle from './page-title'
import Image from 'next/image'

export default function PostHeader({ title, coverImage, date }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 mt-8">
        <div className="flex justify-center">
          <a href="/">
            <div className="focus-within:ring-2 focus-within:ring-offset-2 group block rounded-lg overflow-hidden">
              <img
                src={coverImage}
                alt={`cover photo for ${title}`}
                className="group-hover:opacity-75 object-cover pointer-events-none"
              >
              </img>
            </div>
          </a>
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 mt-2 text-sm font-medium text-gray-900">
          <em className="italic">
            <DateFormatter dateString={date} />
          </em>
        </div>
      </div>
    </>
  )
}

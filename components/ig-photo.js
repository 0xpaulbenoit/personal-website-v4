import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'

export default function IgPhoto({ src, image_url, alt_text }) {
  const image = (
    <Image
      src={src}
      alt={`${alt_text}`}
      className="group-hover:opacity-75 object-cover pointer-events-none"
      layout="fill"
    />
  )
  return (
    <div>
      <li className="relative">
        <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500 
        group block w-full aspect-w-5 aspect-h-5 rounded-lg overflow-hidden">
          <a href={`${image_url}`} target="_blank">
            <img src={src} alt={`${alt_text}`} className="group-hover:opacity-75 object-cover pointer-events-none" loading="lazy" />
          </a>
        </div>
      </li>
    </div>
  )
}
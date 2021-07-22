import Head from 'next/head'
import Image from 'next/image'
import backgroundPic from '../public/background.jpeg'
import profilePic from '../public/paul.jpg'
import { getFeaturedPosts } from '../lib/api'
import PostPreview from '../components/post-preview'


export default function Home({ featuredPosts }) {
  return (
    <div>
      <main>
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100"></div>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="absolute inset-0">
              <Image
                src={backgroundPic}
                alt="Photo which I took of the Tetons"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gray-700 mix-blend-multiply"></div>
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8 flex justify-center">
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white" id="bio-card">
                <div className="w-32 h-32 rounded-full mx-auto mt-2">
                  <Image
                    src={profilePic}
                    alt="headshot of Paul Benoit"
                  />
                </div>

                <div className="px-6 py-4">
                  <p className="text-gray-700 text-lg">
                    Greetings,
                  </p>
                  <p className="text-gray-700 text-lg mt-2">
                    My name is Paul Benoit, and I build cybersecurity software.
                  </p>
                  <p className="text-gray-700 text-lg mt-2">
                    I work as a Staff Software Engineer for the 
                    <a href="https://www.paloaltonetworks.com/cortex/managed-threat-hunting"
                      className="pl-1 pr-1 text-blue-500 hover:underline">
                      Managed Threat Hunting
                    </a>
                    team at Palo Alto Networks.
                  </p>
                  <p className="text-gray-700 text-lg mt-2">
                    Here is
                    <a href="https://paul-benoit-public.s3.amazonaws.com/paul_benoit_resume.pdf"
                      className="text-blue-500 hover:underline pl-1">my resume.</a>
                    <a href="mailto:paul@paulbenoit.com"
                      className="text-blue-500 hover:underline pl-1">Contact me</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                From The Blog
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                My projects and things I've learned. 
              </p>
            </div>
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              {featuredPosts.map((post) => (
                  <PostPreview
                    key={post.slug}
                    title={post.title}
                    coverImage={post.coverImage}
                    date={post.date}
                    slug={post.slug}
                  />
                ))}
            </div>
            <div className="mt-7 text-center">
              <a href="/posts"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base 
                font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-green-500">View More</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const featuredPosts = getFeaturedPosts([
    'title',
    'date',
    'slug',
    'coverImage',
  ])

  return {
    props: { featuredPosts },
  }
}
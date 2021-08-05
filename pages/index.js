import Head from 'next/head'
import Image from 'next/image'
import backgroundPic from '../public/background.jpeg'
import profilePic from '../public/paul.jpg'
import { getFeaturedPosts } from '../lib/api'
import PostPreview from '../components/post-preview'
import IgPhoto from '../components/ig-photo'
import Footer from '../components/footer'


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
                    My name is Paul Benoit.
                  </p>
                  <p className="text-gray-700 text-lg mt-2">
                    I build cybersecurity software while traveling and working remotely. 
                  </p>
                  <p className="text-gray-700 text-lg mt-2">
                    I spent most of my free time outdoors.
                  </p>
                  <div>
                    <a href="mailto:paul@paulbenoit.com"
                          className="text-blue-500 hover:underline text-gray-700 text-lg mt-2 float-right mb-3">Contact me</a>
                    <a href="https://paul-benoit-public.s3.amazonaws.com/paul_benoit_resume.pdf"
                      className="text-blue-500 hover:underline text-gray-700 text-lg mt-2 float-left mb-3">Hire me?</a>
                  </div>
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              From The Gram
            </h2>
            <p className="mt-2 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-3">
              An unrealistic highlight reel
            </p>
          </div>
          <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            <IgPhoto
              src="/ig/rainier2.jpeg"
              image_url="https://www.instagram.com/p/CRNqfz-pIv-/"
              alt_text="me climbing rainier"
            />
            <IgPhoto
              src="/ig/mt.jpeg"
              image_url="https://wwwclimbing.instagram.com/p/CKxXy84pnWM"
              alt_text="hiking in Montana"
            />
            <IgPhoto
              src="/ig/whistler.jpeg"
              image_url="https://www.instagram.com/p/CKxXy84pnWM"
              alt_text="my girlfriend and I in Whistler, Canada"
            />
            <IgPhoto
              src="/ig/w2.jpg"
              image_url="https://www.instagram.com/p/B7hjYWVpol7/"
              alt_text="Climbing Mt Washington in a blizzard"
            />
            <IgPhoto
              src="/ig/horse.jpeg"
              image_url="https://www.instagram.com/p/B2b7dANgMLU/"
              alt_text="Riding a horse in Arizona"
            />
            <IgPhoto
              src="/ig/internet.jpeg"
              image_url="https://www.instagram.com/p/ByTRm_2gz0L/"
              alt_text="Me pointing at the Internet store"
            />
            <IgPhoto
              src="/ig/zion.jpeg"
              image_url="https://www.instagram.com/p/BVVjnV0lMLF/"
              alt_text="Me walking through the Zion Narrows"
            />
            <IgPhoto
              src="/ig/sweden.jpeg"
              image_url="https://www.instagram.com/p/BeBCxN2FdbC/"
              alt_text="My friend and I dogsledding in Northern Sweden"
            />
          </ul>
        </div>
      </main>
      <Footer />
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
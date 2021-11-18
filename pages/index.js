import Image from 'next/image'
import backgroundPic from '../public/background.jpeg'
import { getAllPosts } from '../lib/api'
import PostPreview from '../components/post-preview'
import Footer from '../components/footer'
import Header from '../components/header'
import Head from 'next/head'


export default function Home({ allPosts }) {
  return (
    <div>
      <Head>
        <title>Paul Benoit</title>
        <meta
          name="description"
          content="Paul Benoit's blog"
        />
        <script src="https://bloc-party-polished.paulbenoit.com/script.js" data-site="DGRLZZDQ" defer></script>
      </Head>
      <Header />
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
              <h1 className="mt-6 mb-4 block text-3xl text-center leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                Paul Benoit
              </h1>
            </div>
          </div>
        </div>

        <div className="relative bg-gray-50 pt-10 pb-10 px-4 sm:px-6 lg:pt-15 lg:pb-15 lg:px-8">
          <div className="relative max-w-7xl mx-auto">
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              {allPosts.map((post) => (
                <PostPreview
                  key={post.slug}
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  slug={post.slug}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'coverImage',
  ])

  return {
    props: { allPosts },
  }
}
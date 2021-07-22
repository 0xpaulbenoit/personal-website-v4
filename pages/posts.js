import PostPreview from '../components/post-preview'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import PageTitle from '../components/page-title'

export default function Index({ allPosts }) {
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout>
        <Head>
          <PageTitle>Blog Posts</PageTitle>
        </Head>
        <div class="relative bg-gray-50 pt-10 pb-10 px-4 sm:px-6 lg:pt-15 lg:pb-15 lg:px-8">
          <div class="relative max-w-7xl mx-auto">
            <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
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
      </Layout>
    </>
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
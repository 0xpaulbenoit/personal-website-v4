import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import Subscribe from '../../components/subscribe'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import PageTitle from '../../components/page-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'

export default function Post({ post, morePosts, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PageTitle>Loading…</PageTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {post.title}
                </title>
                <meta property="og:image" content={post.ogImage.url} />
                <script src="https://bloc-party-polished.paulbenoit.com/script.js" data-site="DGRLZZDQ" defer></script>
              </Head>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-8">
                <a
                  href="/"
                  className="text-lg font-bold text-blue-500 underline hover:no-underline"
                >
                  paulbenoit.com
                </a>
              </div>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
              />
              <PostBody content={post.content} />
            </article>
            <Subscribe />
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

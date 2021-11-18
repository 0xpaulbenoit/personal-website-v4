import Footer from '../components/footer'
import Header from '../components/header'
import Meta from '../components/meta'

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

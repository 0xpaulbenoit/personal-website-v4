import Image from 'next/image'
import IgPhoto from '../components/ig-photo'
import Footer from '../components/footer'
import Header from '../components/header'
import aboutPic from '../public/about.jpg'



export default function About() {
  return (
    <div>
      <Header />
      <main>
      <div className="bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
            <div>
              <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">About Me</h3>
            </div>
          </div>
          <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="relative lg:row-start-1 lg:col-start-2">
              <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                <figure>
                    <Image
                      className="rounded-lg shadow-lg object-cover object-center"
                      src={aboutPic}
                      alt="Me in the Canadian Rockies"
                    />
                </figure>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
                <div className="text-base max-w-prose mx-auto lg:max-w-none">
                  <p className="text-lg text-gray-500">I'm a Software Engineer at Palo Alto Networks.</p>
                </div>
                <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                  <p>I'm semi-nomadic, spending most of my time bouncing between mountain towns in the United States. When I'm not working, I'm usually climbing mountains.</p>
                  <p>Here is my <a href="https://s3.amazonaws.com/paulbenoit.com/paul_benoit_resume.pdf" className="text-blue-500 hover:underline">Resume</a></p>
                  <p><a href="mailto:paul@paulbenoit.com" className="text-blue-500 hover:underline">Contact me</a></p>
                </div>
              </div>
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
              src="/ig/canada.jpeg"
              image_url="https://www.instagram.com/p/CTffW0RHKLr/"
              alt_text="Mt Nibloc in Canada"
            />
            <IgPhoto
              src="/ig/rainier2.jpeg"
              image_url="https://www.instagram.com/p/CRNqfz-pIv-/"
              alt_text="me climbing rainier"
            />
            <IgPhoto
              src="/ig/mt.jpeg"
              image_url="https://www.instagram.com/p/CKxXy84pnWM"
              alt_text="hiking in Montana"
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
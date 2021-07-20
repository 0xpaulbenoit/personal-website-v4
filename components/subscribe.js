export default function Subscribe() {
  return (
    <div>
      <div className="mt-10 text-center">
        <p className="text-gray-700 text-lg mb-4">
          To get an alert when I write a new blog post, you can subscribe below: 
        </p>
        <form 
          className="mt-4 mx-auto sm:flex sm:max-w-md lg:mt-0"
          action="https://tinyletter.com/paulbenoit"
          method="post"
          target="popupwindow"
          onsubmit="window.open('https://tinyletter.com/paulbenoit', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true">
          <label for="email" className="sr-only">Email address</label>
          <input 
            type="email"
            name="email"
            id="tlemail"
            autocomplete="email"
            required
            className="appearance-none min-w-0 w-full bg-white border border-gray-300 py-2 px-4 text-base rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:placeholder-gray-400 sm:max-w-xs"
            placeholder="Email" />
          <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
            <button type="submit" className="w-full bg-green-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
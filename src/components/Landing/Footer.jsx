export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">FuelOps</h3>
          <p className="text-sm text-gray-400">Smart fuel management for a better tomorrow.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Product</h4>
          <ul className="text-sm space-y-1">
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">API</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Support</h4>
          <ul className="text-sm space-y-1">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Docs</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Company</h4>
          <ul className="text-sm space-y-1">
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} FuelOps. All rights reserved.
      </div>
    </footer>
  )
}

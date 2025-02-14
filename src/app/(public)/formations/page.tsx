import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { FormationsContent } from './formation'

export default function Formations() {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-8">Nos formations</h1>
          <FormationsContent></FormationsContent>
        </div>
      </main>
      <Footer />
    </div>
  )
}


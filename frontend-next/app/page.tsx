import Image from 'next/image'
import Link from 'next/link'
import Navbar from './components/navbar'

export default function Home() {
  return (
    <>
    <Navbar />
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello world</h1>
      <Link href="/students">Students</Link>
      <Link href="/users/new">Register</Link>
      <Link href="/users/login">Login</Link>
    </main>
    </>
  )
}

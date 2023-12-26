import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello world</h1>
      <Link href="/students">Students</Link>
      <Link href="/users/new">Register</Link>
      <Link href="/users/login">Login</Link>
    </main>
  )
}

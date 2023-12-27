'use client'

import Link from "next/link"
import {useState} from 'react'
import { useRouter } from "next/navigation"


export default function Navbar() {

	const [search, setSearch] = useState('')
	const router = useRouter()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearch('')
        router.push(`/${search}/`)
    }


    return (
        <nav className="bg-slate-600 p-4 flex justify-between flex-col md:flex-row sticky top-0 drop-shadow-xl">
            <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
                <Link href="/">SearchWiki!</Link>
            </h1>
            <form className="w-50 flex justify-center md:justify-between" onSubmit={handleSubmit}>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white p-2 w-80 text-xl rounded-xl"
                placeholder="Search"
            />
            <button className="p-2 text-xl rounded-xl bg-slate-300 ml-2 font-bold">
                🚀
            </button>
        </form>
        </nav>
    )
}
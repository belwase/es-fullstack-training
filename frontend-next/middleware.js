import { NextResponse } from 'next/server'
import  { NextRequest } from 'next/server'


export function middleware(request){

	//console.log("request", request);
	console.log(request.url)
	//var token = request.headers.authorization;

	if (request.nextUrl.pathname.startsWith('/users/login')) {
	    return NextResponse.rewrite(new URL('/users/new', request.url))
	 }else{
	 	return NextResponse.next();
	 }

}

export const config = {
  matcher: ['/users/login', '/users/:path*'],
}

import { NextResponse } from "next/server";

// This is an asynchronous middleware function that takes a request (req) and an event (ev) as parameters.
export async function middleware(req, ev) {
  // Extract the href and pathname properties from the request's nextUrl object.
  const { pathname } = req.nextUrl;
  
  // Log the pathname and href to the console for debugging purposes.
  console.log('Middleware pathname:', pathname,'File:', __filename);
  //console.debug('Middleware request href:', href);

  // Continue to the next middleware or the actual request handler.
  return NextResponse.next();
}

// Configuration object for the middleware, specifying that it should run on the '/login' and '/register' routes.
export const config = {
  matcher: ['/login', '/register'],
};
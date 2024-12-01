import { NextResponse } from "next/server";
import checkAuth from "./app/actions/checkAuth";

// This is an asynchronous middleware function that takes a request (req) and an event (ev) as parameters.
export async function middleware(req, ev) {
  // Extract the href and pathname properties from the request's nextUrl object.
  const { pathname } = req.nextUrl;
  // Log the pathname and href to the console for debugging purposes.
  console.log('**Middleware** :', pathname,'File:', __filename);

  // start of my main code 
  const {isAuthenticated} = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login',req.url));
  }
  // Continue to the next middleware or the actual request handler.
  return NextResponse.next();
}

// Configuration object for the middleware, specifying that it should run on the '/login' and '/register' routes.
export const config = {
  //matcher: ['/login', '/register'],
  matcher: ['/bookings'],
};
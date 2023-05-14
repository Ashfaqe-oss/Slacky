import {withAuth} from 'next-auth/middleware'

export default withAuth ({
    pages: {
        signIn: "/"
    }
})

//config to protect routes
export const config = {
    matcher: [
        "/users/:path*",
        "/conversations/:path*"
    ]
}
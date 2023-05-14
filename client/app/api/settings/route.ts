import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(
    request: Request,
) {
    try {
         const currUser = await getCurrentUser()
         const body = await request.json() //parsing the body into json

         const {
            name, image
         } = body

         if(!currUser?.id) {
            return new NextResponse('Unauthorized', {status: 401})
         }

         const updatedUser = await prisma.user.update({
            where: {
                id: currUser.id
            },
            data: {
                image: image,
                name: name
            }
         })

         return NextResponse.json(updatedUser)
    } catch (error: any) {
        console.log('PROFILE_SETTING_UPDATE', error)
        return new NextResponse('Error', {status: 500})
    }
}
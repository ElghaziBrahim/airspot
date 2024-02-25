import bcrypt from "bcrypt"
import prisma from "../../libs/prismadb"
export const POST = async (req: Request) => {
    const body = await req.json()
    console.log(body)
    const { email, name, password } = body
    console.log(`email : ${email} - name : ${name} - password : ${password}`)
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
        data: {
            email, name, hashedPassword
        }
    })
    return new Response(JSON.stringify(user), {
        status: 201
    })

}
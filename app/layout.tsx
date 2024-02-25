import type { Metadata } from 'next'
import { Nunito } from "next/font/google"
import Navbar from './componants/navbar/Navbar'
import RegisterModal from './componants/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './componants/modals/LoginModal'
import getCurrentUser from './api/actions/getCurrentUser'
import RentModal from './componants/modals/RentModal'
const font = Nunito({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Airspot',
  description: 'Aitspot - Book Now',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal /* actionLabel='Submit' */ /* isOpen title="hello world" */ />
        <LoginModal />
        <RentModal />



        <Navbar currentUser={currentUser} />

        {children}
      </body>
    </html>
  )
}

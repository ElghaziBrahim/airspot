"use client"
import styles from "../../../styles/navabar.module.css"
import Container from "../Container"
import Image from "next/image"
import { BiSearch } from "react-icons/bi"
import { AiOutlineMenu } from "react-icons/ai"
import { useCallback, useState } from "react"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/userLoginModal"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"
import { SafeUser } from "@/app/api/types"
import Categories from "./Categories"
import { useRouter } from "next/navigation"
import useRentModal from "@/app/hooks/useRentModal"

interface NavbarProps {
    currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
    const router = useRouter()
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const rentModel = useRentModal()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleOpen = () => {
        setIsMenuOpen((prev) => !prev)
    }
    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen()
        }
        rentModel.onOpen()

    }, [currentUser, loginModal, rentModel])

    return (
        <div className={styles.navbar}>

            <Container>
                <div className={styles.navbar_container} >
                    <div className={styles.logo_container}>
                        <Image
                            onClick={() => router.push("/")}
                            className={styles.logo_image}
                            alt="logo image"
                            width="100"
                            height="30"
                            src="/images/logo.png"
                        />
                    </div>
                    <div className={styles.search_contrainer}>
                        <div className={styles.search}>

                            Anywhere
                        </div >
                        <div className={styles.search}>
                            Any Week
                        </div>
                        <div className={styles.search}>
                            <div className={styles.add_guests}>Add Guests</div>
                        </div>

                        <div className={styles.search_icon}>
                            <BiSearch size={18} />
                        </div>
                        <div className={styles.rent} onClick={onRent} >
                            Airspot now
                        </div>
                    </div>
                    <div className={styles.userMenu_container}>
                        <div>

                            <div className={styles.menuIcon_Avatar} onClick={toggleOpen}>
                                <AiOutlineMenu className={styles.menu_icon} />
                                <Image
                                    className={styles.avatar}
                                    alt="avatar"
                                    width={30}
                                    height={30}
                                    src={currentUser?.image || "/images/avatar.jpg"}

                                />
                            </div>
                        </div>

                        {
                            isMenuOpen && (
                                <div className={styles.openedMenu}>
                                    {
                                        currentUser ? (
                                            <>
                                                <div className={styles.menu_item} /* onClick={loginModal.onOpen} */>
                                                    My trips
                                                </div>

                                                <div className={styles.menu_item} /* onClick={loginModal.onOpen} */>
                                                    My favorites
                                                </div>

                                                <div className={styles.menu_item} onClick={() => { setIsMenuOpen(false); onRent() }}>
                                                    Airspot now
                                                </div>

                                                <div className={styles.menu_item} onClick={() => signOut()}>
                                                    Logout
                                                </div>
                                            </>


                                        ) : (
                                            <>
                                                <div className={styles.menu_item} onClick={() => { setIsMenuOpen(false); loginModal.onOpen() }}>
                                                    Login
                                                </div>
                                                <div className={styles.menu_item} onClick={() => { setIsMenuOpen(false); registerModal.onOpen() }}>
                                                    Sign Up
                                                </div>
                                            </>
                                        )
                                    }

                                </div>
                            )
                        }

                    </div>

                </div>
            </Container>
            <Categories />

        </div>
    )
}

export default Navbar

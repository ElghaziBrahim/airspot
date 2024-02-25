"use client"
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useState, useCallback } from 'react'
import { FieldValue, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Modal from './Modal'
import styles from "../../../styles/registerModul.module.css"
import Input from '../inputs/input'

import { signIn } from 'next-auth/react'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/userLoginModal'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
const LoginModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const toggleToRegister = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    signIn('credentials', {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        setIsLoading(false)
        if (callback?.ok) {
          toast.success('Logged In')
          router.refresh()
          loginModal.onClose()
        }
        if (callback?.error) {
          toast.error(callback.error)
        }
      })
  }
  const bodyContent = (
    <div className={styles.heading}>
      <div className={styles.heading_title}>
        Welcome back
      </div>
      <div className={styles.heading_subtitle}>
        Login to your account
      </div>
      <Input
        type='text'
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required

      />


      <Input
        type='password'
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required

      />
    </div>
  )

  const footerContent = (
    <div className={styles.footer}>
      {/* <hr /> */}
      <button
        /* onClick={handleSecondaryAction} */
        onClick={() => signIn("google")}

        className={styles.button}
      >

        <FcGoogle
          size={24}

          className={styles.button_icon}
        />
        Continu with Google
      </button>
      <button
        /* onClick={handleSecondaryAction}  */
        onClick={() => signIn("github")}
        className={styles.button}
      >

        <AiFillGithub
          size={24}
          className={styles.button_icon}
        />
        Continu with Githun
      </button>
      <div className={styles.have_account}>
        <div className={styles.have_account_already}>
          Your first time ?
        </div>
        <div
          className={styles.havae_account_login} onClick={toggleToRegister}
        >
          Create an account
        </div>
      </div>
    </div>
  )
  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Login"
      body={bodyContent}
      footer={footerContent}
      actionLabel="Continue"
      disabled={isLoading}
    /* secondaryAction,
    secondaryActionLabel, */
    />
  )
}

export default LoginModal

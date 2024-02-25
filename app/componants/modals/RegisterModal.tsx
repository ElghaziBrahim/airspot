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
import toast from 'react-hot-toast'
import useLoginModal from '@/app/hooks/userLoginModal'
const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const [isLoading, setIsLoading] = useState(false)

  const toggleToLogin = useCallback(() => {
    registerModal.onClose()
    loginModal.onOpen()
  }, [loginModal, registerModal])

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    console.log(data)
    axios.post('/api/register', data)
      .then(() => {
        registerModal.onClose()
      })
      .catch((error) => toast.error("soething went wrong"))
      .finally(() => setIsLoading(false))
  }
  const bodyContent = (
    <div className={styles.heading}>
      <div className={styles.heading_title}>
        Welcome to AitSpot
      </div>
      <div className={styles.heading_subtitle}>
        Create an Account
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
        type='text'
        id="name"
        label="Name"
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
        onClick={() => signIn("google")}

        /* onClick={handleSecondaryAction} */
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
          Already have and account?
        </div>
        <div
          className={styles.havae_account_login} onClick={toggleToLogin}
        >
          Login
        </div>
      </div>
    </div>
  )
  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
      body={bodyContent}
      footer={footerContent}
      actionLabel="Continue"
      disabled={isLoading}
    /* secondaryAction,
    secondaryActionLabel, */
    />
  )
}

export default RegisterModal

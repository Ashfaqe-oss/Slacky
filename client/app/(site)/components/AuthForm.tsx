'use client'; //establish as a client component

import AuthSocialButton from '@/app/components/AuthSocialButton';
import Button from '@/app/components/Button';
import Input from '@/app/components/inputs/input';
import { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { BsGithub, BsGoogle } from 'react-icons/bs'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const session = useSession()
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>('REGISTER')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (session?.status === 'authenticated') {
      console.log('Authed ')
      router.push('/users')
    }
  }, [session?.status, router])

  const toggleVariant = useCallback(() => {
    variant === 'LOGIN' ? setVariant('REGISTER') : setVariant('LOGIN')
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: {
      errors, //destructruing formSatate for only errors
    } } = useForm<FieldValues>({
      defaultValues: {
        name: '',
        email: '',
        password: '',
      }
    });

  const onSubmit: SubmitHandler<FieldValues> = (data) => { // after the : the typescript part of function
    setIsLoading(true)

    if (variant === 'REGISTER') {
      //axios register
      axios.post('/api/register', data)
        .then(() => signIn('credentials', data))
        .catch(() => toast.error('Something went wrong! try again '))
        .finally(() => setIsLoading(false))
      // console.log('registered')
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials!');
          }

          if (callback?.ok && !callback.error) {
            // router.push('/conversations')
            toast.success('Logged in')
          }
        })
        .finally(() => setIsLoading(false))
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true)
    //next auth socials log in 

    signIn(action, { redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error('Invalid credentials!')

      }
      if (callback?.ok) {
        toast.success('Logged in')
        router.push('/users')
      }
    })
  }
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10" >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}> {/* on submit is a react hook form function, handlesubmit passes on the data object */}
          {variant === 'REGISTER' && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name"
              label="Name"
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            label="Email address"
            type="email"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            label="Password"
            type="password"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {
                isLoading ? 'Loading ...' : variant === 'LOGIN' ? 'Sign in' : variant === 'REGISTER' ? 'Register' : ''
              }
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>

        </div>

        <div
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          <div>
            {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
          </div>
          <div
            onClick={toggleVariant}
            className="underline cursor-pointer"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
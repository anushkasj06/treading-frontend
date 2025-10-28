import React from 'react'
import "./Auth.css"
import { Button } from '@/components/ui/button'
import SignupForm from './SignUpForm'
import SigninForm from './SignInForm'
import ForgotPassword from './ForgotPasswortForm'
import { useLocation, useNavigate } from 'react-router-dom'

const Auth = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="h-screen relative authContainer">
      <div className="absolute inset-0 bg-[#030712] bg-opacity-50">
        <div
          className="bgBlure absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          flex flex-col justify-center items-center h-[35rem] w-[30rem]
          rounded-md z-50 bg-black bg-opacity-50 shadow-2xl shadow-white p-10 text-white"
        >
          <h1 className="text-5xl font-bold pb-9">Crypto Treading</h1>

          {location.pathname === "/signup" ? (
            <section className="w-full">
              <SignupForm />
              <div className="flex items-center justify-center mt-4 space-x-2">
                <span>Already have an account?</span>
                <Button className="bg-green-600 hover:bg-green-400" onClick={() => navigate("/signin")}>
                  Sign In
                </Button>
              </div>
            </section>
          ) : location.pathname === "/forgot-password" ? (
            <section className="w-full">
              <ForgotPassword />
              <div className="flex items-center justify-center mt-4 space-x-2">
                <span>Don’t have an account?</span>
                <Button onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
              </div>
            </section>
          ) : (
            
            <section className="w-full">
              <SigninForm />
              <div className="flex items-center justify-center mt-4 space-x-2">
                <span>Don’t have an account?</span>
                <Button onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
              </div>
              <div className="items-center justify-center mt-4 space-x-2">
                <span className='flex items-center justify-center mb-3'>Forgot your password?</span>
                <Button variant="outline" className="w-full py-5" onClick={() => navigate("/forgot-password")}>
                  Reset
                </Button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default Auth

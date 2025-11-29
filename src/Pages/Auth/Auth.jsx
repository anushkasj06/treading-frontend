import React from 'react'
import "./Auth.css"
import { Button } from '@/components/ui/button'
import SignupForm from './SignUpForm'
import SigninForm from './SignInForm'
import ForgotPassword from './ForgotPasswortForm'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

const Auth = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isSignup = location.pathname === "/signup"
  const isForgotPassword = location.pathname === "/forgot-password"

  const getFormTitle = () => {
    if (isSignup) return "Create an account"
    if (isForgotPassword) return "Reset your password"
    return "Welcome back"
  }

  const getFormDescription = () => {
    if (isSignup) return "Access premium insights, personalized alerts, and curated trading rooms."
    if (isForgotPassword) return "We’ll send recovery instructions so you can get back into your account."
    return "Sync your trading setup across devices and unlock real-time market intelligence."
  }

  return (
    <div className="authContainer">
      <div className="authGradient" />
      <div className="authNoise" />
      <div className="authGlow authGlow--one" />
      <div className="authGlow authGlow--two" />
      <div className="authGlow authGlow--three" />

      <div className="authShell">
        <div className="authHero">
          <p className="authOverline">Next-gen trading OS</p>
          <h1>Crypto Treading</h1>
          <p className="authSubtitle">
            Execute smarter strategies with sentiment overlays, on-chain signals, and AI-powered recommendations.
            Customize dashboards, automate alerts, and stay ahead of every move.
          </p>
          <div className="authHighlights">
            <div>
              <p className="authHighlightLabel">99.9% uptime</p>
              <span>Redundant data feeds</span>
            </div>
            <div>
              <p className="authHighlightLabel">+120 integrations</p>
              <span>Exchanges & wallets</span>
            </div>
            <div>
              <p className="authHighlightLabel">Real-time</p>
              <span>24/7 support desk</span>
            </div>
          </div>
        </div>

        <Card className="authCard">
          <CardHeader className="space-y-3">
            <CardTitle className="authCardTitle">{getFormTitle()}</CardTitle>
            <CardDescription className="authCardDescription">{getFormDescription()}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {isSignup ? (
              <section className="w-full">
                <SignupForm />
                <div className="authSwitcher">
                  <span>Already have an account?</span>
                  <Button variant="ghost" className="authGhostButton" onClick={() => navigate("/signin")}>
                    Sign in
                  </Button>
                </div>
              </section>
            ) : isForgotPassword ? (
              <section className="w-full">
                <ForgotPassword />
                <div className="authSwitcher">
                  <span>Don’t have an account?</span>
                  <Button variant="ghost" className="authGhostButton" onClick={() => navigate("/signup")}>
                    Create one
                  </Button>
                </div>
              </section>
            ) : (
              <section className="w-full space-y-6">
                <SigninForm />
                <div className="authSwitcher">
                  <span>Don’t have an account?</span>
                  <Button variant="ghost" className="authGhostButton" onClick={() => navigate("/signup")}>
                    Sign up
                  </Button>
                </div>
                <div className="authReset">
                  <div>
                    <p>Forgot your password?</p>
                    <span>We’ll help you recover access in seconds.</span>
                  </div>
                  <Button variant="outline" className="authOutlineButton" onClick={() => navigate("/forgot-password")}>
                    Reset
                  </Button>
                </div>
              </section>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Auth

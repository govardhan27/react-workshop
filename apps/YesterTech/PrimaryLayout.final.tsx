import React, { useEffect } from 'react'
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom'

import api from 'YesterTech/api/index.final'
import PrimaryHeader from 'YesterTech/PrimaryHeader.final'
import PrimaryFooter from 'YesterTech/PrimaryFooter.final'
import { useAuthState } from 'YesterTech/AuthState.final'
import { useShoppingCart } from 'YesterTech/ShoppingCartState.final'
import 'YesterTech/PrimaryLayout.scss'

// Route Targets
import Home from 'YesterTech/Home.final'
import SignupForm from 'YesterTech/SignupForm.final'
import LoginForm from 'YesterTech/LoginForm.final'
import Account from 'YesterTech/Account.final'
import ProductsLayout from 'YesterTech/ProductsLayout.final'
import ProductSubNav from 'YesterTech/ProductSubNav.final'
import Checkout from 'YesterTech/Checkout.final'

function PrimaryLayout() {
  const history = useHistory()
  const { authenticated, dispatch } = useAuthState()
  const { cart } = useShoppingCart()
  const { key } = useLocation()

  // Get the authenticated user
  useEffect(() => {
    let isCurrent = true
    if (!authenticated) {
      api.auth.getAuthenticatedUser().then((user) => {
        if (user && isCurrent) {
          dispatch({ type: 'LOGIN', user })
        }
      })
      return () => {
        isCurrent = false
      }
    }
  }, [authenticated, dispatch])

  // Scroll to the top of the page when pages change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [key])

  return (
    <div className="primary-layout">
      <div>
        <PrimaryHeader />
        <Route path="/products">
          <ProductSubNav />
        </Route>
        <main className="primary-content">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/signup" exact>
              <SignupForm
                onSignup={(user) => {
                  dispatch({ type: 'LOGIN', user })
                  history.push('/products')
                }}
              />
            </Route>
            <Route path="/login" exact>
              <LoginForm
                onAuthenticated={(user) => {
                  dispatch({ type: 'LOGIN', user })
                  history.push('/')
                }}
              />
            </Route>
            <Route path="/products">
              <ProductsLayout />
            </Route>
            {cart.length > 0 && (
              <Route path="/checkout">
                <Checkout />
              </Route>
            )}
            {authenticated && (
              <Route path="/account">
                <Account />
              </Route>
            )}
            <Redirect to="/" />
          </Switch>
        </main>
        <PrimaryFooter />
      </div>
    </div>
  )
}

export default PrimaryLayout

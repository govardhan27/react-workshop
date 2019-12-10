import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Centered from 'YesterTech/Centered'

// Route Targets
import ViewCart from 'YesterTech/ViewCart'
import CheckoutBilling from 'YesterTech/CheckoutBilling'
import CheckoutReview from 'YesterTech/CheckoutReview'

function Checkout({ match }) {
  return (
    <Centered>
      <Switch>
        <Route path={`${match.path}/cart`} exact component={ViewCart} />
        <Route path={`${match.path}/billing`} exact component={CheckoutBilling} />
        <Route path={`${match.path}/review`} exact component={CheckoutReview} />
        <Redirect to={`${match.path}/cart`} />
      </Switch>
    </Centered>
  )
}

export default Checkout

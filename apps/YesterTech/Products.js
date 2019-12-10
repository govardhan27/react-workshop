import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'

import ProductFilters from 'YesterTech/ProductFilters'
import BrowseProducts from 'YesterTech/BrowseProducts'
import ProductProfile from 'YesterTech/ProductProfile'

function Products() {
  return (
    <Columns gutters>
      <Column size={10} className="primary-sidebar">
        <ProductFilters />
      </Column>
      <Column flex>
        <Switch>
          <Route path="/products" exact component={BrowseProducts} />
          <Route path="/products/:productId" component={ProductProfile} />
          <Redirect to="/products" />
        </Switch>
      </Column>
    </Columns>
  )
}

export default Products

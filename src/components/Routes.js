import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Category from './pages/category/index';
import AddCategory from './pages/category/add';
import EditCategory from './pages/category/edit';

import Order from './pages/order/index';

import Product from './pages/product/index';
import AddProduct from './pages/product/add';
import EditProduct from './pages/product/edit';
import ImageProduct from './pages/product/image';

import User from './pages/user/index';

import Discount from './pages/discount/index';
import AddDiscount from './pages/discount/add';
import EditDiscount from './pages/discount/edit';

import Login from './pages/login/login';



class Routes extends React.Component {
  render() {
    return (
      <Switch>

        <Route path='/' exact component={Category} />
        <Route path='/category' component={Category} />
        <Route path='/add-category' component={AddCategory} />
        <Route path="/edit-category/:id" component={EditCategory} />


        <Route path='/product/:page' component={Product} />
        <Route path='/add-product' component={AddProduct} />
        <Route path='/edit-product/:id' component={EditProduct} />
        <Route path='/image-product/:id' component={ImageProduct} />

        <Route path='/order' component={Order} />
        <Route path='/user' component={User} />

        <Route path='/discount' component={Discount} />
        <Route path='/add-discount' component={AddDiscount} />
        <Route path='/edit-discount/:id' component={EditDiscount} />
      </Switch>
    );
  }
}

export default Routes;

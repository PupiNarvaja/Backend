
# This - ecommerce backend

This is an e-commerce backend REST api of an online clothe store.

Users can find products like shirts and jackets.

## Authors

- [@PupiNarvaja](https://github.com/PupiNarvaja) - Juan Manuel Narvaja.


## Demo

https://narvaja-ecommerce.herokuapp.com/


## Deployment

To deploy this project run:

```bash
  npm start
```

If you want dev mode:

```bash
  npm run dev
```

Cluster mode:
```bash
  npm run start:cluster
```




## API Reference

### /api/products

#### Get all products

```bash
  GET /api/products
```

#### Get specific product

```bash
  GET /api/products/:id
```

#### Get a specific category of products

```bash
  GET /api/products/category/:category
```

#### Create new product

```bash
  POST /api/products/:id
```

#### Create new product

```bash
  POST /api/products/:id
```

#### Modify an existing product

```bash
  PUT /api/products/:id
```

#### Delete an existing product

```bash
  DEL /api/products/:id
```

### /api/users

#### Get a specific user's information

```bash
  GET /api/users
```

#### Get all user's information

```bash
  GET /api/users/all
```

### /api/orders

#### Get all existing orders

```bash
  GET /api/orders
```

#### Generate a new order

```bash
  POST /api/orders
```

#### Send an order

```bash
  POST /api/orders/:orderId
```

### /api/cart

#### Get all products saved in a specific cart

```bash
  GET /api/cart
```

#### Add a product to a specific cart

```bash
  POST /api/cart/:prodId
```

#### Delete a specific product from a specific cart

```bash
  DEL /api/cart/:prodId
```

#### Update the quantity of a requested product

```bash
  DEL /api/cart/:operation/:prodId
```

#### Delete an existing cart

```bash
  DEL /api/cart/:prodId
```

## No api routes:

#### Chat
```bash
  /chat
```

#### User's cart
```bash
  /cart
```

#### User's profile
```bash
  /profile
```

#### Specific product
```bash
  /product/:id
```

#### Login
```bash
  /login
```
#### Register
```bash
  /register
```

#### Admin
```bash
  /admin
```

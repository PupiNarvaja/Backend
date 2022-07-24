
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

```http
  GET /api/products
```

#### Get specific product

```http
  GET /api/products/:id
```

#### Get a specific category of products

```http
  GET /api/products/category/:category
```

#### Create new product

```http
  POST /api/products/:id
```

#### Create new product

```http
  POST /api/products/:id
```

#### Modify an existing product

```http
  PUT /api/products/:id
```

#### Delete an existing product

```http
  DEL /api/products/:id
```

### /api/users

#### Get a specific user's information

```http
  GET /api/users
```

#### Get all user's information

```http
  GET /api/users/all
```

### /api/orders

#### Get all existing orders

```http
  GET /api/orders
```

#### Generate a new order

```http
  POST /api/orders
```

#### Send an order

```http
  POST /api/orders/:orderId
```

### /api/cart

#### Get all products saved in a specific cart

```http
  GET /api/cart
```

#### Add a product to a specific cart

```http
  POST /api/cart/:prodId
```

#### Delete a specific product from a specific cart

```http
  DEL /api/cart/:prodId
```

#### Update the quantity of a requested product

```http
  DEL /api/cart/:operation/:prodId
```

#### Delete an existing cart

```http
  DEL /api/cart/:prodId
```
## 


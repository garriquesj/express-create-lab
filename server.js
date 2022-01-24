const express = require('express');
const app = express();

const PORT = 3000;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {    
	console.log(`${req.method} ${req.originalUrl}`);    
	next();//test
});
// db in this case products folder
const products = require('./models/products');
//---set view engine---
app.set ('view engine', 'ejs');
// ----set static files---
//---configure to look in public
// -----use not get----
app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.render('show.ejs');
//   });tried toying with a homepage didnt work
// product index route
app.get('/products', (req, res) => {
res.render('index.ejs', { products:products});
});// render the products object to each .ejs view.

// product create route
// ---gets the form---
app.get('/products/new', (req, res) => {
res.render('newForm.ejs');
});
// ---pushes the forms key value pairs into products---
app.post('/products/', (req, res) => {
  console.log('product created route accessed');
  console.log('Data within req.body: ', req.body);
  products.push(req.body);
  res.redirects('/products')
  //redirects to products which should include the addition
});
// product show route
// ---shows one product at a time id reperesnts index number---
app.get('/products/:id', (req, res) => {
  const productsId = products[req.params.id];
  
  // ---error message experment ---
  // if (error) {
  //   console.log(error);
  //   req.error = error;
  //   return next();
  // };must define error
  res.render('show.ejs', {product: productsId});
});
// render the products object to each .ejs view.




app.listen(PORT, () => {
  console.log("App is running on port: ", PORT);
});



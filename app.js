const express = require('express');
const stripe = require('stripe')('sk_test_UInK2xpt9Pw0caxy5OYK2Oiw');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Static Folder
app.use(express.static(`${__dirname}/public`));

// App route
app.get('/', (req, res) => {
  res.render('index');
})

// Charge route
app.post('/charge', (req, res) => {
  const amount = 77777;
  
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer => stripe.charges.create({
    amount: amount,
    description: 'Ebook Web Dev',
    currency: 'eur',
    customer: customer.id
  }))
  .then(charge => res.render('success'));
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
})
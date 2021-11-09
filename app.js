const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');


app.use(cors());
app.options('*', cors())

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
//app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);



//Routes
const categoriesRoutes = require('./routes/categoryRouter');
const productsRoutes = require('./routes/productRouter');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);




mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'myFirstDatabase'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Development
// app.listen(3000, ()=>{
//    // console.log(api);
//     console.log('server is running http://localhost:3000');
// })

//Production
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log('express is working on port '+port);
})

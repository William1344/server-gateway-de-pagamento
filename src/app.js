require('./database');
const express     = require('express');
const cors        = require('cors');
const bodyParser  = require('body-parser');
const routes      = require('./routes');
const app         = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(routes);
app.listen(process.env.PORT || 3000, () => {
    console.log('Server started!');
});
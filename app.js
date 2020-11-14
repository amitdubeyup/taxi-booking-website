const fs = require('fs');
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const helmet = require('helmet');

const websiteRoutes = require('./app/website-routes/routes-new');
const apiRoutes = require('./app/api-routes/routes');

app.use(cors({ origin: true }));
app.options('*', cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dashboard/dist')));
app.set('views', path.join(__dirname, 'website'));
app.set('view engine', 'ejs');

app.use('/api', apiRoutes);

app.use('/', websiteRoutes);

app.listen(port);

console.log('NSG Taxi is running on http://localhost:' + port);
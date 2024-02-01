const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./src/routes/authRoutes');
const accountRoutes = require('./src/routes/accountRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);

app.get('/', (req, res) => res.send('Hello, i\'m a Helper API!'));

app.listen(port, () => {
    console.log(`Helper server is running on port ${port}`);
});

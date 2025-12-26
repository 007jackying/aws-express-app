const app = require('./app');
require('dotenv').config();
const port = process.env.PORT || 3000;
console.log(port);
console.log(process.env.DATABASE_URL);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


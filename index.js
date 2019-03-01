const server = require('./server');

server.get('/', (req, res, next) => {
  res.send(`
    <h1>Welcome to the Sprint Challenge!</h1>
  `);
});

const port = 5000;
server.listen(port, () => console.log(`\n***** Server running on port ${port} *****\n`));
const app = require('./server');
const port = 3000;

// Subir o servidor
app.listen(port, (error) => {
  if (error) {
    console.log('Deu erro');
    return;
  }
  console.log("Subiu show");
});
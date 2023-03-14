const express = require('express');
require('./server/config/mongoose.config');
/**Se importa el módulo cors, que permite que los clientes de diferentes dominios se comuniquen con el servidor. */
const cors = require('cors');
const app = express();
const port = 8001;


app.use(express.json());
/*Se configura el middleware que se encarga de permitir solicitudes de otros dominios y se agrega a la aplicación Express. */ 
app.use(cors());
app.use(express.urlencoded({ extended: true })); 

const allOfferRoutes = require('./server/routes/offer.routes');
allOfferRoutes(app);

app.listen(port, () => {
    console.log("Server listening at port", port);
})

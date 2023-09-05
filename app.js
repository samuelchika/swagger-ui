import express from 'express';
import api from './routes/api.js'
import categories from './routes/categories.js'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swagger_option } from './swagger_docs/swagger_definitions.js';


const app = express();
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'affi.com backend API',
        description: 'This API provides frontEnd dev on the data to send and receive from the backend',
        version: '1.0.0',
      },
      servers: [{ url: 'http://localhost:4040'}]
    },
    apis: ['./routes/*.js'], // files containing annotations as above
  }


const swaggerDocument = swaggerJSDoc(swagger_option);



app.use("/api-doc",  swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", api);
app.use("/categories", categories);
// define the home route
app.get("/", (req, res) => {
    res.send("We are in the home route")
});

app.use((req, res, next) => {
    console.log("Unkonw Route")
    next(new Error("Something went wrong"));
})

// error route
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({success: false, data: err.message})
})


// listening port
app.listen("4040", () => {
    console.log("Port open on port 4040");
})
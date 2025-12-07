const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const empleadosRoutes = require("./routers/empleados.routes");
const serviciosRoutes = require("./routers/servicios.routes");
app.use ("/api/empleados", empleadosRoutes);
app.use ("/api/servicios", serviciosRoutes);
const PORT = 3000;
app.listen(PORT,()=>{
    console.log("server is running on port", PORT);
})

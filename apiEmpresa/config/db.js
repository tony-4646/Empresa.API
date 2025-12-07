const mysql = require ("mysql");

const cn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "empresa"
}
);

cn.connect((err)=>
{
if (err){
    console.log("error conexion", err);
    return;
}
console.log("Base de datos conectada")
}
);

module.exports = cn;
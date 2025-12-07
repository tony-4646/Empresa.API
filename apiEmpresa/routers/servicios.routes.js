const express = require("express");
const db = require("../config/db"); 
const router = express.Router();
const ntabla = "servicios";

// Obtener todos los servicios 
router.get("/", (req, res) => {
    const sql = `SELECT * FROM ${ntabla}`;
    db.query(sql, (err, lista_servicios) => {
        if (err) {
            console.error("Error al obtener servicios:", err.message);
            return res.status(500).json({ error: err.message });
        } else {
            return res.status(200).json({ servicios: lista_servicios });
        }
    });
});

// Obtener un servicio por ID 
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM ${ntabla} WHERE id = ?`;
    db.query(sql, [id], (err, servicio) => {
        if (err) {
            console.error(`Error al obtener servicio con ID ${id}:`, err.message);
            return res.status(500).json({ error: err.message });
        }
        if (servicio.length === 0) {
            return res.status(404).json({ error: "Servicio no encontrado" });
        }
        
        return res.status(200).json({ servicio: servicio[0] });
    });
});

// Insertar un nuevo servicio 
router.post("/", (req, res) => {
    const { sNombre, sDescripcion } = req.body;
    const sql = `INSERT INTO ${ntabla} (sNombre, sDescripcion) VALUES (?, ?)`;
    db.query(sql, [sNombre, sDescripcion], (err, resultado) => {
        if (err) {
            console.error("Error al insertar servicio:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(
            {
                msg: "Servicio creado correctamente",
                servicio: { id: resultado.insertId, sNombre, sDescripcion }
            }
        )
    });
});

// Actualizar un servicio por ID 
router.put('/:id', (req, res)=>{
    const {id} = req.params;
    const { sNombre, sDescripcion } = req.body;
    const sql = `UPDATE ${ntabla} SET sNombre = ?, sDescripcion = ? WHERE id = ?`;
    db.query(sql, [sNombre, sDescripcion, id], (err, resultado)=>{
        if(err){
            console.error(`Error al actualizar servicio con ID ${id}:`, err.message);
            return res.status(500).json({error: err.message});
        }
        if(resultado.affectedRows === 0){
            return res.status(404).json({message: 'Servicio no encontrado'});
        }
        res.status(200).json({message: 'Servicio actualizado correctamente'});
    });
});

// Eliminar un servicio por ID 
router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    const sql = `DELETE FROM ${ntabla} WHERE id = ?`;
    db.query(sql, [id], (err, resultado)=>{
        if(err){
            console.error(`Error al eliminar servicio con ID ${id}:`, err.message);
            return res.status(500).json({error: err.message});
        }
        if(resultado.affectedRows === 0){
            return res.status(404).json({message: 'Servicio no encontrado'});
        }
        res.status(200).json({message: 'Servicio eliminado correctamente'});
    });
});

module.exports = router;
const express = require("express");
const db = require("../config/db");
const router = express.Router();
const ntabla = "empleados";

// Obtener todos los empleados (GET /empleados)
router.get("/", (req, res) => {
    const sql = `SELECT * FROM ${ntabla}`;
    db.query(sql, (err, lista_empleados) => {
        if (err) {
            console.error("Error al obtener empleados:", err.message);
            return res.status(500).json({ error: err.message });
        } else {
            return res.status(200).json({ empleados: lista_empleados });
        }
    });
});

// Obtener un empleado por ID (GET /empleados/:id)
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM ${ntabla} WHERE id = ?`;
    db.query(sql, [id], (err, empleado) => {
        if (err) {
            console.error(`Error al obtener empleado con ID ${id}:`, err.message);
            return res.status(500).json({ error: err.message });
        }
        if (empleado.length === 0) {
            return res.status(404).json({ error: "Empleado no encontrado" });
        }

        return res.status(200).json({ empleado: empleado[0] });
    });
});

// Insertar un nuevo empleado (POST /empleados)
router.post("/", (req, res) => {
    const { eNombres, eApellidos, eTelefono } = req.body;
    const sql = `INSERT INTO ${ntabla} (eNombres, eApellidos, eTelefono) VALUES (?, ?, ?)`;
    db.query(sql, [eNombres, eApellidos, eTelefono], (err, resultado) => {
        if (err) {
            console.error("Error al insertar empleado:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(
            {
                msg: "Empleado creado correctamente",
                empleado: { id: resultado.insertId, eNombres, eApellidos, eTelefono }
            }
        )
    });
});

// Actualizar un empleado por ID (PUT /empleados/:id)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { eNombres, eApellidos, eTelefono } = req.body;
    const sql = `UPDATE ${ntabla} SET eNombres = ?, eApellidos = ?, eTelefono = ? WHERE id = ?`;
    db.query(sql, [eNombres, eApellidos, eTelefono, id], (err, resultado) => {
        if (err) {
            console.error(`Error al actualizar empleado con ID ${id}:`, err.message);
            return res.status(500).json({ error: err.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.status(200).json({ message: 'Empleado actualizado correctamente' });
    });
});

// Eliminar un empleado por ID (DELETE /empleados/:id)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM ${ntabla} WHERE id = ?`;
    db.query(sql, [id], (err, resultado) => {
        if (err) {
            console.error(`Error al eliminar empleado con ID ${id}:`, err.message);
            return res.status(500).json({ error: err.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.status(200).json({ message: 'Empleado eliminado correctamente' });
    });
});

module.exports = router;
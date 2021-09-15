const express = require('express');
const router = express.Router(); //Express para rutas

const Task = require('../models/task')

//Obtener todas las tareas
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks); //Recibe datos de task de  la base de datos
});

//Obtener solo una tarea
router.get('/:id', async (req, res) => {
    const tasks = await Task.findById(req.params.id);
    res.json(tasks); //Recibe datos de task de  la base de datos
});

//Crear nota nueva
router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({ title, description }); //Agregar valores a objeto nuevo
    await task.save() //Guardar tarea
    res.json({ status: 'Task saved' });
});

//Actualizar nota
router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    const newTask = { title, description };
    await Task.findByIdAndUpdate(req.params.id, newTask);//Obtener id de la tarea que voy a actualizar
    res.json({ status: 'Task Updated' });
});

//Eliminar nota
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({ status: 'Task Deleted' })
});

module.exports = router;
const { Router } = require('express');
const router = Router(); //Express para rutas

const User = require('../models/user')

//Obtener todos los usuarios
router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users); //Recibe datos de task de  la base de datos
});

//Obtener solo un usuario
router.get('/:id', async (req, res) => {
    const users = await User.findById(req.params.id);
    res.json(users); //Recibe datos de task de  la base de datos
});

//Crear usuario
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password }); //Agregar valores a objeto nuevo
    await user.save() //Guardar usuario
    res.json({ status: 'Task saved' });
});

//Actualizar usuario
router.put('/:id', async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = { name, email, password };
    await User.findByIdAndUpdate(req.params.id, newUser);//Obtener id de la tarea que voy a actualizar
    res.json({ status: 'Task Updated' });
});

//Eliminar usuario
router.delete('/:id', async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({ status: 'Task Deleted' })
});

module.exports = router;
const { Router } = require('express')
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.post('/login', [
    check('mail','el mail es requerido').isEmail(),
    check('password','Password es requerido').not().isEmpty(),
    validateFields
],login );

module.exports = router;
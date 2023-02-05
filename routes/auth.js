const { Router } = require('express')
const { check } = require('express-validator');
const { login, googlrSingIn } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.post('/login', [
    check('mail','el mail es requerido').isEmail(),
    check('password','Password es requerido').not().isEmpty(),
    validateFields
],login );

router.post('/google', [
    check('id_token','id_token es nesesario').not().isEmpty(),
    validateFields
],googlrSingIn );

module.exports = router;
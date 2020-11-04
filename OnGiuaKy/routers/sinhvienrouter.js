var controller = require('../controller/sinhvien');
var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/sinhvien',controller.getAllSinhVien);
router.get('/',controller.hello);
router.get('/sinhvien/add',controller.getAddSinhVien);
router.get('/sinhvien/delete/:id',controller.deleteSV);

router.post('/addsinhvien',controller.addSinhVien);
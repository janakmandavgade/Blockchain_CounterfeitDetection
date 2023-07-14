const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(employeesController.getAllEmployees)
    // .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    // .post(verifyRoles(ROLES_LIST.Manufacturer), employeesController.createNewManufacturer)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);
router.route('/mfg')
    .post(verifyRoles(ROLES_LIST.Manufacturer), employeesController.createNewManufacturer)
router.route('/ret')
    .post(verifyRoles(ROLES_LIST.Retailer), employeesController.createNewRetailer)


module.exports = router;
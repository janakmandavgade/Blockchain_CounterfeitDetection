const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if (!employees) return res.status(204).json({ 'message': 'No employees found.' });
    res.json(employees);
}

const createNewEmployee = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required' });
    }

    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const createNewManufacturer = async (req, res) => {
    if (!req?.body?.companyname || !req?.body?.nameofmanufacturer || !req?.body?.addressofcompany || !req?.body?.emailid || !req?.body?.metamaskacc) {
        return res.status(400).json({ 'message': 'All data field are req are required' });
    }

    try {
        const result = await Employee.create({
            // firstname: req.body.firstname,
            // lastname: req.body.lastname
            companyname: req.body.companyname,
            nameofmanufacturer:req.body.nameofmanufacturer,
            addressofcompany:req.body.addressofcompany,
            emailid:req.body.emailid,
            metamaskacc:req.body.metamaskacc
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const createNewRetailer = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required' });
    }

    try {
        const result = await Employee.create({
            // firstname: req.body.firstname,
            // lastname: req.body.lastname,
            companyname: req.body.companyname,
            nameofretailer: req.body.nameofretailer,
            addressofcompany: req.body.companyname,
            emailid: req.body.emailid,
            retid : req.body.retid
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    if (req.body?.companyname) employee.companyname = req.body.companyname;
    if (req.body?.nameofmanufacturer) employee.nameofmanufacturer = req.body.nameofmanufacturer;
    if (req.body?.addressofcompany) employee.addressofcompany = req.body.addressofcompany;
    if (req.body?.emailid) employee.emailid = req.body.emailid;
    if (req.body?.metamaskacc) employee.metamaskacc = req.body.metamaskacc;
    const result = await employee.save();
    res.json(result);
}

const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Employee ID required.' });

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    const result = await employee.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getEmployee = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Employee ID required.' });

    const employee = await Employee.findOne({ _id: req.params.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.params.id}.` });
    }
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
    createNewManufacturer,
    createNewRetailer
}
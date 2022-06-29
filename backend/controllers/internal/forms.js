const {validationResult} = require('express-validator');
const prismaClient = require('../../prismaClient');
const auth = require('../auth.js');

const createForm = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(await auth.auth(req.headers.token,auth.accessLevels.worker)>0){
        try {
            const result = await prismaClient.forms.create({
                data: {
                    path: req.body.path,
                    descr: req.body.description,
                    target: req.body.target,
                    title: req.body.title
                },
            })
        } catch (e) {
            return res.status(422).json({ message: "Could not create form" });
        }
        return res.status(201).json({ message: "The form was created" });
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const getAllForms = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    const result = await prismaClient.forms.findMany({ orderBy: [{ adddate: 'asc', }] })
    if (result.length == 0) {
        return res.status(404).json({ message: "No forms were found", result: [] });
    } else {
        return res.status(200).json({ message: result.length + " form(s) were found", result });
    }
}

const deleteForm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if (await auth.auth(req.headers.token, auth.accessLevels.worker)>0) {
        try{
            const result = await prismaClient.forms.delete({
                where: {
                    id: parseInt(req.params['id'])
                },
            })
            return res.status(200).json({ message: "The form was deleted" });
        }catch(e){
            return res.status(404).json({ message: "Could not find the given form" });
        }
    } else {
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    }
}
 
module.exports = {
    createForm, 
    getAllForms, 
    deleteForm
}
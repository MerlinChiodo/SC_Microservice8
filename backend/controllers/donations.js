const {validationResult} = require('express-validator');
const prismaClient = require('../prismaClient');
const Prisma = require('@prisma/client')
const auth = require('./auth');

const createDonation = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        var donationID = null
        try{
            const result = await prismaClient.donation.create({
                data: {
                    amount: req.body.amount,
                    recipiant: req.body.recipiant,
                    donator: req.body.donator,
                    date: req.body.date != null ? req.body.date : undefined,
                    reason: req.body.reason != null ? req.body.reason : undefined,
                    purpose: req.body.purpose != null ? req.body.purpose : undefined
                },
            })
        }catch(e){
            if(e instanceof Prisma.PrismaClientKnownRequestError){
                // Error was thrown by Prisma
                if (e.code === 'P2003') {
                    // Foreign key constraint failed on the field -> recipiant/donator
                    return res.status(400).json({ message: "Unknown recipiant/donator" });
                }
            }
            // Other error (should not happen)
            return res.status(500).json({ message: "Internal server error" });
        }
        return res.status(201).json({ message: "The donation was created" });
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const getAllDonations = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        userID = null //TODO: get from token / all if admin
        const donations = await prismaClient.donation.findMany({
            where: {
                donator: {
                    equals: userID != null ? userID : undefined
                }
            }
        })
        if(donations.length == 0){
            return res.status(404).json({ message: "Could not find any donations", donations:[] });
        }else{
            return res.status(200).json({ message: donations.length+" donation(s) were found", donations });
        }
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const getReceivedDonations = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        //TODO: check if user is admin or owner
        const donations = await prismaClient.donation.findMany({
            where: {
                recipiant: {
                    equals: parseInt(req.params['recipiant'])
                }
            }
        })
        if(donations.length == 0){
            return res.status(404).json({ message: "Could not find any donations", donations:[] });
        }else{
            return res.status(200).json({ message: donations.length+" donation(s) were found", donations });
        }
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const deleteDonation = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    if(auth.auth()){
        //TODO: only admins can do this
        try{
            const result = await prismaClient.donation.delete({
            where: {
                amount_recipiant_donator_date:{
                        amount: parseInt(req.headers.amount),
                        donator: parseInt(req.headers.donator),
                        date: req.headers.date,
                        recipiant: parseInt(req.headers.recipiant)
                    }
                },
            })
        }catch(e){
            if(e instanceof Prisma.PrismaClientKnownRequestError){
                // Error was thrown by Prisma
                if (e.code === 'P2025') {
                    // Donation is not present in DB 
                    return res.status(404).json({ message: "Could not find the given donation" });
                }
                // Other error (should not happen)
                return res.status(500).json({ message: "Internal server error" });
            }
        }
        return res.status(200).json({ message: "The donation was removed" });
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    }    
}
 
module.exports = {
    createDonation, 
    getAllDonations, 
    getReceivedDonations,
    deleteDonation
}
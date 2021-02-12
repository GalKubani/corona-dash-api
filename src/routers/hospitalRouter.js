const express= require('express');
const HospitalData= require('../models/hospital-update');
const router= new express.Router()


router.post('/createHospitalData', async(req,res)=>{
    try{
        const hospitalData= new HospitalData(req.body)
        await hospitalData.save();
        res.send(hospitalData);
    }catch(err){
        res.status(400).send({
            status:400, message: err.message,
        });
    }
});
router.get('/getAllHospitalData',async(req,res)=>{
    try{
        const allHospitalData= await HospitalData.find({})
        if(!allHospitalData){
            return res.status(404).send({
                status:404,
                message: "data not found"
            });
        }
        res.send(allHospitalData)
    }catch(err){
        res.status(500).send(err);
    }
})
module.exports=router
const express= require('express');
const StoplightCityData= require('../models/stoplight-update');
const router= new express.Router()

router.post('/createCityData', async(req,res)=>{
    try{
        const cityData= new StoplightCityData(req.body)
        await cityData.save();
        res.send(cityData);
    }catch(err){
        res.status(400).send({
            status:400, message: err.message,
        });
    }
});
router.get('/getCityData',async(req,res)=>{
    let name= req.query.name
    try{
        const cityData= await StoplightCityData.findOne({name})
        if(!cityData){
            return res.status(404).send({
                status:404,
                message: "data not found"
            });
        }
        res.send(cityData)
    }catch(err){
        res.status(500).send(err);
    }
})
router.get('/getAllCityData',async(req,res)=>{
    try{
        const allCityData= await StoplightCityData.find({})
        if(!allCityData){
            return res.status(404).send({
                status:404,
                message: "data not found"
            });
        }
        res.send(allCityData)
    }catch(err){
        res.status(500).send(err);
    }
})
router.patch('/updateCityData',async(req,res)=>{
    let name= req.query.name
    const updates=Object.keys(req.body)
    const allowedUpdates=['dailyStoplightData']
    const isValidOperation= updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:"Invalid updates!"})
    }
    try{
        const cityData=await updateDataObj(req.body,name)
        await cityData.save();
        res.send(cityData)
    }catch(error){
        res.status(400).send(error.message)
    }
})
async function updateDataObj(body,name){
    const cityData= await StoplightCityData.findOne({name})
    cityData.dailyStoplightData.push(body.dailyStoplightData)
    cityData.totalPatients+= (body.dailyStoplightData.newActivePatientsDaily*1)
    cityData.totalFirstVacinated+= (body.dailyStoplightData.firstVacineDaily*1)
    cityData.totalSecondVacinated+= (body.dailyStoplightData.secondVacineDaily*1)
    return cityData
}
module.exports=router
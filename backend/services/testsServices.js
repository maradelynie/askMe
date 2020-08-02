const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

async function readAll(req, res) {
    try{
        const records = await testRecords.find({userId:req.params.user});
        res.send({res:true, records:records})

    } catch (error) {
        res.status(400).send({ res:false, error: error.message});
    }
}
async function read(req, res) {
    try{
        const records = await testRecords.find({userId:req.params.user, category:req.params.category});
        res.send({res:true, records:records})

    } catch (error) {
        res.status(400).send({ res:false, error: error.message});
    }
}
async function create(req, res) {
    try{
        const record = new testRecords(req.body);
        await record.save();
        res.send({res:true, newRecord:record})

    } catch (error) {
        res.status(400).send({ res:false, error: error.message});
    }
}
async function update(req, res) {
    if (!req.body) {
        return res.status(400).send({
          message: 'No Data to Update',
        });
    }

    try{
        const record = await testRecords.findOneAndUpdate({category: req.params.category}, req.body, {new: true,useFindAndModify:false});
        res.send({res:true, newData:record})

    } catch (error) {
        res.status(400).send({  res:false, error: error.message});
    }
  
}


const testRecords = require('../models/testRecordsModel');

module.exports = {readAll, read, create, update};
//routes mahasiswa
const { Router } = require('express')
const express = require ('express')
const router = express.Router ()
const Mahasiswa = require('../models/Mahasiswa')

//creat data mahasiswa
router.post('/', async(req, res) => {
    //tampung input data
    const mahasiswaPost = new Mahasiswa ({
        nama: req.body.nama,
        alamat: req.body.alamat
    })

    try{
        //simpan data ke mongo db
        const mahasiswa = await mahasiswaPost.save()
        //response sucess
        res.json(mahasiswa)
    }catch (error){
        //response error
        res.status(500).json({message: error})

    }
})

// read (method GET)
router.get('/', async (req, res) => {
    try {
        const mahasiswa = await Mahasiswa.find() 
        res.json(mahasiswa)
    } catch (error) {
        res.json({
            message: error
        })
    }
})


//Update (method PUT)
router.put('/:mahasiswaId', async (req, res) => {
    //tampung data yang mau di ubah 
    const data = {
        nama: req.body.nama,
        alamat: req.body.alamat
    }
    

    try {
        //update data disini
        const mahasiswa = await Mahasiswa.updateOne({_id: req.params.mahasiswaId}, data)
        //response succes
        res.json(mahasiswa)
    } catch (error) {
        res.json({
            message:error
        })
        
    }
})
// Delete (method DELETE)
router.delete('/:mahasiswaId', async(req, res) => {
    try {
        // delete data 
        const mahasiswa = await Mahasiswa.deleteOne({_id: req.params.mahasiswaId})
        // response
        res.json(mahasiswa)
    } catch (error) {
        res.json({message: error})
    }
})
module.exports = router
const songModel = require("../models/song.model")
const asyncHandler = require('express-async-handler')
const id3 = require('node-id3')
const storageService = require('../services/storage.service')

const uploadSong = asyncHandler(async (req,res)=>{
    console.log("req recevied");
    
    const songBuffer = req.file.buffer
    console.log("song recieved");
    
    const {mood} = req.body
    console.log("mood recieved");
    
    const tag = id3.read(songBuffer)
    
    const songFile = await storageService.uploadFile({
        buffer:songBuffer,
        fileName:tag.title+".mp3",
        folder:"/cohort-2/AuraPlay/songs"
    })
        console.log("song uploaded")
    const posterFile = await storageService.uploadFile({
        buffer:tag.image.imageBuffer,
        fileName:tag.title+".jpeg",
        folder:"/cohort-2/AuraPlay/posters"
    })
    console.log("poster uploaded")

    const song = await songModel.create({
        url:songFile.url,
        posterUrl:posterFile.url,
        title:tag.title,
        mood
    })

    console.log("song created")

    res.status(201).json({
        message:"song created successfully",
        song
    })


    
})


module.exports = {
    uploadSong
}
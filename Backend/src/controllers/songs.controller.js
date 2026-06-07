const songModel = require("../models/song.model");
const asyncHandler = require("express-async-handler");
const id3 = require("node-id3");
const storageService = require("../services/storage.service");

const uploadSong = asyncHandler(async (req, res) => {
  const songBuffer = req.file.buffer;

  const { mood } = req.body;

  const tag = id3.read(songBuffer);

  console.log("Starting song upload");
  const [songFile, posterFile] = await Promise.all([
    storageService.uploadFile({
      buffer: songBuffer,
      fileName: tag.title + ".mp3",
      folder: "/cohort-2/AuraPlay/songs",
    }),

    storageService.uploadFile({
      buffer: tag.image.imageBuffer,
      fileName: tag.title + ".jpeg",
      folder: "/cohort-2/AuraPlay/posters",
    }),
  ]);

  const song = await songModel.create({
    url: songFile.url,
    posterUrl: posterFile.url,
    title: tag.title,
    mood,
  });

  res.status(201).json({
    message: "song created successfully",
    song,
  });
});

const getSong = asyncHandler(async (req, res) => {
  const { mood } = req.query;

  const song = await songModel.findOne({
    mood,
  });

  res.status(200).json({
    message: "song fetched successfully",
    song,
  });
});

module.exports = {
  uploadSong,
  getSong
};

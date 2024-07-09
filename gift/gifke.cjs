/* 𝗔𝗡𝗗𝗘𝗫-𝗠𝗗 */
/* 𝗔𝗡𝗗𝗘𝗫-𝗠𝗗 */
const fs = require('fs')
const path = require('path')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const { spawn } = require('child_process')
/* 𝗔𝗡𝗗𝗘𝗫-𝗠𝗗 */
function ffmpeg(buffer, args = [], ext = '', ext2 = '') {
  return new Promise(async (resolve, reject) => {
    try {
      let tmp = path.join(__dirname, '../gifted', + new Date + '.' + ext)
      let out = tmp + '.' + ext2
      await fs.promises.writeFile(tmp, buffer)
      spawn(ffmpegPath, [
        '-y',
        '-i', tmp,
        ...args,
        out
      ])
        .on('error', reject)
        .on('close', async (code) => {
          try {
            await fs.promises.unlink(tmp)
            if (code !== 0) return reject(code)
            resolve(await fs.promises.readFile(out))
            await fs.promises.unlink(out)
          } catch (e) {
            reject(e)
          }
        })
    } catch (e) {
      reject(e)
    }
  })
}
/* 𝗔𝗡𝗗𝗘𝗫-𝗠𝗗 */
/**
 * Convert Audio to Playable WhatsApp Audio
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension 
 */
function toAudio(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-ac', '2',
    '-b:a', '128k',
    '-ar', '44100',
    '-f', 'mp3'
  ], ext, 'mp3')
}
/* 𝗔𝗡𝗗𝗘𝗫-𝗠𝗗 */
/**
 * Convert Audio to Playable WhatsApp PTT
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension 
 */
function toPTT(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-c:a', 'libopus',
    '-b:a', '128k',
    '-vbr', 'on',
    '-compression_level', '10'
  ], ext, 'opus')
}
/* 𝗔𝗡𝗗𝗘𝗫-𝗠𝗗 */
/**
 * Convert Audio to Playable WhatsApp Video
 * @param {Buffer} buffer Video Buffer
 * @param {String} ext File Extension 
 */
function toVideo(buffer, ext) {
  return ffmpeg(buffer, [
    '-c:v', 'libx264',
    '-c:a', 'aac',
    '-ab', '128k',
    '-ar', '44100',
    '-crf', '32',
    '-preset', 'slow'
  ], ext, 'mp4')
}
/* 𝗔𝗡𝗗𝗘𝗫-𝗠𝗗 */
module.exports = {
  toAudio,
  toPTT,
  toVideo,
  ffmpeg,
}
/* 𝗔𝗡𝗗𝗘𝗫-𝗠𝗗 */
/* 𝗔𝗡𝗗𝗘𝗫-𝗠𝗗 */
   /* 𝗔𝗡𝗗𝗘𝗫-𝗠𝗗 */                 
/* 𝗔𝗡𝗗𝗘𝗫-𝗠𝗗 */

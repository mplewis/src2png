const expect = require('chai').expect

const shell = require('shelljs')
const Jimp = require('jimp')

const { trim } = require('../../src/camera')

describe('camera', function () {
  describe('trim', function () {
    context('with a source image', function () {
      const TO_CROP = 'test/tmp/croppable.png'
      before(function () {
        shell.mkdir('-p', 'test/tmp')
        shell.cp('test/fixtures/images/croppable.png', TO_CROP)
      })

      it('trims whitespace from images', async function () {
        const orig = await Jimp.read(TO_CROP)
        expect(orig.bitmap.width).to.eq(200)
        expect(orig.bitmap.height).to.eq(200)

        trim(TO_CROP)

        const trimmed = await Jimp.read(TO_CROP)
        expect(trimmed.bitmap.width).to.eq(100)
        expect(trimmed.bitmap.height).to.eq(100)
      })
    })
  })
})

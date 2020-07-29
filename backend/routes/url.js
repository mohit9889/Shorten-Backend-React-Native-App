const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../model/url');

//@route POST /api/url/shorten
//@desc Create short URL
router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    console.log("API LONG URL", longUrl);
    const baseUrl = config.get('baseUrl');

    //check base url
    if(!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base url');
    }

    //Create url code
    const urlCode = shortid.generate();
    console.log("URL CODE", urlCode);

    //Check long url
    if(validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl: longUrl });

            if(url) {
                res.status(200).json(url);
            } else {
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl, 
                    urlCode,
                    date: new Date()
                });

                await url.save();

                res.status(200).json(url);
            }
        } catch (err) {
            console.error(err);
            res.json(500).json('Server error');
        }
    } else {
        res.status(401).json('Invalid long url');
    }
})


module.exports = router;
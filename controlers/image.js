
const Clarifai = require("clarifai")

const Capp = new Clarifai.App({
    apiKey: '9a3a2c9671b44e47975fe0776e83fafc'
});


const handleImage = (req, res, postgres) => {
    const {id} = req.body;
    postgres('users').where('id', '=', id)
        .returning('entries')
        .increment({'entries': 1})
    .then(entries => res.json(entries[0].entries))
    .catch(err => res.status(400).json('unable to get entries'));
}

const handleAPICall = (req, res, input) => {
    Capp.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data)).catch(err => res.status(400).json("F"));
}

module.exports = {handleImage, handleAPICall}
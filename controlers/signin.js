const handleSignIn = (req, res, postgres, bcrypt) => {
    postgres
        .select("hash")
        .from('login')
        .where('email', '=', req.body.email)
    .then(hash => hash[0].hash)
    .then(hash => {
        const isValid = bcrypt.compareSync(req.body.password, hash)
        if(isValid){
            return postgres
                .select("*").from("users")
                .where("email", "=", req.body.email)
            .then(user => res.json(user[0]))
            .catch(err => res.status(400).json("Cant get user"))
        }
        else {return res.json("Wrong Info")}
    }).catch(err => res.status(400).json("Wrong Credentials"))
};

module.exports = { handleSignIn }
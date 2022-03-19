const handleRegister = (req, res, postgres, bcrypt) =>{
    const {email, name, password} = req.body;
    if(!email || !name || !password){
        return res.status(404).json("Datos no validos")
    }
    const hash = bcrypt.hashSync(password, 1);
    postgres.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail =>{
            return trx("users")
            .returning('*')
            .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
            });
        })
        .then(trx.commit).catch(trx.rollback);
    }).catch(err => res.status(400).json(err));
}

module.exports = { handleRegister };
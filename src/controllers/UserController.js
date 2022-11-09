/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const User = require('../models/UserModel');

//Add data user on the database
module.exports.addUser = async (req, res) => {
    const { name, description, image, aboutMe1, aboutMe2 } = req.body;
    try {
        const data = await User.create({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            aboutMe1: req.body.aboutMe1,
            aboutMe2: req.body.aboutMe2,
        });
        if (!data) return res.status(500).send('The data cannot be created');
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({
            errorMessage: "Failed, please try again!",
        });
    };
};

//Get data user on the database
module.exports.getUser = async (req, res) => {
    try {
        const ListData = await User.find();
        if (!ListData)
            res.status(500).json({ success: false })
        res.status(200).send(ListData);
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

//Modify data user on the database
module.exports.modifyUser = async (req, res) => {
    const idData = req.params.id;
    if (!isValidObjectId(idData))
        return res.status(500).json({ success: false, message: 'Invalid ID: ' + idData })

    try {
        const updatedData = await User.findByIdAndUpdate(
            idData,
            {
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                aboutMe1: req.body.aboutMe1,
                aboutMe2: req.body.aboutMe2,
            },
            { new: true }
        );
        if (!updatedData) return res.status(500).send('The data cannot be updated!');

        res.status(200).json(updatedData);

    } catch (err) {
        res.status(500).json({ message: err })
    }
};

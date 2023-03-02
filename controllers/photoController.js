import Photo from "../models/photoModel.js";

const createPhoto = async (req, res) => {
    try {
        const photo = await Photo.create(req.body)
        res.status(201).json({
            success: true,
            data: photo
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        })
    }
}

const getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find({})
        res.status(200).render("photos", { //ilki ejsdeki "photos"
            photos,
            link: "photos"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        })
    }
}

const getAPhoto = async (req, res) => {
    try {       //params: urlde gözüken parametreler
        const photo = await Photo.findById({ _id: req.params.id })
        res.status(200).render("photo", {
            photo,
            link: "photos"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        })
    }
}

export { createPhoto, getAllPhotos, getAPhoto, };
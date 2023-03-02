import express from "express"
import * as pageController from "../controllers/pageController.js"

//* as kullanılır çünkü controllerda export edilen birden fazla fonksiyon var
//import { getIndexPage,getAboutPage } from "../controllers/pageController"

const router = express.Router()

router.get('/', pageController.getIndexPage)
router.get('/about', pageController.getAboutPage)
router.get('/register', pageController.getRegisterPage)
router.get('/login', pageController.getLoginPage)
router.get('/logout', pageController.getLogout)


export default router
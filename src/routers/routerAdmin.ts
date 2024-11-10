import { Router } from "express"
const router = Router();

/*************GET***********/
router.get("/", (req, res, next) => {
res.send("salom Admin")
}
)

export default router
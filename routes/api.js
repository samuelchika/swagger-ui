import { Router } from "express";

const router = new Router();



/**
 * @swagger
 * /:
 *  get:
 *      summary: This api is used to check if get method is working or not
 *      description: This api isused to check if get method is working or not
 *      
 *      responses:
 *          200: 
 *              description: To test Get method
 */

router.get("/", (req, res) => {
    res.send("Please visit the /api/doc to view the swagger doc");
})



export default router;
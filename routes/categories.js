import { Router } from "express";
import Category from '../model/Category.js';
import { sanitizeInput } from "../utils/index.js";

const router = new Router();

/**
 * @swagger
 *  /categories:
 *      get:
 *          summary: Get all categories
 *          tags: [Categories]
 *          responses:
 *              "200":
 *                  description: The array of all available category and its subcategories
 *                  contents: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Categories'
 *              "500":
 *                  description: Server Error
 *                  contents: 
 *                      application/json
 */
router.get("/", async (req, res, next) => {
    try {
        const categories = await Category.FindAll();
        res.status(200).json(categories)
    } catch (error) {
        next(error)
    }
});


/**
 * 
 * @swagger
 *  /categories/{id}:
 *      get:
 *          summary: Get Category info by ID
 *          tags: [Categories]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: ID of category
 *          responses:
 *              "200":
 *                  description: Successfully got the categories information
 *                  contents:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Categories'
 *              "500":
 *                  $ref: '#/components/responses/500'
 */
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.FindCategoryById(sanitizeInput(id));
        if(category === undefined || category == null) return new Erro("Undefined")
        res.status(200).json(category);
        
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 *  /categories:
 *      post:
 *          summary: Create new category
 *          tags: [Categories]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Categories'
 *          responses:
 *              "500":
 *                  $ref: '#/components/responses/500'
 *              "401":
 *                  $ref: '#/components/responses/401'
 *              "201":
 *                  description: Category created successfully.
 *                  contents:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Categories'
 *              
 */

router.post("/", async(req, res, next) => {
    console.log("Here")
    try {
        console.log("Body", req.body)
        const newCategories = new Category({...req.body});
        const categoryId = newCategories.save();
        res.status(201).json({categoryId: categoryId})
    } catch (error) {
        console.log(error)
        next(error);
    }
})

export default router;
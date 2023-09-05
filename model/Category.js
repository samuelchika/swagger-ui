import db from '../db/db_connection.js';

class Category {
    constructor(category) {
        this.name = category.name;
        this.category_id = category?.id && category.category_id
    };

    async save() {
        var sql = "INSERT INTO categories (name";
        sql += this.category_id !== undefined ? ', category_id)' : ')';
        sql += "VALUES (?";
        sql += this.category_id !== undefined ? ', ?)' : ')';
        var values = [this.name];
        this.category_id !== undefined && values.push(this.category_id);
        const newCategory = db.execute(sql, values);
        const categoryId = newCategory.insertId;
        return categoryId;
    }

    static async FindAll() {
        const sql = "SELECT * FROM categories"; 
        const [category, _] = await db.query(sql);
        return category;
    }

    static async FindVehicles() {
        const sql = 'SELECT * FROM categories WHERE id LIKE "%10%"';
        const vehicle = await db.query(sql);
        //console.log(vehicle)
        return vehicle;
    }

    static async FindCategoryById(id) {
        const sql = 'SELECT * FROM categories WHERE id = ?';
        const [cat, _] = await db.query(sql, [id]);
        return cat[0];
    }

    static async FindCategoryId(name) {
        const sql = 'SELECT id FROM categories WHERE name = ?';
        const [catName, _] = await db.query(sql, [name]);
        return catName[0].id;
    }
}
//Category.FindAll()
//Category.FindCategoryId("vehicle");
export default Category;
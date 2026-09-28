import db from './db.js';

// Retrieve all categories
const getAllCategories = async () => {
    const query = `
        SELECT
            category_id,
            name
        FROM category
        ORDER BY name;
    `;

    const result = await db.query(query);

    return result.rows;
};

// Retrieve a single category by its ID
const getCategoryDetails = async (categoryId) => {
    const query = `
        SELECT
            category_id,
            name
        FROM category
        WHERE category_id = $1;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

// Retrieve all categories for a given service project
const getCategoriesByServiceProjectId = async (projectId) => {
    const query = `
        SELECT
            c.category_id,
            c.name
        FROM category AS c
        JOIN project_category AS pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name;
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

// Retrieve all service projects for a given category
const getServiceProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.date,
            sp.location,
            sp.organization_id
        FROM service_project AS sp
        JOIN project_category AS pc
            ON sp.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY sp.date;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

// Export the model functions
export {
    getAllCategories,
    getCategoryDetails,
    getCategoriesByServiceProjectId,
    getServiceProjectsByCategoryId
};
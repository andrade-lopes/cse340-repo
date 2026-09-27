import {
    getCategoryDetails,
    getServiceProjectsByCategoryId
} from '../models/categories.js';

// Define the categories page controller
const showCategoriesPage = async (req, res) => {
    const title = 'Service Categories';

    res.render('categories', { title });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;

    const category = await getCategoryDetails(categoryId);
    const projects = await getServiceProjectsByCategoryId(categoryId);

    const title = 'Category Details';

    res.render('category', {
        title,
        category,
        projects
    });
};

// Export the controller function
export {
    showCategoriesPage,
    showCategoryDetailsPage
};
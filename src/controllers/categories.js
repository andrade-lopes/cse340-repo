// Define the categories page controller
const showCategoriesPage = async (req, res) => {
    const title = 'Service Categories';

    res.render('categories', { title });
};

// Export the controller function
export { showCategoriesPage };
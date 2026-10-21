import {
    getAllCategories,
    getCategoryDetails,
    getServiceProjectsByCategoryId,
    getCategoriesByServiceProjectId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
} from '../models/categories.js';

import { getProjectDetails } from '../models/projects.js';

import { body, validationResult } from 'express-validator';


const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required.')
        .bail()
        .isLength({ min: 3, max: 100 })
        .withMessage(
            'Category name must be between 3 and 100 characters.'
        )
];


// Define the categories page controller
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', {
        title,
        categories
    });
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

// Show the form to assign categories to a project
const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories =
        await getCategoriesByServiceProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', {
        title,
        projectId,
        projectDetails,
        categories,
        assignedCategories
    });
};

// Process the category assignments form
const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const selectedCategoryIds = req.body.categoryIds || [];

    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds)
        ? selectedCategoryIds
        : [selectedCategoryIds];

    await updateCategoryAssignments(
        projectId,
        categoryIdsArray
    );

    req.flash('success', 'Categories updated successfully.');

    res.redirect(`/project/${projectId}`);
};


const showNewCategoryForm = (req, res) => {
    const title = 'Create New Category';

    res.render('new-category', { title });
};

const processNewCategoryForm = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-category');
    }

    try {
        await createCategory(req.body.name.trim());

        req.flash('success', 'Category created successfully.');

        return res.redirect('/categories');
    } catch (error) {
        console.error('Error creating category:', error);

        req.flash('error', 'Unable to create category.');

        return res.redirect('/new-category');
    }
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;

    const category = await getCategoryDetails(categoryId);

    if (!category) {
        req.flash('error', 'Category not found.');
        return res.redirect('/categories');
    }

    const title = 'Edit Category';

    res.render('edit-category', {
        title,
        category
    });
};

const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect(`/edit-category/${categoryId}`);
    }

    try {
        await updateCategory(
            categoryId,
            req.body.name.trim()
        );

        req.flash('success', 'Category updated successfully.');

        return res.redirect(`/category/${categoryId}`);
    } catch (error) {
        console.error('Error updating category:', error);

        req.flash('error', 'Unable to update category.');

        return res.redirect(`/edit-category/${categoryId}`);
    }
};


// Export the controller function
export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
};
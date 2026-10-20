// Import the project model functions
import {
    getProjectsByOrganizationId,
    getUpcomingProjects,
    getProjectDetails,
    createProject,
    updateProject
} from '../models/projects.js';

import { getCategoriesByServiceProjectId } from '../models/categories.js';
import { getAllOrganizations } from '../models/organizations.js';

import { body, validationResult } from 'express-validator';

const projectValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .bail()
        .isLength({ min: 3, max: 200 })
        .withMessage('Title must be between 3 and 200 characters'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .bail()
        .isLength({ max: 1000 })
        .withMessage('Description must be less than 1000 characters'),

    body('location')
        .trim()
        .notEmpty()
        .withMessage('Location is required')
        .bail()
        .isLength({ max: 200 })
        .withMessage('Location must be less than 200 characters'),

    body('date')
        .notEmpty()
        .withMessage('Date is required')
        .bail()
        .isISO8601()
        .withMessage('Date must be a valid date format'),

    body('organizationId')
        .notEmpty()
        .withMessage('Organization is required')
        .bail()
        .isInt()
        .withMessage('Organization must be a valid integer')
];

// Number of upcoming projects to display
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Display the service projects page
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('service-projects', { title, projects });
};

// Display service project details
const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);
    const categories = await getCategoriesByServiceProjectId(projectId);
    const title = 'Service Project Details';

    res.render('project', {
        title,
        project,
        categories
    });
};

// Display the new service project form
const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Add New Service Project';

    res.render('new-project', {
        title,
        organizations
    });
};


const showEditProjectForm = async (req, res) => {
    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);
    const organizations = await getAllOrganizations();
    const title = 'Edit Service Project';

    if (!project) {
        req.flash('error', 'Service project not found.');
        return res.redirect('/service-projects');
    }

    res.render('edit-project', {
        title,
        project,
        organizations
    });
};


const processEditProjectForm = async (req, res) => {
    const projectId = req.params.id;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect(`/edit-project/${projectId}`);
    }

    const {
        title,
        description,
        location,
        date,
        organizationId
    } = req.body;

    try {
        await updateProject(
            projectId,
            title,
            description,
            location,
            date,
            organizationId
        );

        req.flash(
            'success',
            'Service project updated successfully!'
        );

        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Error updating service project:', error);

        req.flash(
            'error',
            'There was an error updating the service project.'
        );

        res.redirect(`/edit-project/${projectId}`);
    }
};


// Process the new service project form
const processNewProjectForm = async (req, res) => {

    // 1. Check for validation errors FIRST
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Store each validation error as a flash message
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Return to the form without creating a project
        return res.redirect('/new-project');
    }

    // 2. Extract form data only after validation passes
    const {
        title,
        description,
        location,
        date,
        organizationId
    } = req.body;

    // 3. Create the project
    try {
        await createProject(
            title,
            description,
            location,
            date,
            organizationId
        );

        // 4. Display a success message
        req.flash(
            'success',
            'New service project created successfully!'
        );

        // 5. Return to the main project list
        res.redirect('/service-projects');

    } catch (error) {
        console.error('Error creating new project:', error);

        req.flash(
            'error',
            'There was an error creating the service project.'
        );

        res.redirect('/new-project');
    }
};

// Export controller functions
export {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
};
import express from 'express';

import { showHomePage } from './controllers/index.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    organizationValidation,
    processEditOrganizationForm
} from './controllers/organizations.js';

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
} from './controllers/projects.js';


import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
} from './controllers/categories.js';


import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);

router.get('/new-organization', showNewOrganizationForm);

router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Route to handle the edit organization form submission
router.post(
    '/edit-organization/:id',
    organizationValidation,
    processEditOrganizationForm
);

router.get('/projects', showProjectsPage);

router.get('/service-projects', showProjectsPage);

// Route for new project page
router.get('/new-project', showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);

// Route for service project details page
router.get('/project/:id', showProjectDetailsPage);


router.get(
    '/edit-project/:id',
    showEditProjectForm
);

router.post(
    '/edit-project/:id',
    projectValidation,
    processEditProjectForm
);


// Routes to handle assigning categories to a project
router.get(
    '/assign-categories/:projectId',
    showAssignCategoriesForm
);

router.post(
    '/assign-categories/:projectId',
    processAssignCategoriesForm
);


router.get('/new-category', showNewCategoryForm);

router.post(
    '/new-category',
    categoryValidation,
    processNewCategoryForm
);

router.get('/edit-category/:id', showEditCategoryForm);

router.post(
    '/edit-category/:id',
    categoryValidation,
    processEditCategoryForm
);


router.get('/categories', showCategoriesPage);

// Route for category details page
router.get('/category/:id', showCategoryDetailsPage);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

// Route for edit organization page
router.get('/edit-organization/:id', showEditOrganizationForm);

// Error-handling test route
router.get('/test-error', testErrorPage);

export default router;
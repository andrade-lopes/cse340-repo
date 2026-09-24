import express from 'express';

import { showHomePage } from './controllers/index.js';
import {
    showOrganizationsPage,
    showOrganizationDetailsPage
} from './controllers/organizations.js';
import { showProjectsPage } from './controllers/projects.js';
import { showCategoriesPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/service-projects', showProjectsPage);
router.get('/categories', showCategoriesPage);

router.use('/organization/:id', (req, res, next) => {
    console.log('ORGANIZATION ROUTER MATCHED:', req.params.id);
    next();
});

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

// Error-handling test route
router.get('/test-error', testErrorPage);

export default router;
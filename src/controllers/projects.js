// Import the project model functions
import {
    getProjectsByOrganizationId,
    getUpcomingProjects,
    getProjectDetails
} from '../models/projects.js';

// Number of upcoming projects to display
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Define the service projects page controller
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('service-projects', { title, projects });
};

// Define the service project details page controller
const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);
    const title = 'Service Project Details';

    res.render('project', { title, project });
};

// Export the controller functions
export {
    showProjectsPage,
    showProjectDetailsPage
};
// Import the service projects model
import { getAllProjects } from '../models/projects.js';

// Define the service projects page controller
const showProjectsPage = async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Service Projects';

    res.render('service-projects', { title, projects });
};

// Export the controller function
export { showProjectsPage };
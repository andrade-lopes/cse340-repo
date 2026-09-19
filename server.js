import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import pool from './database/index.js';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';


// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');

/**
 * Configure Express middleware
 */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
});

app.get('/service-projects', async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Service Projects';

    res.render('service-projects', { title, projects });
});

app.get('/categories', (req, res) => {
    res.render('categories', { title: 'Categories' });
});

const projects = await getAllProjects();
console.log(projects);

app.listen(PORT, async () => {
    try {
        await testConnection();

        const projects = await getAllProjects();
        console.log('Service projects:', projects);

        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});
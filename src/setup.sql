-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- ========================================
-- Service Project Table
-- ========================================
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);

-- ========================================
-- Insert sample data: Service Projects
-- ========================================
INSERT INTO service_project
    (organization_id, title, description, location, date)
VALUES
-- BrightFuture Builders
(1, 'Community Center Renovation',
 'Help renovate and improve a local community center.',
 'Central Community Center',
 '2026-10-05'),

(1, 'Neighborhood Playground Repair',
 'Repair playground equipment and improve the surrounding area.',
 'Sunrise Neighborhood',
 '2026-10-12'),

(1, 'Community Garden Construction',
 'Build garden beds and prepare a community garden for local residents.',
 'Green Valley Community',
 '2026-10-19'),

(1, 'School Building Improvement',
 'Assist with painting and minor improvements at a local school.',
 'Hope Elementary School',
 '2026-10-26'),

(1, 'Accessible Walkway Project',
 'Help construct and improve accessible walkways in a public area.',
 'Riverside Park',
 '2026-11-02'),

-- GreenHarvest Growers
(2, 'Urban Garden Planting',
 'Plant vegetables and herbs in a community urban garden.',
 'Downtown Urban Farm',
 '2026-10-06'),

(2, 'Community Compost Program',
 'Help establish composting areas and teach residents about composting.',
 'Green Valley Community',
 '2026-10-13'),

(2, 'School Garden Workshop',
 'Create a small garden and teach students about sustainable food production.',
 'Hope Elementary School',
 '2026-10-20'),

(2, 'Harvest Distribution Day',
 'Collect and distribute fresh produce to local families.',
 'Community Food Center',
 '2026-10-27'),

(2, 'Sustainable Farming Training',
 'Provide hands-on training about sustainable urban farming practices.',
 'Downtown Urban Farm',
 '2026-11-03'),

-- UnityServe Volunteers
(3, 'Food Bank Volunteer Day',
 'Help organize and distribute food to families in need.',
 'Community Food Bank',
 '2026-10-07'),

(3, 'Senior Center Assistance',
 'Assist staff and residents with activities at a local senior center.',
 'Hope Senior Center',
 '2026-10-14'),

(3, 'Beach Cleanup',
 'Work with volunteers to clean litter from a local beach.',
 'Sunset Beach',
 '2026-10-21'),

(3, 'Charity Donation Drive',
 'Collect and organize donated clothing and household items.',
 'UnityServe Community Center',
 '2026-10-28'),

(3, 'Community Volunteer Fair',
 'Help organize a community event connecting volunteers with local organizations.',
 'Central Community Hall',
 '2026-11-04');

-- ========================================
-- Category Table
-- ========================================
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================================
-- Insert sample data: Categories
-- ========================================
INSERT INTO category (name)
VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');

-- ========================================
-- Project Category Table
-- ========================================
CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    FOREIGN KEY (project_id)
        REFERENCES service_project(project_id)
        ON DELETE CASCADE,

    FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);

-- ========================================
-- Insert sample data: Project Categories
-- ========================================
INSERT INTO project_category (project_id, category_id)
VALUES
(1,  (SELECT category_id FROM category WHERE name = 'Community Service')),

(2,  (SELECT category_id FROM category WHERE name = 'Community Service')),
(2,  (SELECT category_id FROM category WHERE name = 'Health and Wellness')),

(3,  (SELECT category_id FROM category WHERE name = 'Community Service')),
(3,  (SELECT category_id FROM category WHERE name = 'Environmental')),

(4,  (SELECT category_id FROM category WHERE name = 'Educational')),

(5,  (SELECT category_id FROM category WHERE name = 'Community Service')),
(5,  (SELECT category_id FROM category WHERE name = 'Health and Wellness')),

(6,  (SELECT category_id FROM category WHERE name = 'Environmental')),

(7,  (SELECT category_id FROM category WHERE name = 'Environmental')),

(8,  (SELECT category_id FROM category WHERE name = 'Educational')),
(8,  (SELECT category_id FROM category WHERE name = 'Environmental')),

(9,  (SELECT category_id FROM category WHERE name = 'Community Service')),
(9,  (SELECT category_id FROM category WHERE name = 'Health and Wellness')),

(10, (SELECT category_id FROM category WHERE name = 'Educational')),
(10, (SELECT category_id FROM category WHERE name = 'Environmental')),

(11, (SELECT category_id FROM category WHERE name = 'Community Service')),
(11, (SELECT category_id FROM category WHERE name = 'Health and Wellness')),

(12, (SELECT category_id FROM category WHERE name = 'Community Service')),
(12, (SELECT category_id FROM category WHERE name = 'Health and Wellness')),

(13, (SELECT category_id FROM category WHERE name = 'Community Service')),
(13, (SELECT category_id FROM category WHERE name = 'Environmental')),

(14, (SELECT category_id FROM category WHERE name = 'Community Service')),

(15, (SELECT category_id FROM category WHERE name = 'Community Service')),
(15, (SELECT category_id FROM category WHERE name = 'Educational'));
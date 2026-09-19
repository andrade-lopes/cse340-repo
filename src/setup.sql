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
 
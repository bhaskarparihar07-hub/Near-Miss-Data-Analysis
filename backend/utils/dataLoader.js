import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let cachedData = null;

/**
 * Load and parse the JSON data file
 * Data is cached in memory after first load for performance
 */
export function loadIncidents() {
  if (cachedData) {
    return cachedData;
  }

  try {
    const dataPath = path.join(__dirname, '../data/db.dashboard_incidents.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    cachedData = JSON.parse(rawData);
    
    console.log(`✅ Loaded ${cachedData.length} incident records`);
    return cachedData;
  } catch (error) {
    console.error('❌ Error loading data:', error.message);
    throw new Error('Failed to load incident data');
  }
}

/**
 * Get a single incident by ID
 */
export function getIncidentById(id) {
  const data = loadIncidents();
  return data.find(incident => 
    incident.id === id || incident.incident_number === id
  );
}

/**
 * Get incidents with pagination
 */
export function getIncidentsPaginated(page = 1, limit = 100) {
  const data = loadIncidents();
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    data: data.slice(startIndex, endIndex),
    pagination: {
      total: data.length,
      page,
      limit,
      totalPages: Math.ceil(data.length / limit)
    }
  };
}

/**
 * Filter incidents by criteria
 */
export function filterIncidents(filters = {}) {
  let data = loadIncidents();
  
  // Filter by year
  if (filters.year) {
    data = data.filter(i => i.year === parseInt(filters.year));
  }
  
  // Filter by month
  if (filters.month) {
    data = data.filter(i => i.month === parseInt(filters.month));
  }
  
  // Filter by region
  if (filters.region) {
    data = data.filter(i => i.region === filters.region);
  }
  
  // Filter by severity
  if (filters.severity !== undefined) {
    data = data.filter(i => i.severity_level === parseInt(filters.severity));
  }
  
  // Filter by category
  if (filters.category) {
    data = data.filter(i => i.primary_category === filters.category);
  }
  
  // Filter by project
  if (filters.job) {
    data = data.filter(i => i.job === filters.job);
  }
  
  return data;
}

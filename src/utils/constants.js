// Helper for dynamic content (simulates wp_localize_script for a standalone app)
// In a real WordPress React theme, these would be passed from PHP.
export const MerchWeb = {
    partials_url: '/', // Assuming partials are at the root for a standalone React app
    home_partial: 'home', // 'home' will map to the Home component
    rest_url: 'https://brightfuturei.com/wp-json/', // Your WordPress REST API URL
};

// --- Utility Functions ---
export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

// --- Calculator Constants ---
export const YARN_FABRIC_CONSTANTS = {
    'fleece': 7200,
    'sj': 4320, // Adjusted based on common industry values for Single Jersey
    'terry': 6240,
    'interlock': 7200, // Adjusted based on common industry values for Interlock
    'pique': 5200,
    'lacost': 5500,
    'lycra-fleece': 7200,
    'lycra-sj': 4320, // Adjusted
    'lycra-terry': 6240,
    'lycra-interlock': 7200, // Adjusted
    'lycra-pique': 5200,
    'lycra-lacost': 5500,
    'rib-1x1': 6000,
    'rib-2x1': 6000,
    'lycra-rib-1x1': 6000,
    'lycra-rib-2x1': 6000,
};

// Function to simulate saving results to a file (as in original script.js)
export const saveResultToFile = (resultText, defaultFileName = "result.txt") => {
    const fileName = prompt("Enter file name:", defaultFileName);
    if (fileName) {
        const blob = new Blob([resultText], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

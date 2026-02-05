// List of Admin emails who have access to the Dashboard and should be EXCLUDED from analytics logging
export const ADMIN_EMAILS = [
    'contact@frenzo.services',
    // Add more admin emails here, e.g.:
    // 'developer@example.com'
];

export const isAdmin = (email) => {
    if (!email) return false;
    return ADMIN_EMAILS.includes(email);
};

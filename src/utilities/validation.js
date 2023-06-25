/**
 * Method to validate email formatting using regex pattern matching
 * @param {string} email 
 * @returns boolean
 */
export const isValidEmail = async (email) => {
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail) return false;
  return true;
};

/**
 * Method to validate the string length as per given minL & maxL configuration
 * @param {string} value
 * @param {number} minL
 * @param {number} maxL
 * @returns boolean
 * */
export const isValidLength = (value, minL, maxL) => {
  if (value.length > maxL || value.length < minL) return false;
  return true;
}
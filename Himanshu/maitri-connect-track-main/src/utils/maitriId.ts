/**
 * Generate a unique Maitri ID in the format: MT-TN-XXXXXX
 * Example: MT-TN-1A3B5C
 */
export const generateMaitriId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return `MT-TN-${id}`;
};

/**
 * Validate Maitri ID format
 */
export const isValidMaitriId = (id: string): boolean => {
  const pattern = /^MT-TN-[A-Z0-9]{6}$/;
  return pattern.test(id);
};

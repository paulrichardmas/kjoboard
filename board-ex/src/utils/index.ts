export const getPostedDate = (text) => {
  const match = text.match(/Posted (\d+) days ago/);
  if (match) {
    const daysAgo = parseInt(match[1], 10);
    const postedDate = new Date();
    postedDate.setDate(postedDate.getDate() - daysAgo);
    return postedDate.toISOString().split('T')[0]; // Returns date in 'YYYY-MM-DD' format
  }
  return null;
}

export const isEmpty = (value: any): boolean  => {
  if (value === null || value === undefined) return true;

  if (typeof value === 'string' && value.trim() === '') return true;

  if (Array.isArray(value) && value.length === 0) return true;

  if (typeof value === 'object' && !Array.isArray(value)) {
    return Object.keys(value).length === 0;
  }

  if (typeof value === 'number' && isNaN(value)) return true;

  return false;
}
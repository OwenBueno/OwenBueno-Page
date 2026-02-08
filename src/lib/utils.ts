/**
 * Calculates the current age based on a birth date.
 * @param birthDate string in 'YYYY-MM-DD' or 'MM/DD/YYYY' format
 * @returns number representing the age
 */
export function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const now = new Date();
  
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Formats a date string consistently to avoid hydration mismatches.
 * @param dateString ISO date string or similar
 * @returns formatted date string
 */
export function formatDate(dateString: string | Date | undefined): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    // Using a fixed locale 'en-US' ensures consistency between server and client
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC', // Ensure UTC to prevent date shifting
    });
  } catch {
    return '';
  }
}

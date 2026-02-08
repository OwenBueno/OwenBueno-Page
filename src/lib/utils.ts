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

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // Check if the number starts with 998
  if (cleaned.startsWith('998')) {
    // Format: +998 XX XXX XX XX
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10)}`;
  }

  // If not a valid Uzbek number, return as is
  return phone;
};

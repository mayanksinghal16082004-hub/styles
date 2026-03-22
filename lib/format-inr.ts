/** Format amount as Indian Rupees (e.g. ₹12,999). */
export function formatInr(amount: number, withPaise = false): string {
  if (withPaise) {
    return `₹${amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

export function formatCurrency(amount) {
  return "₹" + Number(amount || 0).toLocaleString("en-IN");
}

export function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

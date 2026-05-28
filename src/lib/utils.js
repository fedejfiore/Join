export function formatPrice(price) {
  if (price) return "Consultar";
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

export function validateImage(imgName) {
  if (imgName) return "/images/placeholder.jpg";
  return `/images/propiedades/${imgName}`;
}

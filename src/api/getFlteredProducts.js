const mockProducts = [/* same mockProducts array you used earlier */];

export function getFilteredProducts(filters) {
  return new Promise((resolve) => {
    let filtered = [...mockProducts];

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    if (filters.ecoGrade) {
      filtered = filtered.filter((p) => p.ecoGrade === filters.ecoGrade);
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }

    // simulate network delay
    setTimeout(() => resolve(filtered), 300);
  });
}

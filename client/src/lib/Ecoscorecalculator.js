const MATERIAL_SCORES = {
  "Organic Cotton": 95,
  "Recycled Plastic": 90,
  Bamboo: 92,
  Hemp: 88,
  Cork: 85,
  Jute: 87,
  Linen: 82,
  Wool: 75,
  Wood: 80,
  Glass: 78,
  Aluminum: 70,
  "Recycled Paper": 85,
  "Regular Cotton": 40,
  "Virgin Plastic": 20,
  "Synthetic Fibers": 30,
};

const CERTIFICATION_SCORES = {
  Organic: 20,
  "Fair Trade": 18,
  "FSC Certified": 16,
  "Carbon Neutral": 22,
  "Plastic Neutral": 15,
  GOTS: 19,
  "Cradle to Cradle": 25,
  "B Corp": 17,
  "Energy Star": 14,
  "Rainforest Alliance": 16,
};

const PACKAGING_SCORES = {
  "Plastic-Free": 95,
  Compostable: 90,
  Biodegradable: 88,
  Recyclable: 75,
  Reusable: 85,
  "Minimal Packaging": 80,
};

const MANUFACTURING_METHOD_BONUS = {
  Handmade: 15,
  "Traditional Craft": 10,
  "Machine-made": 0,
  Automated: -5,
  "3D Printed": 5,
};

const COUNTRY_MULTIPLIERS = {
  "United States": 1.0,
  Canada: 1.0,
  "United Kingdom": 0.9,
  Germany: 0.9,
  France: 0.9,
  Italy: 0.9,
  Spain: 0.9,
  Netherlands: 0.9,
  Sweden: 0.8,
  Denmark: 0.8,
  India: 0.7,
  China: 0.6,
  Japan: 0.8,
  Australia: 0.9,
  "New Zealand": 0.9,
};

const MATERIAL_EMISSIONS = {
  "Organic Cotton": 0.8,
  "Recycled Plastic": 0.5,
  Bamboo: 0.3,
  Hemp: 0.4,
  Cork: 0.2,
  Jute: 0.6,
  Linen: 0.9,
  Wool: 2.5,
  Wood: 0.7,
  Glass: 1.2,
  Aluminum: 1.8,
  "Recycled Paper": 0.4,
  "Regular Cotton": 2.1,
  "Virgin Plastic": 3.2,
  "Synthetic Fibers": 2.8,
};

const PACKAGING_EMISSIONS = {
  "Plastic-Free": 0.1,
  Compostable: 0.15,
  Biodegradable: 0.12,
  Recyclable: 0.3,
  Reusable: 0.2,
  "Minimal Packaging": 0.25,
};

const WEIGHTS = {
  materials: 0.25,
  manufacturing: 0.2,
  shipping: 0.15,
  packaging: 0.2,
  certifications: 0.2,
};

export default class EcoScoreCalculator {
  static calculateMaterialsScore(materials) {
    if (!materials.length) return 0;
    const totalScore = materials.reduce(
      (sum, material) => sum + (MATERIAL_SCORES[material] || 50),
      0
    );
    return Math.min(100, totalScore / materials.length);
  }

  static calculateManufacturingScore(energyConsumption, manufacturingMethod) {
    const energy = parseFloat(energyConsumption) || 0;
    let baseScore;
    if (energy <= 1.0) baseScore = 95;
    else if (energy <= 2.0) baseScore = 85;
    else if (energy <= 5.0) baseScore = 70;
    else if (energy <= 10.0) baseScore = 50;
    else baseScore = 25;

    const methodBonus = MANUFACTURING_METHOD_BONUS[manufacturingMethod] || 0;
    return Math.max(0, Math.min(100, baseScore + methodBonus));
  }

  static calculateShippingScore(shippingDistance, countryOfOrigin) {
    const distance = parseFloat(shippingDistance) || 0;
    let baseScore;
    if (distance <= 100) baseScore = 95;
    else if (distance <= 500) baseScore = 85;
    else if (distance <= 1000) baseScore = 70;
    else if (distance <= 5000) baseScore = 50;
    else baseScore = 25;

    const multiplier = COUNTRY_MULTIPLIERS[countryOfOrigin] || 0.8;
    return Math.max(0, Math.min(100, baseScore * multiplier));
  }

  static calculatePackagingScore(packagingType) {
    return PACKAGING_SCORES[packagingType] || 50;
  }

  static calculateCertificationsScore(certifications) {
    if (!certifications.length) return 0;
    const totalScore = certifications.reduce(
      (sum, cert) => sum + (CERTIFICATION_SCORES[cert] || 0),
      0
    );
    return Math.min(100, 40 + totalScore);
  }

  static calculateCarbonFootprint(formData) {
    const materialEmissions =
      formData.materials.reduce(
        (sum, material) =>
          sum + (MATERIAL_EMISSIONS[material] || 1.0),
        0
      ) / Math.max(1, formData.materials.length);

    const energy = parseFloat(formData.energyConsumption) || 0;
    const manufacturingEmissions = energy * 0.4;

    const distance = parseFloat(formData.shippingDistance) || 0;
    const shippingEmissions = distance * 0.0002;

    const packagingEmissions =
      PACKAGING_EMISSIONS[formData.packagingType] || 0.5;

    return Number(
      (materialEmissions +
        manufacturingEmissions +
        shippingEmissions +
        packagingEmissions).toFixed(2)
    );
  }

  static assignGrade(score) {
    if (score >= 90) return "A+";
    if (score >= 85) return "A";
    if (score >= 80) return "A-";
    if (score >= 75) return "B+";
    if (score >= 70) return "B";
    if (score >= 65) return "B-";
    if (score >= 60) return "C+";
    if (score >= 55) return "C";
    if (score >= 50) return "C-";
    if (score >= 40) return "D+";
    if (score >= 30) return "D";
    return "F";
  }

  static generateExplanation(grade, breakdown) {
    const { materials, manufacturing, shipping, packaging, certifications } = breakdown;

    const scores = { materials, manufacturing, shipping, packaging, certifications };

    const strongest = Object.entries(scores).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];

    const weakest = Object.entries(scores).reduce((a, b) =>
      a[1] < b[1] ? a : b
    )[0];

    const gradeDescriptions = {
      "A+": "Excellent",
      A: "Excellent",
      "A-": "Very Good",
      "B+": "Good",
      B: "Good",
      "B-": "Fair",
      "C+": "Average",
      C: "Average",
      "C-": "Below Average",
      "D+": "Poor",
      D: "Poor",
      F: "Very Poor",
    };

    const description = gradeDescriptions[grade] || "Average";

    return `${description}: Strong performance in ${strongest.replace(/([A-Z])/g, " $1").toLowerCase()}, but ${weakest.replace(/([A-Z])/g, " $1").toLowerCase()} could be improved.`;
  }

  static calculate(formData) {
    const materialsScore = this.calculateMaterialsScore(formData.materials);
    const manufacturingScore = this.calculateManufacturingScore(
      formData.energyConsumption,
      formData.manufacturingMethod
    );
    const shippingScore = this.calculateShippingScore(
      formData.shippingDistance,
      formData.countryOfOrigin
    );
    const packagingScore = this.calculatePackagingScore(formData.packagingType);
    const certificationsScore = this.calculateCertificationsScore(formData.certifications);

    const finalScore = Math.round(
      materialsScore * WEIGHTS.materials +
      manufacturingScore * WEIGHTS.manufacturing +
      shippingScore * WEIGHTS.shipping +
      packagingScore * WEIGHTS.packaging +
      certificationsScore * WEIGHTS.certifications
    );

    const grade = this.assignGrade(finalScore);
    const carbonFootprint = this.calculateCarbonFootprint(formData);

    const breakdown = {
      materials: Math.round(materialsScore),
      manufacturing: Math.round(manufacturingScore),
      shipping: Math.round(shippingScore),
      packaging: Math.round(packagingScore),
      certifications: Math.round(certificationsScore),
    };

    const explanation = this.generateExplanation(grade, breakdown);

    return {
      grade,
      score: finalScore,
      explanation,
      carbonFootprint,
      breakdown,
    };
  }
}

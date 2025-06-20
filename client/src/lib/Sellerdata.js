import { SellerDatabaseService } from '../lib/Sellerdatabase'; // ✅ Adjust this path if needed

export class SellerDataService {
  static async getProducts() {
    try {
      const dbProducts = await SellerDatabaseService.getProducts();
      return dbProducts.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        originalPrice: p.original_price || undefined,
        image: p.image_url || "/placeholder.svg?height=200&width=200",
        category: p.category,
        ecoScore: p.eco_score_grade || "N/A",
        ecoScoreNumeric: p.eco_score_numeric || 0,
        status: p.status,
        views: p.views_count,
        orders: p.orders_count,
        stock: p.stock_quantity,
        materials: p.materials || [],
        certifications: p.certifications || [],
        carbonFootprint: p.carbon_footprint || 0,
        createdAt: p.created_at,
        updatedAt: p.updated_at,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  static async getOrders() {
    try {
      const dbOrders = await SellerDatabaseService.getOrders();
      return dbOrders.map((o) => ({
        id: o.id,
        customerName: o.customer_name,
        customerEmail: o.customer_email,
        productName: `Product ${o.product_id}`,
        quantity: o.quantity,
        price: o.unit_price,
        total: o.total_amount,
        status: o.status,
        orderDate: o.order_date,
        shippingAddress: o.shipping_address || "",
        ecoImpact: {
          co2Saved: o.co2_saved,
          plasticAvoided: o.plastic_avoided,
        },
      }));
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  }

  static async getCustomers() {
    try {
      const dbCustomers = await SellerDatabaseService.getCustomers();
      return dbCustomers.map((c) => ({
        id: c.id,
        name: c.customer_name,
        email: c.customer_email,
        location: c.location || "Unknown",
        totalOrders: c.total_orders,
        totalSpent: c.total_spent,
        ecoScore: c.eco_score_grade || "N/A",
        sustainabilityRank: c.sustainability_rank,
        joinDate: c.first_order_date || c.created_at,
        lastOrder: c.last_order_date || c.created_at,
        status: c.status,
      }));
    } catch (error) {
      console.error("Error fetching customers:", error);
      return [];
    }
  }

  static async getAnalytics() {
    try {
      return await SellerDatabaseService.getAnalytics();
    } catch (error) {
      console.error("Error fetching analytics:", error);
      return null;
    }
  }

  static async updateProduct(id, updates) {
    try {
      const updated = await SellerDatabaseService.updateProduct(id, {
        name: updates.name,
        price: updates.price,
        stock_quantity: updates.stock,
        status: updates.status,
      });

      if (updated) {
        return {
          id: updated.id,
          name: updated.name,
          price: updated.price,
          originalPrice: updated.original_price || undefined,
          image: updated.image_url || "/placeholder.svg?height=200&width=200",
          category: updated.category,
          ecoScore: updated.eco_score_grade || "N/A",
          ecoScoreNumeric: updated.eco_score_numeric || 0,
          status: updated.status,
          views: updated.views_count,
          orders: updated.orders_count,
          stock: updated.stock_quantity,
          materials: updated.materials || [],
          certifications: updated.certifications || [],
          carbonFootprint: updated.carbon_footprint || 0,
          createdAt: updated.created_at,
          updatedAt: updated.updated_at,
        };
      }
      return null;
    } catch (error) {
      console.error("Error updating product:", error);
      return null;
    }
  }

  static async deleteProduct(id) {
    try {
      return await SellerDatabaseService.deleteProduct(id);
    } catch (error) {
      console.error("Error deleting product:", error);
      return false;
    }
  }

  static async updateOrderStatus(id, status) {
    try {
      const updated = await SellerDatabaseService.updateOrderStatus(id, status);
      if (updated) {
        return {
          id: updated.id,
          customerName: updated.customer_name,
          customerEmail: updated.customer_email,
          productName: `Product ${updated.product_id}`,
          quantity: updated.quantity,
          price: updated.unit_price,
          total: updated.total_amount,
          status: updated.status,
          orderDate: updated.order_date,
          shippingAddress: updated.shipping_address || "",
          ecoImpact: {
            co2Saved: updated.co2_saved,
            plasticAvoided: updated.plastic_avoided,
          },
        };
      }
      return null;
    } catch (error) {
      console.error("Error updating order status:", error);
      return null;
    }
  }
}

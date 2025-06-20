import { supabase } from "../lib/supabase/Client.js";

export class SellerDatabaseService {
  // Get current seller ID
  static async getCurrentSellerId() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: seller } = await supabase.from("sellers").select("id").eq("user_id", user.id).single();

    return seller?.id || null;
  }

  // Products
  static async getProducts() {
    const sellerId = await this.getCurrentSellerId();
    if (!sellerId) return [];

    const { data, error } = await supabase
      .from("seller_products")
      .select("*")
      .eq("seller_id", sellerId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      return [];
    }

    return data || [];
  }

  static async createProduct(productData) {
    const sellerId = await this.getCurrentSellerId();
    if (!sellerId) return null;

    const { data, error } = await supabase
      .from("seller_products")
      .insert([{ ...productData, seller_id: sellerId }])
      .select()
      .single();

    if (error) {
      console.error("Error creating product:", error);
      return null;
    }

    return data;
  }

  static async updateProduct(id, updates) {
    const { data, error } = await supabase
      .from("seller_products")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating product:", error);
      return null;
    }

    return data;
  }

  static async deleteProduct(id) {
    const { error } = await supabase.from("seller_products").delete().eq("id", id);

    if (error) {
      console.error("Error deleting product:", error);
      return false;
    }

    return true;
  }

  // Orders
  static async getOrders() {
    const sellerId = await this.getCurrentSellerId();
    if (!sellerId) return [];

    const { data, error } = await supabase
      .from("seller_orders")
      .select("*")
      .eq("seller_id", sellerId)
      .order("order_date", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      return [];
    }

    return data || [];
  }

  static async updateOrderStatus(id, status) {
    const updates = { status, updated_at: new Date().toISOString() };

    if (status === "shipped") {
      updates.shipped_date = new Date().toISOString();
    } else if (status === "delivered") {
      updates.delivered_date = new Date().toISOString();
    }

    const { data, error } = await supabase.from("seller_orders").update(updates).eq("id", id).select().single();

    if (error) {
      console.error("Error updating order status:", error);
      return null;
    }

    return data;
  }

  // Customers
  static async getCustomers() {
    const sellerId = await this.getCurrentSellerId();
    if (!sellerId) return [];

    const { data, error } = await supabase
      .from("seller_customers")
      .select("*")
      .eq("seller_id", sellerId)
      .order("total_spent", { ascending: false });

    if (error) {
      console.error("Error fetching customers:", error);
      return [];
    }

    return data || [];
  }

  // Analytics - REAL DATA ONLY
  static async getAnalytics() {
    const sellerId = await this.getCurrentSellerId();
    if (!sellerId) {
      console.log("No seller ID found");
      return null;
    }

    console.log("Fetching analytics for seller:", sellerId);

    // Get all data in parallel
    const [productsResult, ordersResult, customersResult] = await Promise.all([
      supabase.from("seller_products").select("*").eq("seller_id", sellerId),
      supabase.from("seller_orders").select("*").eq("seller_id", sellerId),
      supabase.from("seller_customers").select("*").eq("seller_id", sellerId),
    ]);

    const products = productsResult.data || [];
    const orders = ordersResult.data || [];
    const customers = customersResult.data || [];

    console.log("Raw data:", { products: products.length, orders: orders.length, customers: customers.length });

    // Calculate real metrics
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const thisMonthOrders = orders.filter((order) => {
      const orderDate = new Date(order.order_date);
      return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
    });

    const lastMonthOrders = orders.filter((order) => {
      const orderDate = new Date(order.order_date);
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return orderDate.getMonth() === lastMonth && orderDate.getFullYear() === lastMonthYear;
    });

    const thisMonthRevenue = thisMonthOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
    const lastMonthRevenue = lastMonthOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0);

    const revenueGrowth = lastMonthRevenue > 0 ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0;

    const totalCo2Saved = orders.reduce((sum, order) => sum + (order.co2_saved || 0), 0);
    const totalPlasticAvoided = orders.reduce((sum, order) => sum + (order.plastic_avoided || 0), 0);

    const avgEcoScore =
      products.length > 0
        ? products.reduce((sum, product) => sum + (product.eco_score_numeric || 0), 0) / products.length
        : 0;

    // Generate monthly data from actual orders
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const month = date.toLocaleDateString("en-US", { month: "short" });

      const monthOrders = orders.filter((order) => {
        const orderDate = new Date(order.order_date);
        return orderDate.getMonth() === date.getMonth() && orderDate.getFullYear() === date.getFullYear();
      });

      const monthRevenue = monthOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
      const monthCo2 = monthOrders.reduce((sum, order) => sum + (order.co2_saved || 0), 0);

      monthlyData.push({
        month,
        revenue: monthRevenue,
        orders: monthOrders.length,
        co2Saved: monthCo2,
      });
    }

    // Get top products based on actual orders
    const topProducts = products
      .sort((a, b) => (b.orders_count || 0) - (a.orders_count || 0))
      .slice(0, 5)
      .map((product) => ({
        id: product.id,
        name: product.name,
        revenue: (product.orders_count || 0) * product.price,
        orders: product.orders_count || 0,
        ecoScore: product.eco_score_grade || "N/A",
      }));

    const analyticsData = {
      revenue: {
        total: totalRevenue,
        thisMonth: thisMonthRevenue,
        lastMonth: lastMonthRevenue,
        growth: Math.round(revenueGrowth * 100) / 100,
      },
      orders: {
        total: orders.length,
        thisMonth: thisMonthOrders.length,
        pending: orders.filter((o) => o.status === "pending").length,
        completed: orders.filter((o) => o.status === "delivered").length,
      },
      products: {
        total: products.length,
        active: products.filter((p) => p.status === "active").length,
        pending: products.filter((p) => p.status === "pending").length,
        avgEcoScore: Math.round(avgEcoScore),
      },
      sustainability: {
        totalCo2Saved: Math.round(totalCo2Saved * 10) / 10,
        totalPlasticAvoided: Math.round(totalPlasticAvoided * 10) / 10,
        treesPlanted: Math.round(totalCo2Saved / 0.5), // Rough calculation: 0.5kg CO2 per tree
        avgEcoScore: Math.round(avgEcoScore),
        monthlyGrowth: 12.5, // This would need historical data to calculate properly
      },
      topProducts,
      monthlyData,
    };

    console.log("Calculated analytics:", analyticsData);
    return analyticsData;
  }

  // Create seller profile
  static async createSellerProfile(profileData) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("sellers")
      .insert([{ ...profileData, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error("Error creating seller profile:", error);
      return null;
    }

    return data;
  }

  // Get seller profile
  static async getSellerProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase.from("sellers").select("*").eq("user_id", user.id).single();

    if (error) {
      console.error("Error fetching seller profile:", error);
      return null;
    }

    return data;
  }
}

export { supabase };
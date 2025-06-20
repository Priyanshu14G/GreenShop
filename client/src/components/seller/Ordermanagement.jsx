import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Package, MoreHorizontal, Eye, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { SellerDataService } from "../../lib/Sellerdata";
import { useToast } from "../ui/use-toast";

export function OrderManagement() {
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      const data = await SellerDataService.getOrders();
      setOrders(data);
      setFilteredOrders(data);
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  const handleStatusUpdate = useCallback(
    async (orderId, newStatus) => {
      const updated = await SellerDataService.updateOrderStatus(orderId, newStatus);
      if (updated) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
        toast({
          title: "Order updated",
          description: `Order status changed to ${newStatus}.`,
        });
      }
    },
    [toast]
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-500";
      case "shipped":
        return "bg-blue-500";
      case "processing":
        return "bg-yellow-500";
      case "pending":
        return "bg-orange-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return CheckCircle;
      case "shipped":
        return Truck;
      case "processing":
        return Package;
      case "pending":
        return Clock;
      case "cancelled":
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Order Management</h1>
          <p className="text-muted-foreground dark:text-gray-400">Track and manage your customer orders</p>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{orderStats.total}</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">Total Orders</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{orderStats.pending}</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">Pending</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{orderStats.processing}</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">Processing</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{orderStats.shipped}</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">Shipped</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{orderStats.delivered}</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">Delivered</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground dark:text-gray-400" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white text-black placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                <SelectItem value="all" className="hover:bg-gray-100 dark:hover:bg-gray-700">All Status</SelectItem>
                <SelectItem value="pending" className="hover:bg-gray-100 dark:hover:bg-gray-700">Pending</SelectItem>
                <SelectItem value="processing" className="hover:bg-gray-100 dark:hover:bg-gray-700">Processing</SelectItem>
                <SelectItem value="shipped" className="hover:bg-gray-100 dark:hover:bg-gray-700">Shipped</SelectItem>
                <SelectItem value="delivered" className="hover:bg-gray-100 dark:hover:bg-gray-700">Delivered</SelectItem>
                <SelectItem value="cancelled" className="hover:bg-gray-100 dark:hover:bg-gray-700">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
            <Package className="mr-2 h-5 w-5" />
            Orders ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-gray-900 dark:text-gray-100">Order ID</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Customer</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Product</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Quantity</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Total</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Status</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Date</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <TableRow key={order.id} className="border-gray-200 dark:border-gray-700">
                    <TableCell className="font-medium text-gray-900 dark:text-gray-100">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{order.customerName}</div>
                        <div className="text-sm text-muted-foreground dark:text-gray-400">{order.customerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-100">{order.productName}</TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-100">{order.quantity}</TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-100">${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={`text-white ${getStatusColor(order.status)}`}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-100">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:bg-gray-200 dark:hover:bg-gray-700">
                            <MoreHorizontal className="h-4 w-4 text-gray-900 dark:text-gray-100" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                          align="end" 
                          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                        >
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsDetailDialogOpen(true);
                            }}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            <span className="text-gray-900 dark:text-gray-100">View Details</span>
                          </DropdownMenuItem>
                          {order.status === "pending" && (
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(order.id, "processing")}
                              className="hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Package className="mr-2 h-4 w-4" />
                              <span className="text-gray-900 dark:text-gray-100">Mark Processing</span>
                            </DropdownMenuItem>
                          )}
                          {order.status === "processing" && (
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(order.id, "shipped")}
                              className="hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Truck className="mr-2 h-4 w-4" />
                              <span className="text-gray-900 dark:text-gray-100">Mark Shipped</span>
                            </DropdownMenuItem>
                          )}
                          {order.status === "shipped" && (
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(order.id, "delivered")}
                              className="hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              <span className="text-gray-900 dark:text-gray-100">Mark Delivered</span>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Order Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="text-gray-900 dark:text-gray-100">
                      <strong>Order ID:</strong> {selectedOrder.id}
                    </div>
                    <div className="text-gray-900 dark:text-gray-100">
                      <strong>Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}
                    </div>
                    <div className="text-gray-900 dark:text-gray-100">
                      <strong>Status:</strong>
                      <Badge className={`ml-2 text-white ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Customer Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="text-gray-900 dark:text-gray-100">
                      <strong>Name:</strong> {selectedOrder.customerName}
                    </div>
                    <div className="text-gray-900 dark:text-gray-100">
                      <strong>Email:</strong> {selectedOrder.customerEmail}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Product Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="text-gray-900 dark:text-gray-100">
                    <strong>Product:</strong> {selectedOrder.productName}
                  </div>
                  <div className="text-gray-900 dark:text-gray-100">
                    <strong>Quantity:</strong> {selectedOrder.quantity}
                  </div>
                  <div className="text-gray-900 dark:text-gray-100">
                    <strong>Price:</strong> ${selectedOrder.price.toFixed(2)}
                  </div>
                  <div className="text-gray-900 dark:text-gray-100">
                    <strong>Total:</strong> ${selectedOrder.total.toFixed(2)}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Shipping Address</h3>
                <p className="text-sm text-gray-900 dark:text-gray-100">{selectedOrder.shippingAddress}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Environmental Impact</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <div className="font-medium text-green-800 dark:text-green-200">CO₂ Saved</div>
                    <div className="text-green-600 dark:text-green-300">{selectedOrder.ecoImpact.co2Saved} kg</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <div className="font-medium text-blue-800 dark:text-blue-200">Plastic Avoided</div>
                    <div className="text-blue-600 dark:text-blue-300">{selectedOrder.ecoImpact.plasticAvoided} kg</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
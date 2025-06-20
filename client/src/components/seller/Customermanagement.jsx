import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Users, MoreHorizontal, Eye, Mail, MapPin, Award, TrendingUp, Star } from "lucide-react";
import { SellerDatabaseService } from "../../lib/Sellerdatabase";

export function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await SellerDatabaseService.getCustomers();
      setCustomers(data);
      setFilteredCustomers(data);
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    let filtered = customers;

    if (searchTerm) {
      filtered = filtered.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((customer) => customer.status === statusFilter);
    }

    setFilteredCustomers(filtered);
  }, [customers, searchTerm, statusFilter]);

  const getEcoScoreColor = (score) => {
    if (score.startsWith("A")) return "bg-green-500";
    if (score.startsWith("B")) return "bg-lime-500";
    if (score.startsWith("C")) return "bg-orange-500";
    return "bg-red-500";
  };

  const customerStats = {
    total: customers.length,
    active: customers.filter((c) => c.status === "active").length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgOrderValue:
      customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.reduce((sum, c) => sum + c.totalOrders, 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Customer Management</h1>
          <p className="text-muted-foreground dark:text-gray-400">Manage relationships with your eco-conscious customers</p>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{customerStats.total}</div>
                <p className="text-xs text-muted-foreground dark:text-gray-400">Total Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{customerStats.active}</div>
                <p className="text-xs text-muted-foreground dark:text-gray-400">Active Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">${customerStats.totalRevenue.toFixed(0)}</div>
                <p className="text-xs text-muted-foreground dark:text-gray-400">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">${customerStats.avgOrderValue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground dark:text-gray-400">Avg Order Value</p>
              </div>
            </div>
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
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white text-black placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="text-black dark:text-white w-[150px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                <SelectItem value="all" className="hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white">All Status</SelectItem>
                <SelectItem value="active" className="hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white">Active</SelectItem>
                <SelectItem value="inactive" className="hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
            <Users className="mr-2 h-5 w-5" />
            Customers ({filteredCustomers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-gray-900 dark:text-gray-100">Customer</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Location</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Orders</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Total Spent</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Eco-Score</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Sustainability Rank</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Last Order</TableHead>
                <TableHead className="text-gray-900 dark:text-gray-100">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="border-gray-200 dark:border-gray-700">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                        <AvatarFallback className="bg-gray-200 dark:bg-gray-600">
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{customer.name}</div>
                        <div className="text-sm text-muted-foreground dark:text-gray-400">{customer.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-900 dark:text-gray-100">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground dark:text-gray-400" />
                      {customer.location}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100">{customer.totalOrders}</TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100">${customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={`text-white ${getEcoScoreColor(customer.ecoScore)}`}>{customer.ecoScore}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-900 dark:text-gray-100">
                      <Award className="h-4 w-4 mr-1 text-yellow-500" />#{customer.sustainabilityRank}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100">
                    {new Date(customer.lastOrder).toLocaleDateString()}
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
                            setSelectedCustomer(customer);
                            setIsDetailDialogOpen(true);
                          }}
                          className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          <span className="text-gray-900 dark:text-gray-100">View Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => window.open(`mailto:${customer.email}`)}
                          className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          <span className="text-gray-900 dark:text-gray-100">Send Email</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Customer Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">Customer Profile</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedCustomer.avatar || "/placeholder.svg"} alt={selectedCustomer.name} />
                  <AvatarFallback className="text-lg bg-gray-200 dark:bg-gray-600">
                    {selectedCustomer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{selectedCustomer.name}</h3>
                  <p className="text-muted-foreground dark:text-gray-400">{selectedCustomer.email}</p>
                  <div className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground dark:text-gray-400" />
                    <span className="text-sm text-gray-900 dark:text-gray-100">{selectedCustomer.location}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedCustomer.totalOrders}</div>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">Total Orders</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">${selectedCustomer.totalSpent.toFixed(2)}</div>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">Total Spent</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Sustainability Profile</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-900 dark:text-gray-100">Eco-Score:</span>
                      <Badge className={`text-white ${getEcoScoreColor(selectedCustomer.ecoScore)}`}>
                        {selectedCustomer.ecoScore}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-900 dark:text-gray-100">Sustainability Rank:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">#{selectedCustomer.sustainabilityRank}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Account Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="text-gray-900 dark:text-gray-100">
                      <strong>Joined:</strong> {new Date(selectedCustomer.joinDate).toLocaleDateString()}
                    </div>
                    <div className="text-gray-900 dark:text-gray-100">
                      <strong>Last Order:</strong> {new Date(selectedCustomer.lastOrder).toLocaleDateString()}
                    </div>
                    <div className="text-gray-900 dark:text-gray-100">
                      <strong>Status:</strong>
                      <Badge className="ml-2" variant={selectedCustomer.status === "active" ? "default" : "secondary"}>
                        {selectedCustomer.status}
                      </Badge>
                    </div>
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
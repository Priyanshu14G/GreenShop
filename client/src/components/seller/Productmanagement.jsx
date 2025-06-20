import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button} from "../ui/button";
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle} from "../ui/dialog";
import { Label} from "../ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,DropdownMenuTrigger} from "../ui/dropdown-menu";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   Label,
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger
// } from './components/ui'; // Adjust import path as needed
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Eye,
  Package
} from 'lucide-react';

// Mock data service - replace with your actual API calls
class SellerDataService {
  static async getProducts() {
    // In a real app, this would be an API call
    return [
      {
        id: '1',
        name: 'Organic Cotton T-Shirt',
        category: 'Clothing',
        price: 29.99,
        originalPrice: 39.99,
        stock: 42,
        status: 'active',
        ecoScore: 'A+',
        views: 1250,
        orders: 87,
        image: '/tshirt.jpg'
      },
      {
        id: '2',
        name: 'Bamboo Toothbrush',
        category: 'Personal Care',
        price: 4.99,
        stock: 156,
        status: 'active',
        ecoScore: 'A',
        views: 890,
        orders: 210,
        image: '/toothbrush.jpg'
      },
      // Add more sample products as needed
    ];
  }

  static async updateProduct(id, data) {
    // In a real app, this would be an API call
    console.log(`Updating product ${id} with`, data);
    return { ...data, id };
  }

  static async deleteProduct(id) {
    // In a real app, this would be an API call
    console.log(`Deleting product ${id}`);
    return true;
  }
}

// Toast hook - simplified version
const useToast = () => {
  return {
    toast: (options) => {
      console.log('Toast:', options);
      // In a real app, this would show a toast notification
    }
  };
};

const ProductManagement = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await SellerDataService.getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: 'Error loading products',
          description: 'There was an error loading your products.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((product) => product.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((product) => product.category === categoryFilter);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, statusFilter, categoryFilter]);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleSaveProduct = async () => {
    if (editingProduct) {
      try {
        const updated = await SellerDataService.updateProduct(editingProduct.id, editingProduct);

        if (updated) {
          setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
          setFilteredProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));

          toast({
            title: 'Product updated',
            description: 'Product has been successfully updated.',
          });
        }
      } catch (error) {
        toast({
          title: 'Error updating product',
          description: 'There was an error updating the product.',
          variant: 'destructive',
        });
      }
    }
    setIsEditDialogOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const success = await SellerDataService.deleteProduct(productId);
      if (success) {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
        setFilteredProducts((prev) => prev.filter((p) => p.id !== productId));
        toast({
          title: 'Product deleted',
          description: 'Product has been successfully deleted.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error deleting product',
        description: 'There was an error deleting the product.',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'draft':
        return 'bg-gray-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getEcoScoreColor = (score) => {
    if (score.startsWith('A')) return 'bg-green-500';
    if (score.startsWith('B')) return 'bg-lime-500';
    if (score.startsWith('C')) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const categories = [...new Set(products.map((p) => p.category))];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Product Management</h1>
          <p className="text-muted-foreground">Manage your sustainable product catalog</p>
        </div>
        <Button asChild>
          <a href="/seller/submit-product">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </a>
        </Button>
      </div>

      {/* Filters */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] dark:bg-gray-700 dark:border-gray-600">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px] dark:bg-gray-700 dark:border-gray-600">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
            <Package className="mr-2 h-5 w-5" />
            Products ({filteredProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredProducts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="dark:border-gray-700">
                  <TableHead className="text-gray-900 dark:text-gray-100">Product</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Category</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Price</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Stock</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Status</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Eco-Score</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Views</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Orders</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className="dark:border-gray-700">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image || '/placeholder.svg'}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                          style={{ width: '40px', height: '40px' }}
                        />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{product.name}</div>
                          <div className="text-sm text-muted-foreground">ID: {product.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-100">{product.category}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">${product.price.toFixed(2)}</div>
                        {product.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.stock > 10 ? 'default' : 'destructive'}>{product.stock} units</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-white ${getStatusColor(product.status)}`}>{product.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-white ${getEcoScoreColor(product.ecoScore)}`}>{product.ecoScore}</Badge>
                    </TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-100">{product.views.toLocaleString()}</TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-100">{product.orders}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                          <DropdownMenuItem
                            onClick={() => window.open(`/products/${product.id}`, '_blank')}
                            className="dark:hover:bg-gray-700"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditProduct(product)}
                            className="dark:hover:bg-gray-700"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 dark:hover:bg-gray-700"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No products found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Get started by adding your first product'}
              </p>
              <Button asChild>
                <a href="/seller/submit-product">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">Edit Product</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-900 dark:text-gray-100">
                    Product Name
                  </Label>
                  <Input
                    id="name"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <Label htmlFor="price" className="text-gray-900 dark:text-gray-100">
                    Price
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number.parseFloat(e.target.value) })}
                    className="dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stock" className="text-gray-900 dark:text-gray-100">
                    Stock
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number.parseInt(e.target.value) })}
                    className="dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <Label htmlFor="status" className="text-gray-900 dark:text-gray-100">
                    Status
                  </Label>
                  <Select
                    value={editingProduct.status}
                    onValueChange={(value) => setEditingProduct({ ...editingProduct, status: value })}
                  >
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="dark:border-gray-600">
                  Cancel
                </Button>
                <Button onClick={handleSaveProduct}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;

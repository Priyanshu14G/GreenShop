import  SellerLayout  from "../components/seller/Sellerlayout";
//import { ProductManagement } from "../components/seller/Productmanagement";
import  ProductManagement  from "../components/seller/Productmanagement";

export default function SellerProductsPage() {
  return (
    <SellerLayout>
      <ProductManagement />
    </SellerLayout>
  );
}
import  SellerLayout  from "../components/seller/Sellerlayout";
import { OrderManagement } from "../components/seller/Ordermanagement";

export default function SellerOrdersPage() {
  return (
    <SellerLayout>
      <OrderManagement />
    </SellerLayout>
  );
}
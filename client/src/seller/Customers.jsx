import  SellerLayout  from "../components/seller/Sellerlayout";
import { CustomerManagement } from "../components/seller/Customermanagement";

export default function SellerCustomersPage() {
  return (
    <SellerLayout>
      <CustomerManagement />
    </SellerLayout>
  );
}
import  SellerLayout  from "../components/seller/Sellerlayout";
import { SellerDashboard } from "../components/seller/Dashboard_seller";

export default function SellerDashboardPage() {
  return (
    <SellerLayout>
      <SellerDashboard />
    </SellerLayout>
  );
}
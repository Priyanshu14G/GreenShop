import  SellerLayout from "../components/seller/Sellerlayout";
import { ProductSubmissionFlow } from "../components/seller/Productsubmission";

export default function SubmitProductPage() {
  return (
    <SellerLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-black dark:text-white">Submit New Product</h1>
          <p className="text-muted-foreground text-black dark:text-white">
            Add your sustainable product to GreenShop with AI-powered Eco-Score evaluation
          </p>
        </div>
        <ProductSubmissionFlow />
      </div>
    </SellerLayout>
  );
}
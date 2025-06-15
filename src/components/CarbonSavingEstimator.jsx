// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, TreePine, Car } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export default function CarbonSavingEstimator({ carbonSaved }) {
  const treesEquivalent = Math.round(carbonSaved * 0.5)
  const milesEquivalent = Math.round(carbonSaved * 2.5)

  return (
    <Card className="border-green-200 dark:border-green-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
          <Leaf className="h-5 w-5" />
          Your Environmental Impact
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{carbonSaved}kg CO₂</div>
          <div className="text-sm text-muted-foreground">Carbon footprint reduced with this order</div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-2">
            <TreePine className="h-6 w-6 text-green-500 mx-auto" />
            <div className="text-sm font-medium">{treesEquivalent} trees</div>
            <div className="text-xs text-muted-foreground">planted equivalent</div>
          </div>
          <div className="space-y-2">
            <Car className="h-6 w-6 text-blue-500 mx-auto" />
            <div className="text-sm font-medium">{milesEquivalent} miles</div>
            <div className="text-xs text-muted-foreground">car emissions saved</div>
          </div>
        </div>

        <div className="text-xs text-center text-muted-foreground">
          Impact calculated based on sustainable product choices
        </div>
      </CardContent>
    </Card>
  )
}

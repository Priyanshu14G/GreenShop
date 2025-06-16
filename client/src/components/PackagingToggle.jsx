// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Package, Leaf, Recycle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export default function PackagingToggle({ value, onChange }) {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="space-y-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="minimal" id="minimal" />
        <Label htmlFor="minimal" className="flex-1">
          <Card className="cursor-pointer hover:bg-accent transition-colors">
            <CardContent className="flex items-center gap-3 p-4">
              <Leaf className="h-5 w-5 text-green-500" />
              <div>
                <div className="font-medium">Minimal Packaging</div>
                <div className="text-sm text-muted-foreground">
                  Biodegradable materials only • $7 discount
                </div>
              </div>
            </CardContent>
          </Card>
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <RadioGroupItem value="recyclable" id="recyclable" />
        <Label htmlFor="recyclable" className="flex-1">
          <Card className="cursor-pointer hover:bg-accent transition-colors">
            <CardContent className="flex items-center gap-3 p-4">
              <Recycle className="h-5 w-5 text-blue-500" />
              <div>
                <div className="font-medium">Recyclable Packaging</div>
                <div className="text-sm text-muted-foreground">
                  100% recyclable cardboard • $3 discount
                </div>
              </div>
            </CardContent>
          </Card>
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <RadioGroupItem value="standard" id="standard" />
        <Label htmlFor="standard" className="flex-1">
          <Card className="cursor-pointer hover:bg-accent transition-colors">
            <CardContent className="flex items-center gap-3 p-4">
              <Package className="h-5 w-5 text-gray-500" />
              <div>
                <div className="font-medium">Standard Packaging</div>
                <div className="text-sm text-muted-foreground">
                  Regular protective packaging • No discount
                </div>
              </div>
            </CardContent>
          </Card>
        </Label>
      </div>
    </RadioGroup>
  );
}

import React, { useState, useEffect } from "react";
import { Users, Clock } from "lucide-react";

// Replace these with your actual components or basic HTML
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Progress } from "./components/ui/progress";

export default function GroupBuyWidget({ productId }) {
  const [groupBuyData, setGroupBuyData] = useState({
    currentCount: 0,
    threshold: 0,
    discount: 0,
    timeLeft: "",
    isActive: false,
  });

  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    // Mock data - replace with actual API call
    setGroupBuyData({
      currentCount: 23,
      threshold: 50,
      discount: 15,
      timeLeft: "2 days left",
      isActive: true,
    });
  }, [productId]);

  const joinGroupBuy = async () => {
    try {
      const response = await fetch("/api/group-buy/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "user123", // Mock user ID
          productId: productId,
        }),
      });

      if (response.ok) {
        setHasJoined(true);
        setGroupBuyData((prev) => ({
          ...prev,
          currentCount: prev.currentCount + 1,
        }));
      }
    } catch (error) {
      console.error("Error joining group buy:", error);
    }
  };

  if (!groupBuyData.isActive) {
    return null;
  }

  const progressPercentage = (groupBuyData.currentCount / groupBuyData.threshold) * 100;

  return (
    <Card className="border-2 border-green-200 dark:border-green-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
          <Users className="h-5 w-5" />
          Group Buy - {groupBuyData.discount}% Off
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{groupBuyData.currentCount} joined</span>
            <span>{groupBuyData.threshold} needed</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{groupBuyData.timeLeft}</span>
          </div>
          <div className="text-sm font-medium text-green-600">
            {groupBuyData.threshold - groupBuyData.currentCount} more needed
          </div>
        </div>

        <Button
          onClick={joinGroupBuy}
          disabled={hasJoined}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {hasJoined ? "Joined Group Buy!" : "Join Group Buy"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Get {groupBuyData.discount}% off when we reach {groupBuyData.threshold} buyers
        </p>
      </CardContent>
    </Card>
  );
}

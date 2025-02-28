import React from "react";
import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ListingsPage() {
  return (
    <PageContainer>
      <div className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">القوائم</h1>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث..." className="pl-2 pr-8" />
            </div>

            <Button className="gap-1">
              <PlusCircle className="h-4 w-4" />
              <span>إضافة سيارة</span>
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-1 divide-y">
            {/* Car Listing Item */}
            <div className="p-4 hover:bg-accent/50 transition-colors">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-32 h-24 bg-muted rounded-md flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row justify-between gap-2">
                    <h3 className="font-medium">مرسيدس بنز E-Class 2023</h3>
                    <div className="text-primary font-bold">$75,000</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    سيارة فاخرة بحالة ممتازة، كم منخفض
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      جديد
                    </span>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      أوتوماتيك
                    </span>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      بنزين
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Car Listing Item */}
            <div className="p-4 hover:bg-accent/50 transition-colors">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-32 h-24 bg-muted rounded-md flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row justify-between gap-2">
                    <h3 className="font-medium">بي إم دبليو X5 2022</h3>
                    <div className="text-primary font-bold">$65,000</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    سيارة دفع رباعي فاخرة، حالة ممتازة
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      مستعمل
                    </span>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      أوتوماتيك
                    </span>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      بنزين
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Car Listing Item */}
            <div className="p-4 hover:bg-accent/50 transition-colors">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-32 h-24 bg-muted rounded-md flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row justify-between gap-2">
                    <h3 className="font-medium">أودي A6 2023</h3>
                    <div className="text-primary font-bold">$58,000</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    سيارة سيدان فاخرة، تقنيات حديثة
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      جديد
                    </span>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      أوتوماتيك
                    </span>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      هجين
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

import React from "react";
import PageContainer from "@/components/layout/page-container";

export default function OverviewPage() {
  return (
    <PageContainer>
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-6">نظرة عامة</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-card p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">إجمالي السيارات</h2>
            <p className="text-3xl font-bold">24</p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">السيارات المباعة</h2>
            <p className="text-3xl font-bold">8</p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">السيارات المتاحة</h2>
            <p className="text-3xl font-bold">16</p>
          </div>
        </div>

        <div className="mt-8 bg-card p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">أحدث الإضافات</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium">مرسيدس بنز E-Class 2023</h3>
              <p className="text-sm text-muted-foreground">
                تمت الإضافة: قبل 2 يوم
              </p>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium">بي إم دبليو X5 2022</h3>
              <p className="text-sm text-muted-foreground">
                تمت الإضافة: قبل 5 أيام
              </p>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium">أودي A6 2023</h3>
              <p className="text-sm text-muted-foreground">
                تمت الإضافة: قبل أسبوع
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

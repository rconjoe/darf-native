import React from "react";
import Footer from "@/components/template/Footer";
import { useTranslation } from "react-i18next";
import ToggleTheme from "@/components/ToggleTheme";

export default function SecondPage() {
  const { t } = useTranslation();

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold">{t("titleSecondPage")}</h1>
        <div className="flex flex-row">
          <h3 className="mr-2 pt-2">Theme: </h3>
          <ToggleTheme />
        </div>
      </div>
      <Footer />
    </div>
  );
}

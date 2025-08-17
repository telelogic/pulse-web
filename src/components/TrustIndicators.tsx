import { useLanguage } from "@/hooks/useLanguage";

const TrustIndicators = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-8 px-4 bg-gray-50">
      <div className="container mx-auto text-center">
        <p className="text-gray-600 text-sm mb-6">{t("trust.subtitle")}</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-60 mb-8">
          <div className="text-lg font-bold text-gray-400">TechCorp</div>
          <div className="text-lg font-bold text-gray-400">GrowthCo</div>
          <div className="text-lg font-bold text-gray-400">ScaleUp</div>
          <div className="text-lg font-bold text-gray-400">InnovateLtd</div>
          <div className="text-lg font-bold text-gray-400">DataFlow</div>
          <div className="text-lg font-bold text-gray-400">NextGen</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-purple">99.9%</div>
            <div className="text-sm text-gray-600">{t("trust.dataAccuracy")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-purple">&lt; 15min</div>
            <div className="text-sm text-gray-600">{t("trust.setupTime")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-purple">2,500+</div>
            <div className="text-sm text-gray-600">{t("trust.businessesFutureProofed")}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
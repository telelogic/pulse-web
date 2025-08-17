import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";

const UrgencySection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-red-50 to-orange-50 border-t-2 border-destructive/30">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="flex items-center justify-center mb-4">
          <div className="w-3 h-3 bg-destructive rounded-full animate-pulse mr-3"></div>
          <span className="text-destructive font-semibold text-sm uppercase tracking-wide">
            {t("urgency.badge")}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-foreground">
          {t("urgency.title")} <span className="text-destructive">{t("urgency.daysLeft")}</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          {t("urgency.description")}
        </p>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="text-left">
            <h3 className="font-semibold text-lg mb-3 text-destructive">
              ❌ {t("urgency.waitingTeams.title")}
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• {t("urgency.waitingTeams.point1")}</li>
              <li>• {t("urgency.waitingTeams.point2")}</li>
              <li>• {t("urgency.waitingTeams.point3")}</li>
              <li>• {t("urgency.waitingTeams.point4")}</li>
            </ul>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-lg mb-3 text-green-700">
              ✅ {t("urgency.pulseUsers.title")}
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• {t("urgency.pulseUsers.point1")}</li>
              <li>• {t("urgency.pulseUsers.point2")}</li>
              <li>• {t("urgency.pulseUsers.point3")}</li>
              <li>• {t("urgency.pulseUsers.point4")}</li>
            </ul>
          </div>
        </div>
        <Button 
          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold py-4 px-8 text-lg shadow-lg transform hover:scale-105 transition-all"
          size="lg"
        >
          {t("urgency.ctaButton")}
        </Button>
        <p className="text-sm text-muted-foreground mt-4">
          ⚡ {t("urgency.supportNote")}
        </p>
      </div>
    </section>
  );
};

export default UrgencySection;
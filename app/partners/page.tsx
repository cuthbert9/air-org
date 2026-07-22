import { PartnerCard } from "@/components/ui";
import { getPartners } from "@/lib/mock/partners";

export default function PartnersPage() {
  const partners = getPartners();

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-muted">
          Directory
        </p>
        <h1 className="mt-1 text-3xl font-bold text-foreground">
          Shareholders & investors
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Select a shareholder company to open their capital and ownership
          dashboard, or use the header switcher for quick navigation.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {partners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>
    </div>
  );
}

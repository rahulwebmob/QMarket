import Navigation from '@/components/Navigation';
import {
  HeroFold,
  DivideFold,
  ClarityEngineFold,
  SourceFold,
  InfrastructureFold,
  ValidationFold,
  FounderFold,
  AccessTiersFold,
  FinalCTAFold,
} from '@/components/folds';

export default function Home() {
  return (
    <main className="relative">
      {/* Navigation */}
      <Navigation />

      {/* Fold 1: Hero */}
      <HeroFold />

      {/* Fold 2: The Divide */}
      <section id="platform">
        <DivideFold />
      </section>

      {/* Fold 3: The Clarity Engine */}
      <ClarityEngineFold />

      {/* Fold 4: The Source */}
      <SourceFold />

      {/* Fold 5: Infrastructure */}
      <section id="infrastructure">
        <InfrastructureFold />
      </section>

      {/* Fold 6: Institutional Validation */}
      <ValidationFold />

      {/* Fold 7: Founder */}
      <FounderFold />

      {/* Fold 8: Access Tiers */}
      <section id="access">
        <AccessTiersFold />
      </section>

      {/* Fold 9: Final CTA + Footer */}
      <FinalCTAFold />
    </main>
  );
}

import {
  FAQSection,
  StreamlinedReinsuranceSection,
  SureCedeImpactSection,
} from '@/components/common';

import './HomePage.scss';

export default function HomePage() {
  return (
    <>
      <SureCedeImpactSection />
      <StreamlinedReinsuranceSection />
      <FAQSection />
    </>
  );
}

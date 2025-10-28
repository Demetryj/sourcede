import { Suspense } from 'react';

import { MarketInsightsPage } from '@/views';

export const metadata = {
  title: 'Market Insights',
};

export default function MarketInsights() {
  return (
    <Suspense fallback={null}>
      <MarketInsightsPage />
    </Suspense>
  );
}

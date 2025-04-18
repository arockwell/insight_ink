'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import HowItWorksSection from './HowItWorksSection';
import AuthSection from './AuthSection';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';

export default function LandingPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // TODO: Replace with actual authentication check
  useEffect(() => {
    // For now, we're using a placeholder for authentication
    // This will be replaced with actual auth logic later
    const checkAuth = async () => {
      // Placeholder for auth check
      const authCheck = false; // Always false for now until auth is implemented
      setIsAuthenticated(authCheck);
      
      // Uncomment to redirect authenticated users to dashboard
      // if (authCheck) {
      //   router.push('/notes');
      // }
    };
    
    checkAuth();
  }, [router]);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <LandingHeader isAuthenticated={isAuthenticated} />
      <main className="flex-grow">
        <HeroSection />
        <FeatureSection />
        <HowItWorksSection />
        <AuthSection />
      </main>
      <LandingFooter />
    </div>
  );
}

'use client';

import { CheckCircleIcon } from '@heroicons/react/24/solid';

// Step card component
const StepCard = ({ 
  number, 
  title, 
  description 
}: { 
  number: number; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center md:items-start">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center md:text-left">{description}</p>
    </div>
  );
};

export default function HowItWorksSection() {
  const steps = [
    {
      title: "Sign Up",
      description: "Create an account to get started with Insight Ink."
    },
    {
      title: "Create Notes",
      description: "Write, organize, and categorize your thoughts and ideas."
    },
    {
      title: "Add Tags",
      description: "Tag your notes for easy organization and retrieval."
    },
    {
      title: "Discover Insights",
      description: "Use AI-powered features to find connections in your notes."
    }
  ];

  return (
    <section className="py-16 bg-white" id="how-it-works-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">How It Works</h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Get started with Insight Ink in just a few simple steps
          </p>
        </div>
        
        {/* Steps for larger screens */}
        <div className="hidden md:block max-w-5xl mx-auto mb-12">
          <div className="flex justify-between items-start">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <StepCard
                  number={index + 1}
                  title={step.title}
                  description={step.description}
                />
                
                {/* Connector line between steps (except the last one) */}
                {index < steps.length - 1 && (
                  <div className="w-24 h-1 bg-blue-200 mt-6 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Steps for mobile */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start">
              <StepCard
                number={index + 1}
                title={step.title}
                description={step.description}
              />
            </div>
          ))}
        </div>
        
        {/* Benefits list */}
        <div className="max-w-3xl mx-auto mt-16 bg-gray-50 p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Insight Ink?</h3>
          <ul className="space-y-4">
            {[
              "Intuitive and easy-to-use interface",
              "Powerful tagging and organization system",
              "Advanced AI features for better note management",
              "Secure and private note storage"
            ].map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

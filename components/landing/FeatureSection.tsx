'use client';

import { 
  DocumentTextIcon, 
  TagIcon, 
  MagnifyingGlassIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

// Feature card component
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  iconClassName
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  iconClassName: string;
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${iconClassName}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default function FeatureSection() {
  const features = [
    {
      icon: DocumentTextIcon,
      title: "AI-Powered Organization",
      description: "Smart categorization and tagging suggestions powered by advanced AI algorithms.",
      iconClassName: "bg-blue-600"
    },
    {
      icon: TagIcon,
      title: "Powerful Tagging",
      description: "Organize your notes with a flexible tagging system to find information quickly.",
      iconClassName: "bg-green-600"
    },
    {
      icon: MagnifyingGlassIcon,
      title: "Semantic Search",
      description: "Find notes based on meaning, not just keywords, using semantic search technology.",
      iconClassName: "bg-purple-600"
    },
    {
      icon: ClockIcon,
      title: "Version History",
      description: "Never lose your work with automatic version tracking for all your notes.",
      iconClassName: "bg-red-600"
    }
  ];

  return (
    <section className="py-16 bg-gray-50" id="features-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Powerful Features</h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Everything you need to capture, organize, and retrieve your ideas effectively.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description}
              iconClassName={feature.iconClassName}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

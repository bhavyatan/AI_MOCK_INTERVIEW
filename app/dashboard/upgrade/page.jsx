import React from 'react';
import planData from '@/utils/planData';

export default function UpgradePage() {
  // Assuming planData is an array and has at least two plans
  const plan1 = planData[0]; // First plan
  const plan2 = planData[1]; // Second plan

  return (
    <div className="flex flex-col items-center py-8  min-h-screen">
      {/* Title and Subtitle */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Upgrade</h1>
      <p className="text-lg text-gray-600 mb-8">
        Upgrade to a yearly plan to access unlimited mock interviews
      </p>

      {/* Two Grid Layout */}
      <div className="flex justify-between gap-6">
        {/* First Grid */}
        <div className="w-1/2">
          <div
            className="bg-white shadow-md rounded-lg p-6 border-2 border-transparent hover:border-black transform hover:scale-105 transition-all"
          >
            {/* Plan 1 Content */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{plan1.name}</h2>
            <p className="text-xl font-bold text-purple-500 mb-4">
              ${plan1.cost} {plan1.cost === 0 ? '/ Free' : '/ Yearly'}
            </p>

            <ul className="space-y-2 text-gray-600">
              {plan1.offerings.map((offering, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span>{offering.value}</span>
                </li>
              ))}
            </ul>

            <a
              href={plan1.paymentLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-6 bg-purple-500 text-white font-semibold text-center py-2 px-4 rounded hover:bg-black transition"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Second Grid */}
        <div className="w-1/2">
          <div
            className="bg-white shadow-md rounded-lg p-6 border-2 border-transparent hover:border-black transform hover:scale-105 transition-all"
          >
            {/* Plan 2 Content */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{plan2.name}</h2>
            <p className="text-xl font-bold text-purple-500 mb-4">
              ${plan2.cost} {plan2.cost === 0 ? '/ Free' : '/ Yearly'}
            </p>

            <ul className="space-y-2 text-gray-600">
              {plan2.offerings.map((offering, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span>{offering.value}</span>
                </li>
              ))}
            </ul>

            <a
              href={plan2.paymentLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-6 bg-purple-500 text-white font-semibold text-center py-2 px-4 rounded hover:bg-black transition"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { HOW_TO_BUY_STEPS } from '../_constants/howToBuy';

export default function Steps() {
  return (
    <div className="space-y-6">
      {HOW_TO_BUY_STEPS.map((step, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <step.icon className="h-5 w-5 text-orange-500" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              {step.number}. {step.title}
            </h3>
            <p className="text-gray-500 text-sm mt-1">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
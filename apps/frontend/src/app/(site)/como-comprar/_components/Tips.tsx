'use client';

import { FiInfo } from 'react-icons/fi';
import { TIPS } from '../_constants/howToBuy';

export default function Tips() {
  return (
    <div className="space-y-4">
      {TIPS.map((tip, index) => (
        <div key={index} className="flex gap-3 p-3 bg-blue-50 rounded-lg">
          <FiInfo className="h-5 w-5 text-blue-500 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-800 text-sm">{tip.title}</h4>
            <p className="text-gray-500 text-xs mt-1">{tip.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
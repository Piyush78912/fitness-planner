import React, { useEffect } from 'react';

const NutritionGuide = () => {
  // Add useEffect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Nutrition Guide</h1>
          <p className="text-blue-100">Fuel your body for optimal performance and wellness</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Balanced Nutrition for Fitness</h2>
          <p className="mb-4 text-gray-700">
            Proper nutrition is the foundation of any successful fitness journey. This guide 
            will help you understand what to eat, when to eat, and how to structure your diet 
            to achieve your specific fitness goals.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
            <p className="text-blue-700">
              Remember: Nutrition needs are highly individual and may vary based on your age, 
              gender, activity level, and specific health conditions.
            </p>
          </div>
        </section>

        {/* Macronutrients Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-blue-800">Understanding Macronutrients</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Protein Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-red-500 text-white p-4">
                <h3 className="text-xl font-bold">Protein</h3>
              </div>
              <div className="p-6">
                <p className="mb-4">Essential for muscle repair and growth.</p>
                <h4 className="font-semibold mb-2">Good sources:</h4>
                <ul className="list-disc pl-5 mb-4 text-gray-700">
                  <li>Chicken and turkey</li>
                  <li>Fish and seafood</li>
                  <li>Eggs</li>
                  <li>Greek yogurt</li>
                  <li>Tofu and tempeh</li>
                  <li>Legumes and beans</li>
                </ul>
                <p className="text-sm text-gray-600">
                  Recommended: 0.8-2.0g per kg of body weight daily, depending on activity level
                </p>
              </div>
            </div>

            {/* Carbs Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-yellow-500 text-white p-4">
                <h3 className="text-xl font-bold">Carbohydrates</h3>
              </div>
              <div className="p-6">
                <p className="mb-4">Primary energy source for high-intensity exercise.</p>
                <h4 className="font-semibold mb-2">Good sources:</h4>
                <ul className="list-disc pl-5 mb-4 text-gray-700">
                  <li>Whole grains</li>
                  <li>Fruits</li>
                  <li>Vegetables</li>
                  <li>Legumes</li>
                  <li>Potatoes and sweet potatoes</li>
                </ul>
                <p className="text-sm text-gray-600">
                  Recommended: 3-5g per kg of body weight daily for active individuals
                </p>
              </div>
            </div>

            {/* Fats Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-green-500 text-white p-4">
                <h3 className="text-xl font-bold">Healthy Fats</h3>
              </div>
              <div className="p-6">
                <p className="mb-4">Important for hormones and long-lasting energy.</p>
                <h4 className="font-semibold mb-2">Good sources:</h4>
                <ul className="list-disc pl-5 mb-4 text-gray-700">
                  <li>Avocados</li>
                  <li>Nuts and seeds</li>
                  <li>Olive oil</li>
                  <li>Fatty fish</li>
                  <li>Nut butters</li>
                </ul>
                <p className="text-sm text-gray-600">
                  Recommended: 0.5-1g per kg of body weight daily
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meal Timing Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-blue-800">Meal Timing and Planning</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-blue-700">Pre-Workout Nutrition</h3>
                <p className="mb-2">Eat 1-3 hours before training:</p>
                <ul className="list-disc pl-5 mb-4 text-gray-700">
                  <li>Moderate protein and carbs</li>
                  <li>Low in fat and fiber</li>
                  <li>Example: Banana and yogurt, or toast with egg</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-blue-700">Post-Workout Nutrition</h3>
                <p className="mb-2">Eat within 30-60 minutes after training:</p>
                <ul className="list-disc pl-5 mb-4 text-gray-700">
                  <li>Protein for muscle repair</li>
                  <li>Carbs to replenish glycogen</li>
                  <li>Example: Protein shake with fruit, or chicken with rice</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Hydration Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-blue-800">Hydration</h2>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="mb-4">
              Proper hydration is crucial for performance and recovery. Even mild dehydration can significantly impact your workout quality.
            </p>
            <div className="bg-white p-4 rounded shadow-sm mb-4">
              <h3 className="text-lg font-semibold mb-2 text-blue-700">Daily Guidelines:</h3>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Minimum 8 cups (64 oz) of water daily</li>
                <li>Additional 16-24 oz for every hour of exercise</li>
                <li>Monitor urine color - aim for pale yellow</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center py-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg">
            Get Personalized Nutrition Plan
          </button>
          <p className="mt-4 text-gray-600">
            Need more specific guidance? Our nutrition experts can create a custom plan for your unique needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NutritionGuide;
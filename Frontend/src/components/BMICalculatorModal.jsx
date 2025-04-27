import React, { useState, useRef, useEffect } from 'react';

const BMICalculatorModal = ({ isOpen, onClose }) => {
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [bmiMessage, setBMIMessage] = useState('');
  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');
  
  const modalRef = useRef(null);

  // Handle clicks outside the modal
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Validate height input
  const validateHeight = (value) => {
    if (parseFloat(value) < 0) {
      setHeightError('Height must be a positive value');
      return false;
    }
    setHeightError('');
    return true;
  };

  // Validate weight input
  const validateWeight = (value) => {
    if (parseFloat(value) < 0) {
      setWeightError('Weight must be a positive value');
      return false;
    }
    setWeightError('');
    return true;
  };

  // Update height with validation
  const handleHeightChange = (e) => {
    const value = e.target.value;
    setHeight(value);
    if (value) validateHeight(value);
  };

  // Update weight with validation
  const handleWeightChange = (e) => {
    const value = e.target.value;
    setWeight(value);
    if (value) validateWeight(value);
  };

  const handleCalculate = async () => {
    // Reset error messages
    setHeightError('');
    setWeightError('');

    // Validate inputs before calculation
    const heightIsValid = validateHeight(height);
    const weightIsValid = validateWeight(weight);

    if (!heightIsValid || !weightIsValid) {
      return;
    }

    let heightInMeters;
    if (heightUnit === 'cm') {
      heightInMeters = parseFloat(height) / 100;
    } else {
      heightInMeters = parseFloat(height) * 0.3048;
    }

    const weightInKg = parseFloat(weight);

    if (heightInMeters > 0 && weightInKg > 0) {
      const calculatedBMI = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
      setBMI(calculatedBMI);

      let message = "";
      if (calculatedBMI < 18.5) {
        message = "Underweight: You are at risk. Please consult a health expert.";
      } else if (calculatedBMI < 25) {
        message = "Normal: Your BMI is in a healthy range.";
      } else if (calculatedBMI < 30) {
        message = "Overweight: Slight risk. Consider regular exercise.";
      } else {
        message = "Obesity: You are in danger zone. Immediate action is advised.";
      }

      setBMIMessage(message);

      // Send to backend
      try {
        const res = await fetch("http://localhost:5000/api/bmi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            height,
            heightUnit,
            weight,
            bmi: calculatedBMI,
          }),
        });

        const result = await res.json();
        console.log("BMI saved:", result);
      } catch (error) {
        console.error("Failed to send BMI:", error);
      }
    }
  };

  const handleClose = () => {
    setBMI(null);
    setBMIMessage('');
    setHeightError('');
    setWeightError('');
    setHeight('');
    setWeight('');
    onClose();
  };

  const getBMIRangeColor = (bmiValue) => {
    const bmiNum = parseFloat(bmiValue);
    if (bmiNum < 18.5) return "text-blue-700";
    if (bmiNum < 25) return "text-green-700";
    if (bmiNum < 30) return "text-yellow-700";
    return "text-red-700";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg p-6 w-96 max-w-[90%]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">BMI Calculator</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {bmiMessage && (
          <div className={`mb-4 p-3 rounded-md text-sm font-medium ${
            bmiMessage.includes("danger") || bmiMessage.includes("obesity")
              ? "bg-red-100 text-red-700"
              : bmiMessage.includes("Underweight")
                ? "bg-blue-100 text-blue-700"
                : bmiMessage.includes("Overweight")
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
          }`}>
            {bmiMessage}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
            Height
          </label>
          <div className="flex space-x-2">
            <div className="w-full">
              <input
                type="number"
                id="height"
                value={height}
                onChange={handleHeightChange}
                className={`block w-full rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border ${
                  heightError ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter height"
              />
              {heightError && (
                <p className="mt-1 text-sm text-red-600">{heightError}</p>
              )}
            </div>
            <select
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
            >
              <option value="cm">cm</option>
              <option value="ft">ft</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={handleWeightChange}
            className={`block w-full rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border ${
              weightError ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter weight"
          />
          {weightError && (
            <p className="mt-1 text-sm text-red-600">{weightError}</p>
          )}
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-red-500 text-white rounded-md py-2 px-4 hover:bg-red-600 transition"
          disabled={!height || !weight || heightError || weightError}
        >
          Calculate BMI
        </button>

        {bmi && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="font-medium">Your BMI: <span className={getBMIRangeColor(bmi)}>{bmi}</span></p>
            <div className="mt-3 text-sm">
              <h3 className="font-medium mb-1">BMI Ranges:</h3>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                <div className="text-blue-700">Underweight:</div>
                <div>Below 18.5</div>
                
                <div className="text-green-700">Normal weight:</div>
                <div>18.5–24.9</div>
                
                <div className="text-yellow-700">Overweight:</div>
                <div>25–29.9</div>
                
                <div className="text-red-700">Obesity:</div>
                <div>30 or higher</div>
              </div>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-500 mt-4">
          Note: BMI is a screening tool but not a diagnostic of body fatness or health.
        </p>
      </div>
    </div>
  );
};

export default BMICalculatorModal;
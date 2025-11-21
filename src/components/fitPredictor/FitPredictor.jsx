import { useState, useEffect } from 'react';
import { FaRuler, FaWeight, FaTshirt, FaArrowRight } from 'react-icons/fa';

const FitPredictor = ({ product }) => {
    // State for user inputs
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bodyType, setBodyType] = useState('average'); // average, athletic, plus-size
    const [fitPreference, setFitPreference] = useState('regular'); // loose, regular, tight
    const [comfortLevel, setComfortLevel] = useState('balanced'); // comfort-focused, balanced, fit-focused
    
    // State for results
    const [recommendedSize, setRecommendedSize] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [sizeExplanation, setSizeExplanation] = useState('');
    
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (height && weight) {
            calculateSize();
            setShowResults(true);
        }
    };
    
    // Reset form
    const resetForm = () => {
        setHeight('');
        setWeight('');
        setBodyType('average');
        setFitPreference('regular');
        setComfortLevel('balanced');
        setShowResults(false);
        setRecommendedSize('');
        setSizeExplanation('');
    };
    
    // Size calculation algorithm
    const calculateSize = () => {
        // Convert inputs to numbers
        const heightNum = parseFloat(height);
        const weightNum = parseFloat(weight);
        
        if (isNaN(heightNum) || isNaN(weightNum)) {
            setRecommendedSize('');
            setSizeExplanation('Please enter valid height and weight values.');
            return;
        }
        
        // Calculate BMI as a basic metric
        const bmi = weightNum / ((heightNum / 100) * (heightNum / 100));
        
        // Base size determination from BMI
        let baseSize = '';
        if (bmi < 18.5) {
            baseSize = 'XS';
        } else if (bmi < 22) {
            baseSize = 'S';
        } else if (bmi < 25) {
            baseSize = 'M';
        } else if (bmi < 30) {
            baseSize = 'L';
        } else if (bmi < 35) {
            baseSize = 'XL';
        } else {
            baseSize = 'XXL';
        }
        
        // Adjust for body type
        let adjustedSize = baseSize;
        let explanationParts = [`Based on your height (${heightNum} cm) and weight (${weightNum} kg), we calculated a base size of ${baseSize}.`];
        
        if (bodyType === 'athletic') {
            // Athletic builds might need larger sizes for shoulders/chest but smaller for waist
            if (baseSize === 'S') {
                adjustedSize = 'M';
                explanationParts.push('For athletic body types, we recommend sizing up to accommodate broader shoulders and chest.');
            } else if (baseSize === 'M') {
                adjustedSize = 'L';
                explanationParts.push('For athletic body types, we recommend sizing up to accommodate broader shoulders and chest.');
            } else {
                explanationParts.push('Your athletic body type was considered in this recommendation.');
            }
        } else if (bodyType === 'plus-size') {
            // Plus size might need more room in certain areas
            if (baseSize === 'M') {
                adjustedSize = 'L';
                explanationParts.push('For plus-size body types, we recommend sizing up for additional comfort.');
            } else if (baseSize === 'L') {
                adjustedSize = 'XL';
                explanationParts.push('For plus-size body types, we recommend sizing up for additional comfort.');
            } else {
                explanationParts.push('Your plus-size body type was considered in this recommendation.');
            }
        } else {
            explanationParts.push('Your average body type was considered in this recommendation.');
        }
        
        // Store original size after body type adjustment for comparison
        const sizeAfterBodyType = adjustedSize;
        
        // Adjust for fit preference
        if (fitPreference === 'loose') {
            // Size up for loose fit
            if (adjustedSize === 'XS') adjustedSize = 'S';
            else if (adjustedSize === 'S') adjustedSize = 'M';
            else if (adjustedSize === 'M') adjustedSize = 'L';
            else if (adjustedSize === 'L') adjustedSize = 'XL';
            else if (adjustedSize === 'XL') adjustedSize = 'XXL';
            
            if (adjustedSize !== sizeAfterBodyType) {
                explanationParts.push(`We sized up to ${adjustedSize} for your preferred loose fit.`);
            }
        } else if (fitPreference === 'tight') {
            // Size down for tight fit
            if (adjustedSize === 'S') adjustedSize = 'XS';
            else if (adjustedSize === 'M') adjustedSize = 'S';
            else if (adjustedSize === 'L') adjustedSize = 'M';
            else if (adjustedSize === 'XL') adjustedSize = 'L';
            else if (adjustedSize === 'XXL') adjustedSize = 'XL';
            
            if (adjustedSize !== sizeAfterBodyType) {
                explanationParts.push(`We sized down to ${adjustedSize} for your preferred tight fit.`);
            }
        } else {
            explanationParts.push(`We maintained a ${adjustedSize} for your preferred regular fit.`);
        }
        
        // Store size after fit preference adjustment
        const sizeAfterFitPref = adjustedSize;
        
        // Adjust for comfort preference
        if (comfortLevel === 'comfort-focused') {
            // Size up for comfort
            if (adjustedSize === 'XS') adjustedSize = 'S';
            else if (adjustedSize === 'S') adjustedSize = 'M';
            else if (adjustedSize === 'M') adjustedSize = 'L';
            else if (adjustedSize === 'L') adjustedSize = 'XL';
            else if (adjustedSize === 'XL') adjustedSize = 'XXL';
            
            if (adjustedSize !== sizeAfterFitPref) {
                explanationParts.push(`We sized up to ${adjustedSize} for your comfort-focused preference.`);
            }
        } else if (comfortLevel === 'fit-focused') {
            // Keep size as is or slightly tighter
            if (adjustedSize === 'S') adjustedSize = 'XS';
            else if (adjustedSize === 'M') adjustedSize = 'S';
            else if (adjustedSize === 'L') adjustedSize = 'M';
            else if (adjustedSize === 'XL') adjustedSize = 'L';
            else if (adjustedSize === 'XXL') adjustedSize = 'XL';
            
            if (adjustedSize !== sizeAfterFitPref) {
                explanationParts.push(`We sized down to ${adjustedSize} for your fit-focused preference.`);
            }
        } else {
            explanationParts.push('Your balanced comfort preference was considered in this recommendation.');
        }
        
        // Product-specific adjustments if product data is available
        if (product && product.title) {
            // Check if product title contains keywords that might affect sizing
            const productTitle = product.title.toLowerCase();
            if (productTitle.includes('slim fit') || productTitle.includes('skinny')) {
                explanationParts.push(`Note: This item is labeled as "${productTitle.includes('slim fit') ? 'Slim Fit' : 'Skinny'}". Consider sizing up if you prefer a looser fit.`);
            } else if (productTitle.includes('oversized') || productTitle.includes('relaxed fit')) {
                explanationParts.push(`Note: This item is labeled as "${productTitle.includes('oversized') ? 'Oversized' : 'Relaxed Fit'}". Consider sizing down if you prefer a more fitted look.`);
            }
        }
        
        setRecommendedSize(adjustedSize);
        setSizeExplanation(explanationParts.join(' '));
        setShowResults(true);
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
                <FaTshirt className="mr-2" /> Size Fit Predictor
            </h2>
            
            {!showResults ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Height Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Height (cm)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaRuler className="text-gray-400" />
                                </div>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    placeholder="175"
                                    required
                                />
                            </div>
                        </div>
                        
                        {/* Weight Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Weight (kg)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaWeight className="text-gray-400" />
                                </div>
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    placeholder="70"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Body Type Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Body Type
                            </label>
                            <select
                                value={bodyType}
                                onChange={(e) => setBodyType(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            >
                                <option value="average">Average</option>
                                <option value="athletic">Athletic</option>
                                <option value="plus-size">Plus Size</option>
                            </select>
                        </div>
                        
                        {/* Fit Preference */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Fit Preference
                            </label>
                            <select
                                value={fitPreference}
                                onChange={(e) => setFitPreference(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            >
                                <option value="regular">Regular Fit</option>
                                <option value="loose">Loose Fit</option>
                                <option value="tight">Tight Fit</option>
                            </select>
                        </div>
                        
                        {/* Comfort Level */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Comfort Priority
                            </label>
                            <select
                                value={comfortLevel}
                                onChange={(e) => setComfortLevel(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            >
                                <option value="balanced">Balanced</option>
                                <option value="comfort-focused">Comfort Focused</option>
                                <option value="fit-focused">Fit Focused</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
                        >
                            Find My Size
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                        <div className="flex flex-col items-center mb-4">
                            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                                {recommendedSize}
                            </div>
                            <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                Recommended Size
                            </div>
                        </div>
                        
                        <div className="text-gray-600 dark:text-gray-400 text-center mb-6">
                            {sizeExplanation}
                        </div>
                        
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={resetForm}
                                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
                            >
                                Try Again
                            </button>
                            {product && (
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 flex items-center"
                                >
                                    <span>Back to Product</span>
                                    <FaArrowRight className="ml-2" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FitPredictor;
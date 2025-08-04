import React, { useState } from 'react';
import { YARN_FABRIC_CONSTANTS } from '../utils/constants'; // Import constants

const YarnCount = () => {
    const [fabricType, setFabricType] = useState('');
    const [gsm, setGsm] = useState('');
    const [yarnCountResult, setYarnCountResult] = useState('Select fabric type and enter GSM');
    const [resultColor, setResultColor] = useState('text-blue-600');

    const calculateYarnCount = () => {
        const selectedGsm = parseFloat(gsm);

        if (!fabricType) {
            setYarnCountResult("Please select a fabric type.");
            setResultColor("text-yellow-600");
            return;
        }

        if (isNaN(selectedGsm) || selectedGsm <= 0) {
            setYarnCountResult("Please enter a valid GSM (e.g., 180).");
            setResultColor("text-yellow-600");
            return;
        }

        const constant = YARN_FABRIC_CONSTANTS[fabricType];
        if (constant === undefined) {
            setYarnCountResult("Calculation constant not defined for this fabric type.");
            setResultColor("text-red-600");
            return;
        }

        // Adjust GSM for Lycra fabrics (not rib) as per your original logic
        // Note: The original script had a specific logic for `selectedValue - 50` related to Lycra.
        // I've incorporated that here. If this is incorrect for all Lycra types, please specify.
        const adjustedGsm = fabricType.includes("lycra") && !fabricType.includes("rib") ? selectedGsm - 50 : selectedGsm;

        if (adjustedGsm <= 0) {
            setYarnCountResult("Invalid GSM for selected fabric type (adjusted GSM is zero or negative).");
            setResultColor("text-red-600");
            return;
        }

        const result = (constant / adjustedGsm).toFixed(2);
        setYarnCountResult(`Yarn Count: ${result} 'S`);
        setResultColor("text-blue-600");
    };

    return (
       <section className="py-5 bg-gradient-to-r from-green-400 to-green-700 text-white min-h-screen font-serif">
          <div className="container mx-auto max-w-4xl">
                <main className="bg-white bg-opacity-95 text-gray-800 rounded-2xl shadow-2xl p-8 md:p-10 mt-16">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Yarn Count Converter by GSM</h1>
            <p className="text-center text-gray-600 text-lg mb-8">Use the tool below to get yarn count for various fabric types based on GSM. Ideal for textile engineers and merchandisers.</p>

            <div className="bg-blue-100 text-blue-800 p-4 rounded-md text-center text-lg mb-8">
                Yarn count is always an even number. Adjust the result by ±1 to maintain evenness.
            </div>

            <div className="card shadow-md">
                <div className="card-body p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="fabric-type" className="block text-sm font-medium text-gray-700">Fabric Type</label>
                            <select
                                id="fabric-type"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                value={fabricType}
                                onChange={(e) => setFabricType(e.target.value)}
                            >
                                <option value="">Select fabric type</option>
                                <option value="fleece">Fleece</option>
                                <option value="sj">Single Jersey</option>
                                <option value="terry">Terry</option>
                                <option value="interlock">Interlock</option>
                                <option value="pique">Pique</option>
                                <option value="lacost">Lacost</option>
                                <option value="lycra-fleece">Lycra Fleece</option>
                                <option value="lycra-sj">Lycra Single Jersey</option>
                                <option value="lycra-terry">Lycra Terry</option>
                                <option value="lycra-interlock">Lycra Interlock</option>
                                <option value="lycra-pique">Lycra Pique</option>
                                <option value="lycra-lacost">Lycra Lacost</option>
                                <option value="rib-1x1">1x1 Rib Cotton</option>
                                <option value="rib-2x1">2x1 Rib Cotton</option>
                                <option value="lycra-rib-1x1">1x1 Rib Lycra</option>
                                <option value="lycra-rib-2x1">2x1 Rib Lycra</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="yarn-gsm" className="block text-sm font-medium text-gray-700">GSM</label>
                            <input
                                id="yarn-gsm"
                                type="number"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                placeholder="as like 180"
                                value={gsm}
                                onChange={(e) => setGsm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-md mt-6">
                        <label className="block text-sm font-semibold text-gray-700">Yarn Count:</label>
                        <div id="yarn-count-result" className={`text-2xl font-bold ${resultColor}`}>
                            {yarnCountResult}
                        </div>
                    </div>

                    <button
                        id="calculate-yarn-count-btn"
                        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                        onClick={calculateYarnCount}
                    >
                        Calculate Yarn Count
                    </button>
                </div>
            </div>
           </main>
            </div>
        </section>
    );
};

export default YarnCount;

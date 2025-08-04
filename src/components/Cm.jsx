import React, { useState } from 'react';

const Cm = () => {
    // State for Basic CM Calculator
    const [quantityOfMachines, setQuantityOfMachines] = useState('');
    const [productionQuantity, setProductionQuantity] = useState('');
    const [costPerMachine, setCostPerMachine] = useState('');
    const [output6, setOutput6] = useState('');
    const [output6Color, setOutput6Color] = useState('text-gray-800');
    const [basicCmErrorMessage, setBasicCmErrorMessage] = useState('');

    // State for Advanced CM Calculator
    const [A, setA] = useState('');
    const [B, setB] = useState('');
    const [C, setC] = useState('');
    const [D, setD] = useState('');
    const [E, setE] = useState('');
    const [F, setF] = useState('');
    const [output15, setOutput15] = useState('');
    const [output15Color, setOutput15Color] = useState('text-gray-800');
    const [advancedCmErrorMessage, setAdvancedCmErrorMessage] = useState('');

    // Helper to get number from input, defaulting to 0 if invalid
    const getNumber = (value) => {
        const val = parseFloat(value);
        return isNaN(val) ? 0 : val;
    };

    // Basic CM Calculator logic
    const calculate6 = () => {
        setBasicCmErrorMessage('');
        const qm = getNumber(quantityOfMachines);
        const pq = getNumber(productionQuantity);
        const cpm = getNumber(costPerMachine);

        if (qm <= 0 || pq <= 0 || cpm <= 0) {
            setBasicCmErrorMessage("Please enter valid positive numbers for all fields.");
            setOutput6Color("text-red-600");
            setOutput6(''); // Clear previous result on error
            return;
        }

        const result = (((qm * cpm) / pq) * 12);
        setOutput6(`$${result.toFixed(2)}`);
        setOutput6Color("text-green-600");
    };

    const clearInputs6 = () => {
        setQuantityOfMachines('');
        setProductionQuantity('');
        setCostPerMachine('');
        setOutput6('');
        setOutput6Color('text-gray-800');
        setBasicCmErrorMessage('');
    };

    // Advanced CM Calculator logic
    const calculate15 = () => {
        setAdvancedCmErrorMessage('');
        const valA = getNumber(A);
        const valB = getNumber(B);
        const valC = getNumber(C);
        const valD = getNumber(D);
        const valE = getNumber(E);
        const valF = getNumber(F);

        if (valA <= 0 || valB <= 0 || valC <= 0 || valD <= 0 || valE <= 0 || valF <= 0) {
            setAdvancedCmErrorMessage("Please enter valid positive numbers for all fields.");
            setOutput15Color("text-red-600");
            setOutput15(''); // Clear previous result on error
            return;
        }

        // Ensure no division by zero
        if (valE === 0 || valB === 0 || valD === 0 || valF === 0) {
            setAdvancedCmErrorMessage("Cannot divide by zero. Check B, D, E, F values.");
            setOutput15Color("text-red-600");
            setOutput15(''); // Clear previous result on error
            return;
        }

        const result = (((valA / valE) / valB) * valC) / (valD * valF) * 12;
        setOutput15(`$${result.toFixed(2)}`);
        setOutput15Color("text-green-600");
    };

    const clearInputs15 = () => {
        setA('');
        setB('');
        setC('');
        setD('');
        setE('');
        setF('');
        setOutput15('');
        setOutput15Color('text-gray-800');
        setAdvancedCmErrorMessage('');
    };

    // Save result function (can be shared or specific)
    const saveResult = (resultText, fileNamePrefix = "cm_result") => {
        const fileName = prompt("Enter file name:", `${fileNamePrefix}.txt`);
        if (fileName) {
            const blob = new Blob([resultText], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <section className="py-5 bg-gradient-to-r from-green-400 to-green-700 text-white min-h-screen font-serif">
            <div className="container mx-auto max-w-4xl">
                <main className="bg-white bg-opacity-95 text-gray-800 rounded-2xl shadow-2xl p-8 md:p-10 mt-16">
                    {/* Section Title */}
                    <header className="text-center my-4">
                        <h2 className="font-bold text-blue-600 border-b-4 border-blue-400 py-2 hidden lg:block text-3xl">
                            Effective Method to Calculate Garment Cost of Making (CM)
                        </h2>
                        <h4 className="font-bold text-blue-600 border-b-4 border-blue-400 py-2 lg:hidden text-2xl">
                            Simple Garment CM Calculation
                        </h4>
                    </header>

                    {/* First CM Calculator Block */}
                    <div className="bg-white shadow-lg p-6 rounded-lg mb-8">
                        <h5 className="text-center text-blue-600 mb-4 text-xl font-semibold">Quick CM Estimate (Basic)</h5>

                        <div className="grid grid-cols-3 gap-3"> {/* Changed from col-4 col-md-4 to grid-cols-3 */}
                            <div>
                                <label htmlFor="quantityOfMachines" className="block text-center text-sm font-medium text-gray-700 text-xs sm:text-sm">Total Number of Machines</label>
                                <input type="number" id="quantityOfMachines" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5 text-xs sm:text-sm" placeholder="machine QTY " value={quantityOfMachines} onChange={(e) => setQuantityOfMachines(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="productionQuantity" className="block text-center text-sm font-medium text-gray-700 text-xs sm:text-sm">Production Quantity (Per 10 Hours)</label>
                                <input type="number" id="productionQuantity" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5 text-xs sm:text-sm" placeholder="production QTY " value={productionQuantity} onChange={(e) => setProductionQuantity(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="costPerMachine" className="block text-center text-sm font-medium text-gray-700 text-xs sm:text-sm">Cost per Machine ($)</label>
                                <input type="number" id="costPerMachine" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5 text-xs sm:text-sm" placeholder="machine cost " value={costPerMachine} onChange={(e) => setCostPerMachine(e.target.value)} />
                            </div>
                        </div>

                        {basicCmErrorMessage && (
                            <p className="text-center text-red-600 text-sm mt-4">{basicCmErrorMessage}</p>
                        )}

                        <div className="grid grid-cols-2 gap-3 items-center mt-4"> {/* Changed to grid-cols-2 */}
                            <div className="text-center md:text-right">
                                <h6 className="text-blue-600 text-base font-semibold text-sm sm:text-base mb-0">Estimated CM per Dozen</h6>
                            </div>
                            <div>
                                <div id="output6" className={`bg-gray-100 text-gray-800 text-center p-2 rounded-md font-bold text-lg text-base sm:text-lg ${output6Color}`}>
                                    {output6}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-4"> {/* Changed to grid-cols-3 */}
                            <button className="px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-sm" onClick={calculate6}>Calculate</button>
                            <button className="px-4 py-2 rounded-md font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 text-sm" onClick={() => saveResult(output6, 'basic_cm_result')}>Save</button>
                            <button className="px-4 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-300 text-sm" onClick={clearInputs6}>Clear</button>
                        </div>
                    </div>

                    {/* Informational Note */}
                    <div className="bg-blue-100 text-blue-800 p-4 rounded-md shadow-lg hidden lg:block">
                        <p className="mb-0 text-base">
                            <strong>Note:</strong> This is a basic APP. Actual CM can vary based on rent, utility costs, machine depreciation, worker, and other overheads. Let’s explore a more detailed breakdown below.
                        </p>
                    </div>

                    {/* Second CM Calculator (Detailed Method) */}
                    <div className="bg-white shadow-lg p-6 rounded-lg mt-8">
                        <h5 className="text-center text-blue-600 mb-4 text-xl font-semibold">Advanced CM Estimation (Detailed)</h5>

                        <div className="grid grid-cols-3 gap-3"> {/* Changed to grid-cols-3 */}
                            <div>
                                <label htmlFor="A" className="block text-center text-sm font-medium text-gray-700 text-xs sm:text-sm">Monthly Expenses ($)</label>
                                <input type="number" id="A" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5 text-xs sm:text-sm" placeholder="monthly cost" value={A} onChange={(e) => setA(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="B" className="block text-center text-sm font-medium text-gray-700 text-xs sm:text-sm">Total Machines in Production</label>
                                <input type="number" id="B" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5 text-xs sm:text-sm" placeholder="total machines QTY" value={B} onChange={(e) => setB(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="C" className="block text-center text-sm font-medium text-gray-700 text-xs sm:text-sm">Machines per Layout</label>
                                <input type="number" id="C" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5 text-xs sm:text-sm" placeholder="layout machines QTY" value={C} onChange={(e) => setC(e.target.value)} />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mt-4"> {/* Changed to grid-cols-3 */}
                            <div>
                                <label htmlFor="D" className="block text-center text-sm font-medium text-gray-700 text-xs sm:text-sm">Hourly Production Target</label>
                                <input type="number" id="D" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5 text-xs sm:text-sm" placeholder="production QTY" value={D} onChange={(e) => setD(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="E" className="block text-center text-sm font-medium text-gray-700 text-xs sm:text-sm">Working Days (Monthly)</label>
                                <input type="number" id="E" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5 text-xs sm:text-sm" placeholder="Monthly working day" value={E} onChange={(e) => setE(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="F" className="block text-center text-sm font-medium text-gray-700 text-xs sm:text-sm">Working Hours per Day</label>
                                <input type="number" id="F" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5 text-xs sm:text-sm" placeholder="working hours per day " value={F} onChange={(e) => setF(e.target.value)} />
                            </div>
                        </div>

                        {advancedCmErrorMessage && (
                            <p className="text-center text-red-600 text-sm mt-4">{advancedCmErrorMessage}</p>
                        )}

                        <div className="grid grid-cols-2 gap-3 items-center mt-4"> {/* Changed to grid-cols-2 */}
                            <div className="text-center md:text-right">
                                <h6 className="text-blue-600 text-base font-semibold text-sm sm:text-base mb-0">Estimated CM per Dozen</h6>
                            </div>
                            <div>
                                <div id="output15" className={`bg-gray-100 text-gray-800 p-2 rounded-md text-center font-bold text-lg text-base sm:text-lg ${output15Color}`}>
                                    {output15}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-4"> {/* Changed to grid-cols-3 */}
                            <button className="px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-sm" onClick={calculate15}>Calculate</button>
                            <button className="px-4 py-2 rounded-md font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 text-sm" onClick={() => saveResult(output15, 'advanced_cm_result')}>Save</button>
                            <button className="px-4 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-300 text-sm" onClick={clearInputs15}>Clear</button>
                        </div>
                    </div>
                </main>
            </div>
            {/* Removed the "Return to Home" button as navigation is handled by the main App component */}
        </section>
    );
};

export default Cm;

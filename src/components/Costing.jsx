import React, { useState } from 'react';
import html2pdf from 'html2pdf.js'; // Import html2pdf.js

const Costing = () => {
    // State for input fields
    const [stylePoName, setStylePoName] = useState('');
    const [itemName, setItemName] = useState('');
    const [orderQty, setOrderQty] = useState('');
    const [consumption, setConsumption] = useState('');
    const [spandex, setSpandex] = useState('');
    const [yarnPrice, setYarnPrice] = useState('');
    const [spandexPrice, setSpandexPrice] = useState('');
    const [knittingPrice, setKnittingPrice] = useState('');
    const [dyeingPrice, setDyeingPrice] = useState('');
    const [alloverPrintPrice, setAlloverPrintPrice] = useState('');
    const [chestPrintPrice, setChestPrintPrice] = useState('');
    const [accessoriesPrice, setAccessoriesPrice] = useState('');
    const [costOfMaking, setCostOfMaking] = useState('');
    const [commercialCharges, setCommercialCharges] = useState('');
    const [handlingCharge, setHandlingCharge] = useState('');

    // State for output and error messages
    const [output, setOutput] = useState('Estimated Price per Piece:');
    const [outputColor, setOutputColor] = useState('text-gray-800');
    const [errorMessage, setErrorMessage] = useState('');

    // State to store the last calculated result for PDF generation
    const [lastCalculatedResult, setLastCalculatedResult] = useState(null);

    // Helper function to parse float values, defaulting to 0 if NaN
    const getNumber = (value) => {
        const val = parseFloat(value);
        return isNaN(val) ? 0 : val;
    };

    // Function to calculate the apparel costing
    const calculateCosting = () => {
        setErrorMessage(''); // Clear previous errors

        // Validate required text fields
        if (!stylePoName.trim() || !itemName.trim() || !orderQty.trim()) {
            setErrorMessage("Please enter PO Name, Item Name, and Order QTY.");
            setOutputColor("text-red-600");
            return;
        }

        // Parse all numerical inputs
        const cons = getNumber(consumption);
        const sp = getNumber(spandex);
        const yp = getNumber(yarnPrice);
        const spp = getNumber(spandexPrice);
        const kp = getNumber(knittingPrice);
        const dp = getNumber(dyeingPrice);
        const app = getNumber(alloverPrintPrice);
        const cpp = getNumber(chestPrintPrice);
        const ap = getNumber(accessoriesPrice);
        const com = getNumber(costOfMaking);
        const cc = getNumber(commercialCharges);
        const hc = getNumber(handlingCharge);

        // Basic validation for numerical inputs (must be non-negative)
        if ([cons, sp, yp, spp, kp, dp, app, cpp, ap, com, cc, hc].some(val => val < 0)) {
            setErrorMessage("Please enter valid non-negative numbers for all costing fields.");
            setOutputColor("text-red-600");
            return;
        }

        // Calculate total cost
        const total = (
            ((cons * yp) +
            (sp * spp) +
            (cons * kp) +
            (cons * dp) +
            app +
            cpp +
            ap +
            com) *
            (1 + (cc + hc) / 100)
        ) / 12;

        // Removed  from here
        const resultText = ` Estimated Price per Piece: $ ${total.toFixed(2)}`;
        setOutput(resultText);
        setOutputColor("text-green-600");

        // Store all input and result data for PDF generation
        setLastCalculatedResult({
            stylePoName,
            itemName,
            orderQty,
            consumption: cons,
            spandex: sp,
            yarnPrice: yp,
            spandexPrice: spp,
            knittingPrice: kp,
            dyeingPrice: dp,
            alloverPrintPrice: app,
            chestPrintPrice: cpp,
            accessoriesPrice: ap,
            costOfMaking: com,
            commercialCharges: cc,
            handlingCharge: hc,
            estimatedPricePerPiece: total.toFixed(2)
        });
    };

    // Function to clear all input fields and reset output
    const clearInputs = () => {
        setStylePoName('');
        setItemName('');
        setOrderQty('');
        setConsumption('');
        setSpandex('');
        setYarnPrice('');
        setSpandexPrice('');
        setKnittingPrice('');
        setDyeingPrice('');
        setAlloverPrintPrice('');
        setChestPrintPrice('');
        setAccessoriesPrice('');
        setCostOfMaking('');
        setCommercialCharges('');
        setHandlingCharge('');
        setOutput('Estimated Price per Piece:');
        setOutputColor('text-gray-800');
        setErrorMessage('');
        setLastCalculatedResult(null);
    };

    // Function to download the result as a PDF
    const downloadPDF = () => {
        if (!lastCalculatedResult) {
            setErrorMessage("❗ Please calculate first before downloading.");
            setOutputColor("text-red-600");
            return;
        }

        // Create a temporary div to render the content for PDF
        const element = document.createElement('div');
        element.innerHTML = `
            <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 15px; text-align: center;">Apparel Costing Details</h3>
            <p style="margin-bottom: 5px;"><strong>PO Name:</strong> ${lastCalculatedResult.stylePoName}</p>
            <p style="margin-bottom: 5px;"><strong>Item Name:</strong> ${lastCalculatedResult.itemName}</p>
            <p style="margin-bottom: 15px;"><strong>Order QTY:</strong> ${lastCalculatedResult.orderQty}</p>
            <hr style="border-top: 1px solid #ccc; margin: 15px 0;">
            <p style="margin-bottom: 5px;"><strong>Consumption:</strong> ${lastCalculatedResult.consumption} kg/dozen</p>
            <p style="margin-bottom: 5px;"><strong>Spandex:</strong> ${lastCalculatedResult.spandex} kg/dozen</p>
            <p style="margin-bottom: 5px;"><strong>Yarn Price:</strong> $${lastCalculatedResult.yarnPrice}/kg</p>
            <p style="margin-bottom: 5px;"><strong>Spandex Price:</strong> $${lastCalculatedResult.spandexPrice}/kg</p>
            <p style="margin-bottom: 5px;"><strong>Knitting Price:</strong> $${lastCalculatedResult.knittingPrice}/kg</p>
            <p style="margin-bottom: 5px;"><strong>Dyeing Price:</strong> $${lastCalculatedResult.dyeingPrice}/kg</p>
            <p style="margin-bottom: 5px;"><strong>Allover Print Price:</strong> $${lastCalculatedResult.alloverPrintPrice}/kg</p>
            <p style="margin-bottom: 5px;"><strong>Chest Print Price:</strong> $${lastCalculatedResult.chestPrintPrice}/dozen</p>
            <p style="margin-bottom: 5px;"><strong>Accessories Price:</strong> $${lastCalculatedResult.accessoriesPrice}/dozen</p>
            <p style="margin-bottom: 5px;"><strong>Cost Of Making:</strong> $${lastCalculatedResult.costOfMaking}/dozen</p>
            <p style="margin-bottom: 5px;"><strong>Commercial Charges:</strong> ${lastCalculatedResult.commercialCharges}%</p>
            <p style="margin-bottom: 15px;"><strong>Handling Charge:</strong> ${lastCalculatedResult.handlingCharge}%</p>
            <p style="margin-top: 15px; font-size: 18px; font-weight: bold; text-align: center;"><strong>Estimated Price per Piece:</strong> $ ${lastCalculatedResult.estimatedPricePerPiece}</p>
        `;

        const opt = {
            margin: 0.5,
            filename: `${lastCalculatedResult.stylePoName}_costing.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    };

    return (
        <section className="py-8 px-4 flex justify-center items-center min-h-screen"
            style={{
                background: 'linear-gradient(135deg, #96fbc4, #f9d423, #38f9d7)',
                fontFamily: "'Noto Serif', 'Times New Roman', Times, serif"
            }}
        >
            <div className="container max-w-4xl">
                <main className="bg-white bg-opacity-95 text-gray-800 rounded-2xl shadow-2xl p-8 md:p-10">
                    <h2 className="text-3xl font-bold text-center text-blue-600 pb-4 mb-6">Smart Apparel Costing</h2>
                    <h5 className="text-center text-gray-600 border-b-2 border-blue-300 pb-2 mb-6 text-sm md:text-base">
                        Enter 0 for non-applicable fields.
                    </h5>

                    {/* Top Info Fields */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <div>
                            <label htmlFor="stylePoName" className="block text-center text-sm font-medium text-gray-700">PO Name</label>
                            <input
                                type="text"
                                id="stylePoName"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5"
                                placeholder="Style Name"
                                value={stylePoName}
                                onChange={(e) => setStylePoName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="itemName" className="block text-center text-sm font-medium text-gray-700">Item Name</label>
                            <input
                                type="text"
                                id="itemName"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5"
                                placeholder="Item Name"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="orderQty" className="block text-center text-sm font-medium text-gray-700">Order QTY</label>
                            <input
                                type="number"
                                id="orderQty"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5"
                                placeholder="Order QTY"
                                value={orderQty}
                                onChange={(e) => setOrderQty(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Costing Input Fields */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="form-group"><label className="block text-center text-sm font-medium text-gray-700">Consumption (kg/dozen)</label><input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5" value={consumption} onChange={(e) => setConsumption(e.target.value)} /></div>
                        <div className="form-group"><label className="block text-center text-sm font-medium text-gray-700">Spandex (kg/dozen)</label><input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5" value={spandex} onChange={(e) => setSpandex(e.target.value)} /></div>
                        <div className="form-group"><label className="block text-center text-sm font-medium text-gray-700">Yarn Price ($/kg)</label><input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5" value={yarnPrice} onChange={(e) => setYarnPrice(e.target.value)} /></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="form-group"><label className="block text-center text-sm font-medium text-gray-700">Spandex Price ($/kg)</label><input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5" value={spandexPrice} onChange={(e) => setSpandexPrice(e.target.value)} /></div>
                        <div className="form-group"><label className="block text-center text-sm font-medium text-gray-700">Knitting Price ($/kg)</label><input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5" value={knittingPrice} onChange={(e) => setKnittingPrice(e.target.value)} /></div>
                        <div className="form-group"><label className="block text-center text-sm font-medium text-gray-700">Dyeing Price ($/kg)</label><input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5" value={dyeingPrice} onChange={(e) => setDyeingPrice(e.target.value)} /></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="form-group"><label className="block text-center text-sm font-medium text-gray-700">Allover Print Price ($/kg)</label><input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5" value={alloverPrintPrice} onChange={(e) => setAlloverPrintPrice(e.target.value)} /></div>
                        <div className="form-group"><label className="block text-center text-sm font-medium text-gray-700">Chest Print Price ($/dozen)</label><input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5" value={chestPrintPrice} onChange={(e) => setChestPrintPrice(e.target.value)} /></div>
                        <div className="form-group"><label className="block text-center text-sm font-medium text-gray-700">Accessories Price ($/dozen)</label><input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5" value={accessoriesPrice} onChange={(e) => setAccessoriesPrice(e.target.value)} /></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="form-group"><label className="block text-center text-sm font-medium text-gray-700">Cost Of Making ($/dozen)</label><input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5" value={costOfMaking} onChange={(e) => setCostOfMaking(e.target.value)} /></div>
                        <div className="form-group"><label className="block text-center text-sm font-medium text-gray-700">Commercial Charges (%)</label><input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5" value={commercialCharges} onChange={(e) => setCommercialCharges(e.target.value)} /></div>
                        <div className="form-group"><label className="block text-center text-sm font-medium text-gray-700">Handling Charge (%)</label><input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5" value={handlingCharge} onChange={(e) => setHandlingCharge(e.target.value)} /></div>
                    </div>

                    {errorMessage && (
                        <p className={`text-center mb-4 text-red-600 text-sm`}>{errorMessage}</p>
                    )}

                    {/* Result Display */}
                    <div className={`text-center text-lg font-bold bg-gray-100 p-3 rounded-md border border-gray-300 my-4 ${outputColor}`}>
                        {output}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-3 mt-4">
                        <button className="px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-sm" onClick={calculateCosting}>Get Result</button>
                        <button className="px-4 py-2 rounded-md font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 text-sm" onClick={downloadPDF}>Print / Save as PDF</button>
                        <button className="px-4 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-300 text-sm" onClick={clearInputs}>Clear</button>
                    </div>
                </main>
            </div>
            {/* The "Return to Home" button is removed as navigation is handled by the main App component */}
        </section>
    );
};

export default Costing;

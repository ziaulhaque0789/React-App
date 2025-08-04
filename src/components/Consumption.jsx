import React, { useState } from 'react';
import html2pdf from 'html2pdf.js'; // Import html2pdf.js

const Consumption = () => {
    // Neck Rib States
    const [neckRibStyleName, setNeckRibStyleName] = useState('');
    const [neckRibItemName, setNeckRibItemName] = useState('');
    const [neckRibBuyerName, setNeckRibBuyerName] = useState('');
    const [neckRibInputValues, setNeckRibInputValues] = useState(''); // nw, rh, fnd, g1, w1
    const [neckRibResultDisplay, setNeckRibResultDisplay] = useState('');
    const [neckRibResultColor, setNeckRibResultColor] = useState('text-gray-800');
    const [lastNeckRibResult, setLastNeckRibResult] = useState(null);
    const [neckRibErrorMessage, setNeckRibErrorMessage] = useState('');

    // Trouser/Legging States
    const [trouserStyleName, setTrouserStyleName] = useState('');
    const [trouserItemName, setTrouserItemName] = useState('');
    const [trouserBuyerName, setTrouserBuyerName] = useState('');
    const [trouserInputValues, setTrouserInputValues] = useState(''); // fr, br, il, th, wbh, g2, w2
    const [trouserResultDisplay, setTrouserResultDisplay] = useState('');
    const [trouserResultColor, setTrouserResultColor] = useState('text-gray-800');
    const [lastTrouserResult, setLastTrouserResult] = useState(null);
    const [trouserErrorMessage, setTrouserErrorMessage] = useState('');

    // Pocket States
    const [pocketStyleName, setPocketStyleName] = useState('');
    const [pocketItemName, setPocketItemName] = useState('');
    const [pocketBuyerName, setPocketBuyerName] = useState('');
    const [pocketInputValues, setPocketInputValues] = useState(''); // pw, ph, g8, w8
    const [pocketResultDisplay, setPocketResultDisplay] = useState('');
    const [pocketResultColor, setPocketResultColor] = useState('text-gray-800');
    const [lastPocketResult, setLastPocketResult] = useState(null);
    const [pocketErrorMessage, setPocketErrorMessage] = useState('');

    // Collar States
    const [collarStyleName, setCollarStyleName] = useState('');
    const [collarItemName, setCollarItemName] = useState('');
    const [collarBuyerName, setCollarBuyerName] = useState('');
    const [collarInputValues, setCollarInputValues] = useState(''); // cl, ch, w9
    const [collarResultDisplay, setCollarResultDisplay] = useState('');
    const [collarResultColor, setCollarResultColor] = useState('text-gray-800');
    const [lastCollarResult, setLastCollarResult] = useState(null);
    const [collarErrorMessage, setCollarErrorMessage] = useState('');

    // Cuff States
    const [cuffStyleName, setCuffStyleName] = useState('');
    const [cuffItemName, setCuffItemName] = useState('');
    const [cuffBuyerName, setCuffBuyerName] = useState('');
    const [cuffInputValues, setCuffInputValues] = useState(''); // so, ch, w10
    const [cuffResultDisplay, setCuffResultDisplay] = useState('');
    const [cuffResultColor, setCuffResultColor] = useState('text-gray-800');
    const [lastCuffResult, setLastCuffResult] = useState(null);
    const [cuffErrorMessage, setCuffErrorMessage] = useState('');

    // Body Consumption States
    const [bodyConsumptionStyleName, setBodyConsumptionStyleName] = useState('');
    const [bodyConsumptionItemName, setBodyConsumptionItemName] = useState('');
    const [bodyConsumptionBuyerName, setBodyConsumptionBuyerName] = useState('');
    const [bodyConsumptionInputValues, setBodyConsumptionInputValues] = useState(''); // body, sleeve, chest, gsmVal, wastageVal
    const [bodyConsumptionResultDisplay, setBodyConsumptionResultDisplay] = useState('');
    const [bodyConsumptionResultColor, setBodyConsumptionResultColor] = useState('text-gray-800');
    const [lastBodyConsumptionResult, setLastBodyConsumptionResult] = useState(null);
    const [bodyConsumptionErrorMessage, setBodyConsumptionErrorMessage] = useState('');


    // Helper to get number from input, defaulting to 0 if invalid
    const getNumber = (value) => {
        const val = parseFloat(value);
        return isNaN(val) ? 0 : val;
    };

    // --- Neck Rib Consumption ---
    const calculateNeckRib = () => {
        setNeckRibErrorMessage(''); // Clear previous errors
        if (!neckRibStyleName || !neckRibItemName || !neckRibBuyerName) {
            setNeckRibErrorMessage("Please enter Style Name, Item Name, and Buyer Name.");
            setNeckRibResultColor("text-red-600");
            return;
        }

        const parts = neckRibInputValues.split(',').map(x => parseFloat(x.trim()));
        if (parts.length !== 5 || parts.some(isNaN)) {
            setNeckRibErrorMessage("❌ Please enter exactly 5 numbers separated by commas: Neck Width, Rib Height, Front Neck Drop, Rib GSM, Wastage%.");
            setNeckRibResultColor("text-red-600");
            return;
        }

        const [nw, rh, fnd, g1, w1] = parts;

        if (nw <= 0 || rh <= 0 || fnd <= 0 || g1 <= 0 || w1 < 0) {
            setNeckRibErrorMessage("Please enter valid positive numbers for Neck Width, Rib Height, Front Neck Drop, Rib GSM. Wastage can be zero or positive.");
            setNeckRibResultColor("text-red-600");
            return;
        }

        const result = (((((nw * 2) + 4 + fnd) * ((rh * 2) + 2) * g1) / 10000000) * 12) * (1 + w1 / 100);
        setNeckRibResultDisplay(`✅ Neck Rib Consumption: ${result.toFixed(4)} Kg/Dozen`);
        setNeckRibResultColor("text-green-600");

        setLastNeckRibResult({
            style: neckRibStyleName, item: neckRibItemName, buyer: neckRibBuyerName,
            neckWidth: nw, ribHeight: rh, frontNeckDrop: fnd, gsm: g1, wastage: w1,
            consumption: result.toFixed(4)
        });
    };

    const clearNeckRibInputs = () => {
        setNeckRibStyleName('');
        setNeckRibItemName('');
        setNeckRibBuyerName('');
        setNeckRibInputValues('');
        setNeckRibResultDisplay('');
        setNeckRibResultColor('text-gray-800');
        setLastNeckRibResult(null);
        setNeckRibErrorMessage('');
    };

    const downloadNeckRibPDF = () => {
        if (!lastNeckRibResult) {
            setNeckRibErrorMessage("❗ Please calculate first before downloading.");
            setNeckRibResultColor("text-red-600");
            return;
        }
        const element = document.createElement('div');
        element.innerHTML = `
            <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 15px;">Neck Rib Consumption</h3>
            <p style="margin-bottom: 5px;"><strong>Style Name:</strong> ${lastNeckRibResult.style}</p>
            <p style="margin-bottom: 5px;"><strong>Item Name:</strong> ${lastNeckRibResult.item}</p>
            <p style="margin-bottom: 15px;"><strong>Buyer Name:</strong> ${lastNeckRibResult.buyer}</p>
            <hr style="border-top: 1px solid #ccc; margin: 15px 0;">
            <p style="margin-bottom: 5px;"><strong>Neck Width:</strong> ${lastNeckRibResult.neckWidth} CM</p>
            <p style="margin-bottom: 5px;"><strong>Rib Height:</strong> ${lastNeckRibResult.ribHeight} CM</p>
            <p style="margin-bottom: 5px;"><strong>Front Neck Drop:</strong> ${lastNeckRibResult.frontNeckDrop} CM</p>
            <p style="margin-bottom: 5px;"><strong>Rib GSM:</strong> ${lastNeckRibResult.gsm}</p>
            <p style="margin-bottom: 5px;"><strong>Wastage:</strong> ${lastNeckRibResult.wastage}%</p>
            <p style="margin-top: 15px; font-size: 18px; font-weight: bold;"><strong>Fabric Consumption:</strong> ${lastNeckRibResult.consumption} KG/Dozen</p>
        `;
        const opt = { margin: 0.5, filename: `${lastNeckRibResult.style}_neck_rib_consumption.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } };
        html2pdf().set(opt).from(element).save();
    };


    // --- Trouser/Legging Consumption ---
    const calculateTrouser = () => {
        setTrouserErrorMessage(''); // Clear previous errors
        if (!trouserStyleName || !trouserItemName || !trouserBuyerName) {
            setTrouserErrorMessage("Please enter Style Name, Item Name, and Buyer Name.");
            setTrouserResultColor("text-red-600");
            return;
        }

        const parts = trouserInputValues.split(',').map(x => parseFloat(x.trim()));
        if (parts.length !== 7 || parts.some(isNaN)) {
            setTrouserErrorMessage("❌ Please enter exactly 7 numbers separated by commas: Front Rise, Back Rise, Inseam Length, Thai, Waistband Height, Main Fabric GSM, Wastage%.");
            setTrouserResultColor("text-red-600");
            return;
        }

        const [fr, br, il, th, wbh, g2, w2] = parts;

        if (fr <= 0 || br <= 0 || il <= 0 || th <= 0 || wbh <= 0 || g2 <= 0 || w2 < 0) {
            setTrouserErrorMessage("Please enter valid positive numbers for all fields except Wastage (can be zero or positive).");
            setTrouserResultColor("text-red-600");
            return;
        }

        const result = (((((fr + br) / 2) + 4 + (il + (wbh * 2) + 6)) * ((th + 4) * 4) * g2 / 10000000) * 12) * (1 + w2 / 100);
        setTrouserResultDisplay(`✅ Trouser/Legging Consumption: ${result.toFixed(4)} Kg/Dozen`);
        setTrouserResultColor("text-green-600");

        setLastTrouserResult({
            style: trouserStyleName, item: trouserItemName, buyer: trouserBuyerName,
            frontRise: fr, backRise: br, inseamLength: il, thai: th, waistBandHeight: wbh, gsm: g2, wastage: w2,
            consumption: result.toFixed(4)
        });
    };

    const clearTrouserInputs = () => {
        setTrouserStyleName('');
        setTrouserItemName('');
        setTrouserBuyerName('');
        setTrouserInputValues('');
        setTrouserResultDisplay('');
        setTrouserResultColor('text-gray-800');
        setLastTrouserResult(null);
        setTrouserErrorMessage('');
    };

    const downloadTrouserPDF = () => {
        if (!lastTrouserResult) {
            setTrouserErrorMessage("❗ Please calculate first before downloading.");
            setTrouserResultColor("text-red-600");
            return;
        }
        const element = document.createElement('div');
        element.innerHTML = `
            <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 15px;">Trouser/Legging Consumption</h3>
            <p style="margin-bottom: 5px;"><strong>Style Name:</strong> ${lastTrouserResult.style}</p>
            <p style="margin-bottom: 5px;"><strong>Item Name:</strong> ${lastTrouserResult.item}</p>
            <p style="margin-bottom: 15px;"><strong>Buyer Name:</strong> ${lastTrouserResult.buyer}</p>
            <hr style="border-top: 1px solid #ccc; margin: 15px 0;">
            <p style="margin-bottom: 5px;"><strong>Front Rise:</strong> ${lastTrouserResult.frontRise} CM</p>
            <p style="margin-bottom: 5px;"><strong>Back Rise:</strong> ${lastTrouserResult.backRise} CM</p>
            <p style="margin-bottom: 5px;"><strong>Inseam Length:</strong> ${lastTrouserResult.inseamLength} CM</p>
            <p style="margin-bottom: 5px;"><strong>Thai:</strong> ${lastTrouserResult.thai} CM</p>
            <p style="margin-bottom: 5px;"><strong>Waistband Height:</strong> ${lastTrouserResult.waistBandHeight} CM</p>
            <p style="margin-bottom: 5px;"><strong>Main Fabric GSM:</strong> ${lastTrouserResult.gsm}</p>
            <p style="margin-bottom: 5px;"><strong>Wastage:</strong> ${lastTrouserResult.wastage}%</p>
            <p style="margin-top: 15px; font-size: 18px; font-weight: bold;"><strong>Fabric Consumption:</strong> ${lastTrouserResult.consumption} KG/Dozen</p>
        `;
        const opt = { margin: 0.5, filename: `${lastTrouserResult.style}_trouser_consumption.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } };
        html2pdf().set(opt).from(element).save();
    };

    // --- Pocket Consumption ---
    const calculatePocket = () => {
        setPocketErrorMessage(''); // Clear previous errors
        if (!pocketStyleName || !pocketItemName || !pocketBuyerName) {
            setPocketErrorMessage("Please enter Style Name, Item Name, and Buyer Name.");
            setPocketResultColor("text-red-600");
            return;
        }

        const parts = pocketInputValues.split(',').map(x => parseFloat(x.trim()));
        if (parts.length !== 4 || parts.some(isNaN)) {
            setPocketErrorMessage("❌ Please enter exactly 4 numbers separated by commas: Pocket Width, Pocket Height, Fabric GSM, Wastage%.");
            setPocketResultColor("text-red-600");
            return;
        }

        const [pw, ph, g8, w8] = parts;

        if (pw <= 0 || ph <= 0 || g8 <= 0 || w8 < 0) {
            setPocketErrorMessage("Please enter valid positive numbers for Pocket Width, Pocket Height, Fabric GSM. Wastage can be zero or positive.");
            setPocketResultColor("text-red-600");
            return;
        }

        const result = (((pw + 4) * (ph + 4) * g8 / 10000000) * 12) * (1 + w8 / 100);
        setPocketResultDisplay(`✅ Pocket Consumption: ${result.toFixed(4)} Kg/Dozen`);
        setPocketResultColor("text-green-600");

        setLastPocketResult({
            style: pocketStyleName, item: pocketItemName, buyer: pocketBuyerName,
            pocketWidth: pw, pocketHeight: ph, gsm: g8, wastage: w8,
            consumption: result.toFixed(4)
        });
    };

    const clearPocketInputs = () => {
        setPocketStyleName('');
        setPocketItemName('');
        setPocketBuyerName('');
        setPocketInputValues(''); // Corrected: Clear the combined input string
        setPocketResultDisplay('');
        setPocketResultColor('text-gray-800');
        setLastPocketResult(null);
        setPocketErrorMessage('');
    };

    const downloadPocketPDF = () => {
        if (!lastPocketResult) {
            setPocketErrorMessage("❗ Please calculate first before downloading.");
            setPocketResultColor("text-red-600");
            return;
        }
        const element = document.createElement('div');
        element.innerHTML = `
            <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 15px;">Pocket Consumption</h3>
            <p style="margin-bottom: 5px;"><strong>Style Name:</strong> ${lastPocketResult.style}</p>
            <p style="margin-bottom: 5px;"><strong>Item Name:</strong> ${lastPocketResult.item}</p>
            <p style="margin-bottom: 15px;"><strong>Buyer Name:</strong> ${lastPocketResult.buyer}</p>
            <hr style="border-top: 1px solid #ccc; margin: 15px 0;">
            <p style="margin-bottom: 5px;"><strong>Pocket Width:</strong> ${lastPocketResult.pocketWidth} CM</p>
            <p style="margin-bottom: 5px;"><strong>Pocket Height:</strong> ${lastPocketResult.pocketHeight} CM</p>
            <p style="margin-bottom: 5px;"><strong>Fabric GSM:</strong> ${lastPocketResult.gsm}</p>
            <p style="margin-bottom: 5px;"><strong>Wastage:</strong> ${lastPocketResult.wastage}%</p>
            <p style="margin-top: 15px; font-size: 18px; font-weight: bold;"><strong>Fabric Consumption:</strong> ${lastPocketResult.consumption} KG/Dozen</p>
        `;
        const opt = { margin: 0.5, filename: `${lastPocketResult.style}_pocket_consumption.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } };
        html2pdf().set(opt).from(element).save();
    };

    // --- Collar Consumption ---
    const calculateCollar = () => {
        setCollarErrorMessage(''); // Clear previous errors
        if (!collarStyleName || !collarItemName || !collarBuyerName) {
            setCollarErrorMessage("Please enter Style Name, Item Name, and Buyer Name.");
            setCollarResultColor("text-red-600");
            return;
        }

        const parts = collarInputValues.split(',').map(x => parseFloat(x.trim()));
        if (parts.length !== 3 || parts.some(isNaN)) {
            setCollarErrorMessage("❌ Please enter exactly 3 numbers separated by commas: Collar Length, Collar Height, Wastage%.");
            setCollarResultColor("text-red-600");
            return;
        }

        const [cl, ch, w9] = parts;

        if (cl <= 0 || ch <= 0 || w9 < 0) {
            setCollarErrorMessage("Please enter valid positive numbers for Collar Length, Collar Height. Wastage can be zero or positive.");
            setCollarResultColor("text-red-600");
            return;
        }

        const result = (((cl + 1) * (ch + 1) * 0.00009090 * 12)) * (1 + w9 / 100);
        setCollarResultDisplay(`✅ Collar Consumption: ${result.toFixed(4)} Kg/Dozen`);
        setCollarResultColor("text-green-600");

        setLastCollarResult({
            style: collarStyleName, item: collarItemName, buyer: collarBuyerName,
            collarLength: cl, collarHeight: ch, wastage: w9,
            consumption: result.toFixed(4)
        });
    };

    const clearCollarInputs = () => {
        setCollarStyleName('');
        setCollarItemName('');
        setCollarBuyerName('');
        setCollarInputValues('');
        setCollarResultDisplay('');
        setCollarResultColor('text-gray-800');
        setLastCollarResult(null);
        setCollarErrorMessage('');
    };

    const downloadCollarPDF = () => {
        if (!lastCollarResult) {
            setCollarErrorMessage("❗ Please calculate first before downloading.");
            setCollarResultColor("text-red-600");
            return;
        }
        const element = document.createElement('div');
        element.innerHTML = `
            <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 15px;">Collar Consumption</h3>
            <p style="margin-bottom: 5px;"><strong>Style Name:</strong> ${lastCollarResult.style}</p>
            <p style="margin-bottom: 5px;"><strong>Item Name:</strong> ${lastCollarResult.item}</p>
            <p style="margin-bottom: 15px;"><strong>Buyer Name:</strong> ${lastCollarResult.buyer}</p>
            <hr style="border-top: 1px solid #ccc; margin: 15px 0;">
            <p style="margin-bottom: 5px;"><strong>Collar Length:</strong> ${lastCollarResult.collarLength} CM</p>
            <p style="margin-bottom: 5px;"><strong>Collar Height:</strong> ${lastCollarResult.collarHeight} CM</p>
            <p style="margin-bottom: 5px;"><strong>Wastage:</strong> ${lastCollarResult.wastage}%</p>
            <p style="margin-top: 15px; font-size: 18px; font-weight: bold;"><strong>Fabric Consumption:</strong> ${lastCollarResult.consumption} KG/Dozen</p>
        `;
        const opt = { margin: 0.5, filename: `${lastCollarResult.style}_collar_consumption.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } };
        html2pdf().set(opt).from(element).save();
    };

    // --- Cuff Consumption ---
    const calculateCuff = () => {
        setCuffErrorMessage(''); // Clear previous errors
        if (!cuffStyleName || !cuffItemName || !cuffBuyerName) {
            setCuffErrorMessage("Please enter Style Name, Item Name, and Buyer Name.");
            setCuffResultColor("text-red-600");
            return;
        }

        const parts = cuffInputValues.split(',').map(x => parseFloat(x.trim()));
        if (parts.length !== 3 || parts.some(isNaN)) {
            setCuffErrorMessage("❌ Please enter exactly 3 numbers separated by commas: Sleeve Opening, Cuff Height, Wastage%.");
            setCuffResultColor("text-red-600");
            return;
        }

        const [so, ch, w10] = parts;

        if (so <= 0 || ch <= 0 || w10 < 0) {
            setCuffErrorMessage("Please enter valid positive numbers for Sleeve Opening, Cuff Height. Wastage can be zero or positive.");
            setCuffResultColor("text-red-600");
            return;
        }

        const result = (((((so * 2) + 2) * (ch + 2) * 2) * 0.00009090 * 12)) * (1 + w10 / 100);
        setCuffResultDisplay(`✅ Cuff Consumption: ${result.toFixed(4)} Kg/Dozen`);
        setCuffResultColor("text-green-600");

        setLastCuffResult({
            style: cuffStyleName, item: cuffItemName, buyer: cuffBuyerName,
            sleeveOpening: so, cuffHeight: ch, wastage: w10,
            consumption: result.toFixed(4)
        });
    };

    const clearCuffInputs = () => {
        setCuffStyleName('');
        setCuffItemName('');
        setCuffBuyerName('');
        setCuffInputValues('');
        setCuffResultDisplay('');
        setCuffResultColor('text-gray-800');
        setLastCuffResult(null);
        setCuffErrorMessage('');
    };

    const downloadCuffPDF = () => {
        if (!lastCuffResult) {
            setCuffErrorMessage("❗ Please calculate first before downloading.");
            setCuffResultColor("text-red-600");
            return;
        }
        const element = document.createElement('div');
        element.innerHTML = `
            <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 15px;">Cuff Consumption</h3>
            <p style="margin-bottom: 5px;"><strong>Style Name:</strong> ${lastCuffResult.style}</p>
            <p style="margin-bottom: 5px;"><strong>Item Name:</strong> ${lastCuffResult.item}</p>
            <p style="margin-bottom: 15px;"><strong>Buyer Name:</strong> ${lastCuffResult.buyer}</p>
            <hr style="border-top: 1px solid #ccc; margin: 15px 0;">
            <p style="margin-bottom: 5px;"><strong>Sleeve Opening:</strong> ${lastCuffResult.sleeveOpening} CM</p>
            <p style="margin-bottom: 5px;"><strong>Cuff Height:</strong> ${lastCuffResult.cuffHeight} CM</p>
            <p style="margin-bottom: 5px;"><strong>Wastage:</strong> ${lastCuffResult.wastage}%</p>
            <p style="margin-top: 15px; font-size: 18px; font-weight: bold;"><strong>Fabric Consumption:</strong> ${lastCuffResult.consumption} KG/Dozen</p>
        `;
        const opt = { margin: 0.5, filename: `${lastCuffResult.style}_cuff_consumption.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } };
        html2pdf().set(opt).from(element).save();
    };

    // --- Body Consumption ---
    const calculateBodyConsumption = () => {
        setBodyConsumptionErrorMessage(''); // Clear previous errors
        if (!bodyConsumptionStyleName || !bodyConsumptionItemName || !bodyConsumptionBuyerName) {
            setBodyConsumptionErrorMessage("Please enter Style Name, Item Name, and Buyer Name.");
            setBodyConsumptionResultColor("text-red-600");
            return;
        }

        const parts = bodyConsumptionInputValues.split(',').map(x => parseFloat(x.trim()));
        if (parts.length !== 5 || parts.some(isNaN)) {
            setBodyConsumptionErrorMessage("❌ Please enter exactly 5 numbers separated by commas: Body Length, Sleeve Length, Chest, GSM, Wastage%.");
            setBodyConsumptionResultColor("text-red-600");
            return;
        }

        const [body, sleeve, chest, gsmVal, wastageVal] = parts;

        if (body <= 0 || sleeve <= 0 || chest <= 0 || gsmVal <= 0 || wastageVal < 0) {
            setBodyConsumptionErrorMessage("Please enter valid positive numbers for Body Length, Sleeve Length, Chest, GSM. Wastage can be zero or positive.");
            setBodyConsumptionResultColor("text-red-600");
            return;
        }

        const consumption = (
            ((body + sleeve + 6) * (chest + 4)) * 2 * 12 * gsmVal / 10000000
        ) * (1 + (wastageVal / 100));

        const resultText = `✅ Body Consumption: ${consumption.toFixed(4)} Kg/Dozen`;
        setBodyConsumptionResultDisplay(resultText);
        setBodyConsumptionResultColor("text-green-600");

        setLastBodyConsumptionResult({
            style: bodyConsumptionStyleName, item: bodyConsumptionItemName, buyer: bodyConsumptionBuyerName,
            body, sleeve, chest, gsm: gsmVal, wastage: wastageVal,
            consumption: consumption.toFixed(4)
        });
    };

    const clearBodyConsumptionFields = () => {
        setBodyConsumptionStyleName('');
        setBodyConsumptionItemName('');
        setBodyConsumptionBuyerName('');
        setBodyConsumptionInputValues('');
        setBodyConsumptionResultDisplay('');
        setBodyConsumptionResultColor('text-gray-800');
        setLastBodyConsumptionResult(null);
        setBodyConsumptionErrorMessage('');
    };

    const downloadBodyConsumptionPDF = () => {
        if (!lastBodyConsumptionResult) {
            setBodyConsumptionErrorMessage("❗ Please calculate first before downloading.");
            setBodyConsumptionResultColor("text-red-600");
            return;
        }

        const element = document.createElement('div');
        element.innerHTML = `
            <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 15px;">Body Fabric Consumption</h3>
            <p style="margin-bottom: 5px;"><strong>Style Name:</strong> ${lastBodyConsumptionResult.style}</p>
            <p style="margin-bottom: 5px;"><strong>Item Name:</strong> ${lastBodyConsumptionResult.item}</p>
            <p style="margin-bottom: 15px;"><strong>Buyer Name:</strong> ${lastBodyConsumptionResult.buyer}</p>
            <hr style="border-top: 1px solid #ccc; margin: 15px 0;">
            <p style="margin-bottom: 5px;"><strong>Body Length:</strong> ${lastBodyConsumptionResult.body} CM</p>
            <p style="margin-bottom: 5px;"><strong>Sleeve Length:</strong> ${lastBodyConsumptionResult.sleeve} CM</p>
            <p style="margin-bottom: 5px;"><strong>Chest Width:</strong> ${lastBodyConsumptionResult.chest} CM</p>
            <p style="margin-bottom: 5px;"><strong>GSM:</strong> ${lastBodyConsumptionResult.gsm}</p>
            <p style="margin-bottom: 5px;"><strong>Wastage:</strong> ${lastBodyConsumptionResult.wastage}%</p>
            <p style="margin-top: 15px; font-size: 18px; font-weight: bold;"><strong>Fabric Consumption:</strong> ${lastBodyConsumptionResult.consumption} KG/Dozen</p>
        `;

        const opt = {
            margin: 0.5,
            filename: `${lastBodyConsumptionResult.style}_consumption.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    };


    return (
        <section className="bg-gradient-to-br from-green-400 via-green-500 to-teal-500 py-8 px-4 min-h-screen flex items-center justify-center font-serif">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl font-bold text-center uppercase border-b-2 border-white pb-4 mb-8 text-white">
                    Fabric Consumption for Initial Costing
                </h2>

                <div className="space-y-4">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Body Consumption Section */}
                    <div className="bg-white shadow-md rounded-md overflow-hidden">
                        <h3 className="p-4 text-left font-bold text-lg text-blue-600 bg-gray-100">
                            Body Consumption for All Knitted Tops 
                        </h3>
                        <div className="p-4 border-t border-gray-200">
                            <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
                               

                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    <input
                                        type="text"
                                        id="bodyConsumptionStyleName"
                                        className="w-full p-2 border border-gray-300 rounded-md placeholder:text-xs lg:placeholder:text-sm text-sm"
                                        placeholder="Style Name"
                                        value={bodyConsumptionStyleName}
                                        onChange={(e) => setBodyConsumptionStyleName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        id="bodyConsumptionItemName"
                                       className="w-full p-2 border border-gray-300 rounded-md placeholder:text-xs lg:placeholder:text-sm text-sm"
                                        placeholder="Item Name"
                                        value={bodyConsumptionItemName}
                                        onChange={(e) => setBodyConsumptionItemName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        id="bodyConsumptionBuyerName"
                                       className="w-full p-2 border border-gray-300 rounded-md placeholder:text-xs lg:placeholder:text-sm text-sm"
                                        placeholder="Buyer Name"
                                        value={bodyConsumptionBuyerName}
                                        onChange={(e) => setBodyConsumptionBuyerName(e.target.value)}
                                    />
                                </div>

                                <p className="pt-3 text-center text-gray-700 text-sm"><strong>Enter values in CM:</strong> Body Length, Sleeve Length, Chest, GSM, Wastage% (comma-separated)</p>
                                <input
                                    type="text"
                                    id="bodyConsumptionInputValues"
                                    className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm mb-4 text-center px-2 py-1.5"
                                    placeholder="Type like this: 75,18,56,160,15"
                                    value={bodyConsumptionInputValues}
                                    onChange={(e) => setBodyConsumptionInputValues(e.target.value)}
                                />

                                {bodyConsumptionErrorMessage && (
                                    <p className={`text-center mb-4 text-red-600 text-sm`}>{bodyConsumptionErrorMessage}</p>
                                )}

                             <div className="flex flex-wrap justify-center gap-2 mb-4">
  <button
    className="text-center text-xs sm:text-sm px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
    onClick={calculateBodyConsumption}
  >
    Consumption
  </button>

  <button
    className="text-center text-xs sm:text-sm px-4 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-300"
    onClick={clearBodyConsumptionFields}
  >
    Clear
  </button>

  <button
    className="text-center text-xs sm:text-sm px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-300"
    onClick={downloadBodyConsumptionPDF}
  >
    Download PDF
  </button>
</div>


                                <div id="bodyConsumptionResultDisplay" className={`mt-5 text-lg ${bodyConsumptionResultColor}`}>
                                    {bodyConsumptionResultDisplay}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Neck Rib Consumption */}
                    <div className="bg-white shadow-md rounded-md overflow-hidden">
                        <h3 className="p-4 text-left font-bold text-lg text-blue-600 bg-gray-100">
                            Neck-Rib Consumption for Knitted Tops
                        </h3>
                        <div className="p-4 border-t border-gray-200">
                            <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    <input
                                        type="text"
                                        id="neckRibStyleName"
                                        className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5"
                                        placeholder="Style Name"
                                        value={neckRibStyleName}
                                        onChange={(e) => setNeckRibStyleName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        id="neckRibItemName"
                                        className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5"
                                        placeholder="Item Name"
                                        value={neckRibItemName}
                                        onChange={(e) => setNeckRibItemName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        id="neckRibBuyerName"
                                        className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5"
                                        placeholder="Buyer Name"
                                        value={neckRibBuyerName}
                                        onChange={(e) => setNeckRibBuyerName(e.target.value)}
                                    />
                                </div>

                                <p className="pt-3 text-center text-gray-700 text-sm"><strong>Enter values in CM:</strong> Neck Width, Rib Height, Front Neck Drop, Rib GSM, Wastage% (comma-separated)</p>
                                <input
                                    type="text"
                                    id="neckRibInputValues"
                                    className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm mb-4 text-center px-2 py-1.5"
                                    placeholder="Type like this: 18,3,10,220,5"
                                    value={neckRibInputValues}
                                    onChange={(e) => setNeckRibInputValues(e.target.value)}
                                />

                                {neckRibErrorMessage && (
                                    <p className={`text-center mb-4 text-red-600 text-sm`}>{neckRibErrorMessage}</p>
                                )}

                                <div className="grid grid-cols-3 gap-2 flex-wrap mt-4">
                                    <button
                                        className="px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-sm"
                                        onClick={calculateNeckRib}
                                    >
                                        Consumption
                                    </button>
                                    <button
                                        className="px-4 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-300 text-sm"
                                        onClick={clearNeckRibInputs}
                                    >
                                        Clear
                                    </button>
                                    <button
                                        className="px-4 py-2 rounded-md font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 text-sm"
                                        onClick={downloadNeckRibPDF}
                                    >
                                        Download PDF
                                    </button>
                                </div>

                                <div id="neckRibResultDisplay" className={`mt-5 text-lg ${neckRibResultColor}`}>
                                    {neckRibResultDisplay}
                                </div>
                            </div>
                        </div>
                    </div>


</div>



<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Basic Trouser or Legging Consumption */}
                    <div className="bg-white shadow-md rounded-md overflow-hidden">
                        <h3 className="p-4 text-left font-bold text-lg text-blue-600 bg-gray-100">
                            Basic Trouser or Legging Consumption
                        </h3>
                        <div className="p-4 border-t border-gray-200">
                            <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    <input
                                        type="text"
                                        id="trouserStyleName"
                                        className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5"
                                        placeholder="Style Name"
                                        value={trouserStyleName}
                                        onChange={(e) => setTrouserStyleName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        id="trouserItemName"
                                        className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5"
                                        placeholder="Item Name"
                                        value={trouserItemName}
                                        onChange={(e) => setTrouserItemName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        id="trouserBuyerName"
                                        className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5"
                                        placeholder="Buyer Name"
                                        value={trouserBuyerName}
                                        onChange={(e) => setTrouserBuyerName(e.target.value)}
                                    />
                                </div>

                                <p className="pt-3 text-center text-gray-700 text-sm"><strong>Enter values in CM:</strong> Front Rise, Back Rise, Inseam Length, Thai, Waistband Height, Main Fabric GSM, Wastage% (comma-separated)</p>
                                <input
                                    type="text"
                                    id="trouserInputValues"
                                    className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm mb-4 text-center px-2 py-1.5"
                                    placeholder="Type like this: 25,35,70,20,5,200,8"
                                    value={trouserInputValues}
                                    onChange={(e) => setTrouserInputValues(e.target.value)}
                                />

                                {trouserErrorMessage && (
                                    <p className={`text-center mb-4 text-red-600 text-sm`}>{trouserErrorMessage}</p>
                                )}

                                <div className="grid grid-cols-3 gap-2 flex-wrap mt-4">
                                    <button
                                        className="px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-sm"
                                        onClick={calculateTrouser}
                                    >
                                        Consumption
                                    </button>
                                    <button
                                        className="px-4 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-300 text-sm"
                                        onClick={clearTrouserInputs}
                                    >
                                        Clear
                                    </button>
                                    <button
                                        className="px-4 py-2 rounded-md font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 text-sm"
                                        onClick={downloadTrouserPDF}
                                    >
                                        Download PDF
                                    </button>
                                </div>

                                <div id="trouserResultDisplay" className={`mt-5 text-lg ${trouserResultColor}`}>
                                    {trouserResultDisplay}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pocket Consumption Section */}
                    <div className="bg-white shadow-md rounded-md overflow-hidden">
                        <h3 className="p-4 text-left font-bold text-lg text-blue-600 bg-gray-100">
                            Pocket Consumption (Back for Trouser & Front for Polo-Shirts)
                        </h3>
                        <div className="p-4 border-t border-gray-200">
                            <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    <input
                                        type="text"
                                        id="pocketStyleName"
                                        className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5"
                                        placeholder="Style Name"
                                        value={pocketStyleName}
                                        onChange={(e) => setPocketStyleName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        id="pocketItemName"
                                        className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5"
                                        placeholder="Item Name"
                                        value={pocketItemName}
                                        onChange={(e) => setPocketItemName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        id="pocketBuyerName"
                                        className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5"
                                        placeholder="Buyer Name"
                                        value={pocketBuyerName}
                                        onChange={(e) => setPocketBuyerName(e.target.value)}
                                    />
                                </div>

                                <p className="pt-3 text-center text-gray-700 text-sm"><strong>Enter values in CM:</strong> Pocket Width, Pocket Height, Fabric GSM, Wastage% (comma-separated)</p>
                                <input
                                    type="text"
                                    id="pocketInputValues"
                                    className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm mb-4 text-center px-2 py-1.5"
                                    placeholder="Type like this: 15,18,180,5"
                                    value={pocketInputValues}
                                    onChange={(e) => setPocketInputValues(e.target.value)}
                                />

                                {pocketErrorMessage && (
                                    <p className={`text-center mb-4 text-red-600 text-sm`}>{pocketErrorMessage}</p>
                                )}

                                <div className="grid grid-cols-3 gap-2 flex-wrap mt-4">
                                    <button
                                        className="px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-sm"
                                        onClick={calculatePocket}
                                    >
                                        Consumption
                                    </button>
                                    <button
                                        className="px-4 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-300 text-sm"
                                        onClick={clearPocketInputs}
                                    >
                                        Clear
                                    </button>
                                    <button
                                        className="px-4 py-2 rounded-md font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 text-sm"
                                        onClick={downloadPocketPDF}
                                    >
                                        Download PDF
                                    </button>
                                </div>

                                <div id="pocketResultDisplay" className={`mt-5 text-lg ${pocketResultColor}`}>
                                    {pocketResultDisplay}
                                </div>
                            </div>
                        </div>
                    </div>



</div>


<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Collar Consumption Section */}
                    <div className="bg-white shadow-md rounded-md overflow-hidden">
                        <h3 className="p-4 text-left font-bold text-lg text-blue-600 bg-gray-100">
                            Polo-Shirt Collar Consumption
                        </h3>
                        <div className="p-4 border-t border-gray-200">
                            <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    <input
                                        type="text"
                                        id="collarStyleName"
                                        className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5"
                                        placeholder="Style Name"
                                        value={collarStyleName}
                                        onChange={(e) => setCollarStyleName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        id="collarItemName"
                                        className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5"
                                        placeholder="Item Name"
                                        value={collarItemName}
                                        onChange={(e) => setCollarItemName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        id="collarBuyerName"
                                        className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5"
                                        placeholder="Buyer Name"
                                        value={collarBuyerName}
                                        onChange={(e) => setCollarBuyerName(e.target.value)}
                                    />
                                </div>

                                <p className="pt-3 text-center text-gray-700 text-sm"><strong>Enter values in CM:</strong> Collar Length, Collar Height, Wastage% (comma-separated)</p>
                                <input
                                    type="text"
                                    id="collarInputValues"
                                    className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm mb-4 text-center px-2 py-1.5"
                                    placeholder="Type like this: 40,8,5"
                                    value={collarInputValues}
                                    onChange={(e) => setCollarInputValues(e.target.value)}
                                />

                                {collarErrorMessage && (
                                    <p className={`text-center mb-4 text-red-600 text-sm`}>{collarErrorMessage}</p>
                                )}

                                <div className="grid grid-cols-3 gap-2 flex-wrap mt-4">
                                    <button
                                        className="px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-sm"
                                        onClick={calculateCollar}
                                    >
                                        Consumption
                                    </button>
                                    <button
                                        className="px-4 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-300 text-sm"
                                        onClick={clearCollarInputs}
                                    >
                                        Clear
                                    </button>
                                    <button
                                        className="px-4 py-2 rounded-md font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 text-sm"
                                        onClick={downloadCollarPDF}
                                    >
                                        Download PDF
                                    </button>
                                </div>

                                <div id="collarResultDisplay" className={`mt-5 text-lg ${collarResultColor}`}>
                                    {collarResultDisplay}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cuff Consumption Section */}
                    <div className="bg-white shadow-md rounded-md overflow-hidden">
                        <h3 className="p-4 text-left font-bold text-lg text-blue-600 bg-gray-100">
                            Polo-Shirt Cuff Consumption
                        </h3>
                        <div className="p-4 border-t border-gray-200">
                            <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    <input
                                        type="text"
                                        id="cuffStyleName"
                                        className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5"
                                        placeholder="Style Name"
                                        value={cuffStyleName}
                                        onChange={(e) => setCuffStyleName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        id="cuffItemName"
                                        className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5"
                                        placeholder="Item Name"
                                        value={cuffItemName}
                                        onChange={(e) => setCuffItemName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        id="cuffBuyerName"
                                        className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm text-center px-2 py-1.5"
                                        placeholder="Buyer Name"
                                        value={cuffBuyerName}
                                        onChange={(e) => setCuffBuyerName(e.target.value)}
                                    />
                                </div>

                                <p className="pt-3 text-center text-gray-700 text-sm"><strong>Enter values in CM:</strong> Sleeve Opening, Cuff Height, Wastage% (comma-separated)</p>
                                <input
                                    type="text"
                                    id="cuffInputValues"
                                    className="form-input block w-full rounded-md border-gray-300 shadow-sm text-sm mb-4 text-center px-2 py-1.5"
                                    placeholder="Type like this: 10,6,5"
                                    value={cuffInputValues}
                                    onChange={(e) => setCuffInputValues(e.target.value)}
                                />

                                {cuffErrorMessage && (
                                    <p className={`text-center mb-4 text-red-600 text-sm`}>{cuffErrorMessage}</p>
                                )}

                                <div className="grid grid-cols-3 gap-2 flex-wrap mt-4">
                                    <button
                                        className="px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-sm"
                                        onClick={calculateCuff}
                                    >
                                        Consumption
                                    </button>
                                    <button
                                        className="px-4 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-300 text-sm"
                                        onClick={clearCuffInputs}
                                    >
                                        Clear
                                    </button>
                                    <button
                                        className="px-4 py-2 rounded-md font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 text-sm"
                                        onClick={downloadCuffPDF}
                                    >
                                        Download PDF
                                    </button>
                                </div>

                                <div id="cuffResultDisplay" className={`mt-5 text-lg ${cuffResultColor}`}>
                                    {cuffResultDisplay}
                                </div>
                            </div>
                        </div>
                    </div>


</div>


                </div>
            </div>
        </section>
    );
};

export default Consumption;

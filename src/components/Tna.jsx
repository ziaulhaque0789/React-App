import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';

const Tna = () => {
  const [stylePoName, setStylePoName] = useState('');
  const [itemName, setItemName] = useState('');
  const [orderConfirmDate, setOrderConfirmDate] = useState('');
  const [shipmentDate, setShipmentDate] = useState('');
  const [orderQty, setOrderQty] = useState('');
  const [tnaData, setTnaData] = useState({});

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) return '';
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const generateTNA = () => {
    const qty = parseInt(orderQty);
    const orderDate = new Date(orderConfirmDate);
    const shipDate = new Date(shipmentDate);

    if (!orderConfirmDate || !shipmentDate || isNaN(qty)) {
      alert("Please fill all fields correctly.");
      return;
    }

    const addDays = (date, days) => {
      const d = new Date(date);
      d.setDate(d.getDate() + days);
      return formatDate(d);
    };

    let productionOffset;
    if (qty > 50000) productionOffset = 30;
    else if (qty > 20000) productionOffset = 20;
    else if (qty > 10000) productionOffset = 15;
    else productionOffset = 10;

    const productionStartDate = new Date(shipDate);
    productionStartDate.setDate(productionStartDate.getDate() - productionOffset);

    const calculateDate = (offset) => formatDate(new Date(productionStartDate.getTime() - offset * 24 * 60 * 60 * 1000));

    const data = {
      fabricBooking: addDays(orderDate, 3),
      trimsBooking: addDays(orderDate, 3),
      fitSampleSubmission: calculateDate(40),
      fitSampleApproval: calculateDate(30),
      labDipSubmission: calculateDate(45),
      labDipApproval: calculateDate(35),
      ppSampleSubmission: calculateDate(25),
      ppSampleApproval: calculateDate(15),
      fabricInHouse: calculateDate(10),
      trimsInHouse: calculateDate(7),
      productionStart: formatDate(productionStartDate),
      shipmentDateDisplay: formatDate(shipDate)
    };

    setTnaData(data);
  };

  const downloadPDF = () => {
    const element = document.getElementById("tnaSection");
    const opt = {
      margin: [0.2, 0.2, 0.2, 0.2],
      filename: 'TNA-Calendar.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    html2pdf().set(opt).from(element).save();
  };

  const clearAll = () => {
    setStylePoName('');
    setItemName('');
    setOrderConfirmDate('');
    setShipmentDate('');
    setOrderQty('');
    setTnaData({});
  };

  return (
    <section className="py-10 bg-gradient-to-r from-slate-900 to-blue-600 text-white font-sans">
      <div className="container mx-auto max-w-4xl">
        <main id="tnaSection" className="bg-white text-gray-800 rounded-xl shadow-2xl p-8">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold">TNA (Time & Action) Calendar in Garment Merchandising</h1>
            <p className="text-lg text-gray-600 mt-2">A powerful tool that every successful merchandiser uses.</p>
          </header>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="stylePoName" className="block font-medium">Style / PO Name</label>
              <input type="text" id="stylePoName" className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm" value={stylePoName} onChange={e => setStylePoName(e.target.value)} placeholder="Enter Style or PO Name" />
            </div>
            <div>
              <label htmlFor="itemName" className="block font-medium">Item Name</label>
              <input type="text" id="itemName" className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm" value={itemName} onChange={e => setItemName(e.target.value)} placeholder="Enter Item Name" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label htmlFor="orderConfirmDate" className="block font-medium">Order Confirm Date</label>
              <input type="date" id="orderConfirmDate" className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm" value={orderConfirmDate} onChange={e => setOrderConfirmDate(e.target.value)} />
            </div>
            <div>
              <label htmlFor="shipmentDate" className="block font-medium">Shipment Date</label>
              <input type="date" id="shipmentDate" className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm" value={shipmentDate} onChange={e => setShipmentDate(e.target.value)} />
            </div>
            <div>
              <label htmlFor="orderQty" className="block font-medium">Order Quantity (pcs)</label>
              <input type="number" id="orderQty" className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm" min="1" value={orderQty} onChange={e => setOrderQty(e.target.value)} placeholder="Enter MOQ" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm" onClick={generateTNA}>Generate TNA</button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm" onClick={downloadPDF}>Download as PDF</button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm" onClick={clearAll}>Clear All</button>
          </div>

          <section aria-labelledby="calendarHeading">
            <h2 id="calendarHeading" className="text-xl font-semibold text-center py-4">Quick TNA Estimate</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300 text-center text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2">Action</th>
                    <th className="border px-4 py-2">Planned Date</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries({
                    'Fabric Booking': 'fabricBooking',
                    'Trims & Accessories Booking': 'trimsBooking',
                    'Fit Sample Submission': 'fitSampleSubmission',
                    'Fit Sample Approval': 'fitSampleApproval',
                    'Lab-Dip Submission': 'labDipSubmission',
                    'Lab-Dip Approval': 'labDipApproval',
                    'PP Sample Submission': 'ppSampleSubmission',
                    'PP Sample Approval': 'ppSampleApproval',
                    'Fabric In-House': 'fabricInHouse',
                    'Trims & Accessories In-House': 'trimsInHouse',
                    'Production Start': 'productionStart',
                    'Shipment Date': 'shipmentDateDisplay'
                  }).map(([label, key]) => (
                    <tr key={key} className="even:bg-white odd:bg-gray-50">
                      <td className="border px-4 py-2 font-medium text-left">{label}</td>
                      <td className="border px-4 py-2">{tnaData[key] || ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>

        <div className="text-center mt-8">
          <a href="https://brightfuturei.com/" className="inline-block">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold">Return to Home</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Tna;

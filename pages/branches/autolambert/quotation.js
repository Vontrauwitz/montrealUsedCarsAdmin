// pages/branches/autolambert/quotation.js

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Layout from '@/components/Layout';
import { useReactToPrint } from 'react-to-print';

const QuotationPage = () => {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    selectedCar: '',
    clientName: '',
    clientPhone: '',
    warranty: '',
    dossierSAAQ: false,
    isCredit: false,
    downPayment: 0,
    loanTerm: 6,
    interestRate: 15,
  });
  const [selectedCarDetails, setSelectedCarDetails] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Quotation',
  });

  useEffect(() => {
    axios.get('/api/cars')
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
      });
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [formData, selectedCarDetails]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });

    if (name === 'selectedCar') {
      const selectedCar = cars.find(car => car._id === value);
      setSelectedCarDetails(selectedCar || null);
    }
  };

  const calculateTotals = () => {
    let carPrice = selectedCarDetails ? selectedCarDetails.price : 0;
    let warrantyPrice = formData.warranty === '2-year warranty' ? 1500 : formData.warranty === '3-year warranty' ? 1800 : 0;
    let dossierSAAQPrice = formData.dossierSAAQ ? 1200 : 0;
    let subtotal = carPrice + warrantyPrice;
    let TPS = subtotal * 0.05;
    let TVQ = subtotal * 0.0997;
    let total = subtotal + TPS + TVQ;
    let grandTotal = total + dossierSAAQPrice;

    if (formData.isCredit) {
      const principal = grandTotal - formData.downPayment;
      const annualInterestRate = formData.interestRate / 100;
      const loanTermYears = formData.loanTerm / 12;
      const financedTotal = principal * (1 + annualInterestRate * loanTermYears);
      const monthlyPayment = financedTotal / formData.loanTerm;
      setMonthlyPayment(monthlyPayment.toFixed(2));
    } else {
      setMonthlyPayment(0);
    }

    setSubtotal(subtotal);
    setTotal(Number(total.toFixed(2)));
    setGrandTotal(Number(grandTotal.toFixed(2)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario
    console.log('Form submitted:', formData);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Quotation of Car (Auto Lambert)</h2>
          <form onSubmit={handleSubmit} className="space-y-6" ref={componentRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="selectedCar" className="block text-sm font-medium text-gray-700">
                    Vehicle:
                  </label>
                  <select
                    id="selectedCar"
                    name="selectedCar"
                    value={formData.selectedCar}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a vehicle</option>
                    {cars.map(car => (
                      <option key={car._id} value={car._id}>
                        {car.brand} {car.model} - ${car.price} - VIN: {car.vinNumber}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">
                    Client:
                  </label>
                  <input
                    id="clientName"
                    name="clientName"
                    type="text"
                    value={formData.clientName}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700">
                    Telephone:
                  </label>
                  <input
                    id="clientPhone"
                    name="clientPhone"
                    type="tel"
                    value={formData.clientPhone}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center">
                {selectedCarDetails && (
                  <div className="flex items-center justify-center h-full">
                    <img
                      src={selectedCarDetails.photos[0]}
                      alt="Selected Car"
                      className="max-w-full h-48 object-contain rounded-lg shadow-md mt-2"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="warranty" className="block text-sm font-medium text-gray-700">
                  Warranty:
                </label>
                <select
                  id="warranty"
                  name="warranty"
                  value={formData.warranty}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select a warranty</option>
                  <option value="2-year warranty">2-year warranty - $1500</option>
                  <option value="3-year warranty">3-year warranty - $1800</option>
                </select>
              </div>
              <div>
                <label htmlFor="dossierSAAQ" className="block text-sm font-medium text-gray-700">
                  Dossier SAAQ:
                </label>
                <input
                  id="dossierSAAQ"
                  name="dossierSAAQ"
                  type="checkbox"
                  checked={formData.dossierSAAQ}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="isCredit" className="block text-sm font-medium text-gray-700">
                  Credit:
                </label>
                <input
                  id="isCredit"
                  name="isCredit"
                  type="checkbox"
                  checked={formData.isCredit}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              {formData.isCredit && (
                <>
                  <div>
                    <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700">
                      Down Payment:
                    </label>
                    <input
                      id="downPayment"
                      name="downPayment"
                      type="number"
                      value={formData.downPayment}
                      onChange={handleChange}
                      className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700">
                      Loan Term:
                    </label>
                    <select
                      id="loanTerm"
                      name="loanTerm"
                      value={formData.loanTerm}
                      onChange={handleChange}
                      className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value={6}>6 months</option>
                      <option value={12}>12 months</option>
                      <option value={18}>18 months</option>
                      <option value={24}>24 months</option>
                      <option value={36}>36 months</option>
                      <option value={48}>48 months</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            {selectedCarDetails && (
              <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-sm font-medium text-gray-700">Brand:</p>
                  <p className="text-sm text-gray-900">{selectedCarDetails.brand}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Model:</p>
                  <p className="text-sm text-gray-900">{selectedCarDetails.model}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Version:</p>
                  <p className="text-sm text-gray-900">{selectedCarDetails.version}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Odometer:</p>
                  <p className="text-sm text-gray-900">{selectedCarDetails.odometer} km</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Year:</p>
                  <p className="text-sm text-gray-900">{selectedCarDetails.year}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">VIN Number:</p>
                  <p className="text-sm text-gray-900">{selectedCarDetails.vinNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Price:</p>
                  <p className="text-sm text-gray-900">${selectedCarDetails.price}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Warranty:</p>
                  <p className="text-sm text-gray-900">{formData.warranty}</p>
                </div>
              </div>
            )}

            <div className="col-span-2">
              <div className="text-right mt-4">
                <p className="text-lg font-bold">Subtotal: ${subtotal.toFixed(2)}</p>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md my-4">
                  <h3 className="text-md font-bold">Invoice Breakdown:</h3>
                  <ul>
                    <li>Vehicle Price: ${selectedCarDetails ? selectedCarDetails.price : 0}</li>
                    <li>Warranty: ${formData.warranty === '2-year warranty' ? 1500 : formData.warranty === '3-year warranty' ? 1800 : 0}</li>
                    <li>TPS (5%): ${(subtotal * 0.05).toFixed(2)}</li>
                    <li>TVQ (9.97%): ${(subtotal * 0.0997).toFixed(2)}</li>
                  </ul>
                </div>
                <p className="text-lg font-bold">Total (incl. taxes): ${total.toFixed(2)}</p>
                {formData.dossierSAAQ && <p className="text-lg font-bold">Dossier SAAQ: $1200</p>}
                <p className="text-lg font-bold mt-2">Grand Total: ${grandTotal.toFixed(2)}</p>
                {formData.isCredit && (
                  <>
                    <p className="text-lg font-bold mt-2">Down Payment: ${formData.downPayment}</p>
                    <p className="text-lg font-bold mt-2">Monthly Payment: ${monthlyPayment}</p>
                  </>
                )}
              </div>

              <div className="no-print">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
                >
                  Submit Quotation
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-4"
                >
                  Print Quotation
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4"
                >
                  Save as PDF
                </button>
              </div>
            </div>
          </form>

          <div ref={componentRef} className="hidden print:block bg-white p-8">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold">Quotation of Car (Auto Lambert)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="col-span-1">
                {selectedCarDetails && (
                  <div className="flex items-center justify-center h-full">
                    <img
                      src={selectedCarDetails.photos[0]}
                      alt="Selected Car"
                      className="max-w-full h-48 object-contain rounded-lg shadow-md mt-2"
                    />
                  </div>
                )}
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Client:</p>
                    <p>{formData.clientName}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Telephone:</p>
                    <p>{formData.clientPhone}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Vehicle:</p>
                    <p>{selectedCarDetails?.brand} {selectedCarDetails?.model} ({selectedCarDetails?.year})</p>
                  </div>
                  <div>
                    <p className="font-semibold">VIN:</p>
                    <p>{selectedCarDetails?.vinNumber}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Price:</p>
                    <p>${selectedCarDetails?.price}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Warranty:</p>
                    <p>{formData.warranty}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Dossier SAAQ:</p>
                    <p>{formData.dossierSAAQ ? '$1200' : 'No'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right mt-4">
              <p className="text-lg font-bold">Subtotal: ${subtotal.toFixed(2)}</p>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md my-4">
                <h3 className="text-md font-bold">Invoice Breakdown:</h3>
                <ul>
                  <li>Vehicle Price: ${selectedCarDetails ? selectedCarDetails.price : 0}</li>
                  <li>Warranty: ${formData.warranty === '2-year warranty' ? 1500 : formData.warranty === '3-year warranty' ? 1800 : 0}</li>
                  <li>TPS (5%): ${(subtotal * 0.05).toFixed(2)}</li>
                  <li>TVQ (9.97%): ${(subtotal * 0.0997).toFixed(2)}</li>
                </ul>
              </div>
              <p className="text-lg font-bold">Total (incl. taxes): ${total.toFixed(2)}</p>
              {formData.dossierSAAQ && <p className="text-lg font-bold">Dossier SAAQ: $1200</p>}
              <p className="text-lg font-bold mt-2">Grand Total: ${grandTotal.toFixed(2)}</p>
              {formData.isCredit && (
                <>
                  <p className="text-lg font-bold mt-2">Down Payment: ${formData.downPayment}</p>
                  <p className="text-lg font-bold mt-2">Monthly Payment: ${monthlyPayment}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuotationPage;

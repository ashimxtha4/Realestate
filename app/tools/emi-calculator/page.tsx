'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { motion } from 'framer-motion';

export default function EMICalculator() {
  const { isDarkMode } = useStore();
  const [loanAmount, setLoanAmount] = useState('500000');
  const [interestRate, setInterestRate] = useState('7.5');
  const [loanTenure, setLoanTenure] = useState('20');
  const [tenureType, setTenureType] = useState('years');
  const [emi, setEMI] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) / 100 / 12 || 0;
    const tenure = tenureType === 'years' ? 
      (parseFloat(loanTenure) || 0) * 12 : 
      parseFloat(loanTenure) || 0;

    if (principal > 0 && rate > 0 && tenure > 0) {
      const emiAmount = (principal * rate * Math.pow(1 + rate, tenure)) / 
                       (Math.pow(1 + rate, tenure) - 1);
      
      const totalAmountPayable = emiAmount * tenure;
      const totalInterestPayable = totalAmountPayable - principal;

      setEMI(emiAmount);
      setTotalInterest(totalInterestPayable);
      setTotalAmount(totalAmountPayable);
    } else {
      setEMI(0);
      setTotalInterest(0);
      setTotalAmount(0);
    }
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure, tenureType]);

  const generateAmortizationSchedule = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) / 100 / 12 || 0;
    const tenure = tenureType === 'years' ? 
      (parseFloat(loanTenure) || 0) * 12 : 
      parseFloat(loanTenure) || 0;

    const schedule = [];
    let balance = principal;
    
    for (let month = 1; month <= Math.min(tenure, 12); month++) {
      const interestAmount = balance * rate;
      const principalAmount = emi - interestAmount;
      balance -= principalAmount;
      
      schedule.push({
        month,
        emi: emi,
        principal: principalAmount,
        interest: interestAmount,
        balance: Math.max(0, balance)
      });
    }
    
    return schedule;
  };

  const amortizationSchedule = generateAmortizationSchedule();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            EMI Calculator
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Calculate your home loan EMI and plan your property purchase
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}
          >
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
              Loan Details
            </h2>
            
            <div className="space-y-6">
              {/* Loan Amount */}
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Loan Amount
                </label>
                <div className="relative">
                  <span className={`absolute left-3 top-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>$</span>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className={`w-full pl-8 pr-4 py-3 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg`}
                    placeholder="500000"
                  />
                </div>
                <input
                  type="range"
                  min="50000"
                  max="2000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full mt-2"
                />
                <div className={`flex justify-between text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                  <span>$50K</span>
                  <span>$2M</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Interest Rate (Annual)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className={`w-full pr-8 pl-4 py-3 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg`}
                    placeholder="7.5"
                  />
                  <span className={`absolute right-3 top-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full mt-2"
                />
                <div className={`flex justify-between text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                  <span>1%</span>
                  <span>20%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Loan Tenure
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(e.target.value)}
                    className={`flex-1 px-4 py-3 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg`}
                    placeholder="20"
                  />
                  <select
                    value={tenureType}
                    onChange={(e) => setTenureType(e.target.value)}
                    className={`px-4 py-3 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8`}
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
                </div>
                <input
                  type="range"
                  min={tenureType === 'years' ? '1' : '12'}
                  max={tenureType === 'years' ? '30' : '360'}
                  step="1"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  className="w-full mt-2"
                />
                <div className={`flex justify-between text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                  <span>{tenureType === 'years' ? '1 Year' : '12 Months'}</span>
                  <span>{tenureType === 'years' ? '30 Years' : '360 Months'}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* EMI Result */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                EMI Calculation
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                    Monthly EMI
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    ${emi.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                    Total Interest
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    ${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                    Total Amount
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ${totalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>

              {/* Pie Chart Representation */}
              <div className="mt-8">
                <div className="flex items-center justify-center">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="20"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="20"
                        strokeDasharray={`${(parseFloat(loanAmount) / totalAmount) * 251.2} 251.2`}
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="20"
                        strokeDasharray={`${(totalInterest / totalAmount) * 251.2} 251.2`}
                        strokeDashoffset={`-${(parseFloat(loanAmount) / totalAmount) * 251.2}`}
                      />
                    </svg>
                  </div>
                </div>
                
                <div className="flex justify-center mt-4 space-x-6">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Principal
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-orange-600 rounded mr-2"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Interest
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amortization Schedule */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                Amortization Schedule (First 12 Months)
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <th className={`px-4 py-2 text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Month</th>
                      <th className={`px-4 py-2 text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>EMI</th>
                      <th className={`px-4 py-2 text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Principal</th>
                      <th className={`px-4 py-2 text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Interest</th>
                      <th className={`px-4 py-2 text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amortizationSchedule.map((row, index) => (
                      <tr key={index} className={`${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                        <td className={`px-4 py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                          {row.month}
                        </td>
                        <td className={`px-4 py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                          ${row.emi.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className={`px-4 py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                          ${row.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className={`px-4 py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                          ${row.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className={`px-4 py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                          ${row.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`mt-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}
        >
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            EMI Planning Tips
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1 mr-3">
                  <i className="ri-lightbulb-line text-white text-sm"></i>
                </div>
                <div>
                  <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Keep EMI under 40% of income
                  </h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Financial experts recommend keeping your EMI below 40% of your monthly income
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1 mr-3">
                  <i className="ri-arrow-down-line text-white text-sm"></i>
                </div>
                <div>
                  <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Higher down payment = Lower EMI
                  </h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Making a larger down payment reduces your loan amount and monthly EMI
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mt-1 mr-3">
                  <i className="ri-time-line text-white text-sm"></i>
                </div>
                <div>
                  <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Shorter tenure = Less interest
                  </h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Choosing a shorter loan tenure reduces total interest paid
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-1 mr-3">
                  <i className="ri-money-dollar-circle-line text-white text-sm"></i>
                </div>
                <div>
                  <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Consider prepayment options
                  </h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Making prepayments can significantly reduce your interest burden
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
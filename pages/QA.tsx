
import React, { useState } from 'react';
import { TEST_CASES, BUG_REPORTS } from '../constants';

const QA: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'TESTS' | 'BUGS' | 'AUTOMATION'>('TESTS');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">QA Automation Hub</h1>
        <p className="text-gray-500">Comprehensive testing infrastructure and deliverables.</p>
      </div>

      <div className="flex border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('TESTS')} 
          className={`px-6 py-3 font-medium text-sm transition ${activeTab === 'TESTS' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
        >
          Functional Test Cases (50)
        </button>
        <button 
          onClick={() => setActiveTab('BUGS')} 
          className={`px-6 py-3 font-medium text-sm transition ${activeTab === 'BUGS' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
        >
          Bug Reports
        </button>
        <button 
          onClick={() => setActiveTab('AUTOMATION')} 
          className={`px-6 py-3 font-medium text-sm transition ${activeTab === 'AUTOMATION' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
        >
          Selenium Framework
        </button>
      </div>

      {activeTab === 'TESTS' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Module</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Priority</th>
                <th className="px-6 py-3">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {TEST_CASES.map(tc => (
                <tr key={tc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-indigo-600 font-bold">{tc.id}</td>
                  <td className="px-6 py-4 font-medium">{tc.module}</td>
                  <td className="px-6 py-4 text-gray-600">{tc.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${tc.priority === 'HIGH' ? 'bg-red-100 text-red-700' : tc.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                      {tc.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-green-600 font-medium">Pass</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'BUGS' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BUG_REPORTS.map(bug => (
            <div key={bug.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold font-mono bg-red-50 text-red-600 px-2 py-1 rounded">{bug.id}</span>
                <span className={`text-[10px] uppercase font-black px-2 py-1 rounded ${bug.status === 'OPEN' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{bug.status}</span>
              </div>
              <h3 className="font-bold text-gray-900 leading-snug">{bug.title}</h3>
              <p className="text-sm text-gray-500">{bug.description}</p>
              <div className="pt-2">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Repro Steps</p>
                <ul className="text-xs list-decimal list-inside text-gray-600 space-y-1">
                  {bug.reproSteps.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'AUTOMATION' && (
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-xl p-6 text-gray-300 font-mono text-sm leading-relaxed overflow-x-auto">
            <h4 className="text-indigo-400 mb-4 font-bold border-b border-gray-800 pb-2">// Selenium Page Object Model - CartPage.java</h4>
            <pre>{`
public class CartPage extends BasePage {
    @FindBy(css = ".checkout-btn")
    private WebElement checkoutButton;

    @FindBy(id = "coupon-input")
    private WebElement couponField;

    public void applyCoupon(String code) {
        couponField.sendKeys(code);
        couponField.submit();
        Logger.info("Applied coupon: " + code);
    }

    public OrderSuccessPage clickCheckout() {
        waitForElementVisible(checkoutButton);
        checkoutButton.click();
        return new OrderSuccessPage(driver);
    }
}
            `}</pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold mb-4 flex items-center"><i className="fas fa-microchip mr-2 text-indigo-600"></i> CI/CD Pipeline</h3>
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs"><i className="fas fa-check"></i></div>
                        <span className="text-sm font-medium">Build: Success</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs"><i className="fas fa-check"></i></div>
                        <span className="text-sm font-medium">Unit Tests: 142/142 Passed</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs"><i className="fas fa-check"></i></div>
                        <span className="text-sm font-medium">API regression: 38 Passed</span>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold mb-4 flex items-center"><i className="fas fa-tachometer-alt mr-2 text-indigo-600"></i> Performance Matrix (JMeter)</h3>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm"><span className="text-gray-500">95th Percentile Response</span><span className="font-bold">240ms</span></div>
                    <div className="flex justify-between text-sm"><span className="text-gray-500">Max Concurrent Users</span><span className="font-bold">5,000</span></div>
                    <div className="flex justify-between text-sm"><span className="text-gray-500">Throughput</span><span className="font-bold">120 req/sec</span></div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mt-4">
                        <div className="bg-indigo-500 h-full w-[85%]"></div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QA;

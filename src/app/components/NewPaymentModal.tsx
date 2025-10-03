"use client";

import { useState } from "react";

interface NewPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewPaymentModal({ isOpen, onClose }: NewPaymentModalProps) {
  const [form, setForm] = useState({
    billingName: "",
    email: "",
    amount: "",
    street1: "",
    street2: "",
    city: "",
    country: "United States",
    state: "California",
    zip: "",
    cardNumber: "",
    expMonth: "01",
    expYear: "2025",
    cvc: "",
    paymentMethod: "Stripe",
    linkPlan: "",
    billingType: "One Time",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment data:", form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 space-y-4 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">New Payment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 font-bold text-xl">&times;</button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Billing Name *</label>
              <input type="text" name="billingName" value={form.billingName} onChange={handleChange} placeholder="Enter billing name" className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter email address" className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount *</label>
              <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Enter amount" className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Street Address *</label>
              <input type="text" name="street1" value={form.street1} onChange={handleChange} placeholder="Enter street address" className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Street Address 2</label>
              <input type="text" name="street2" value={form.street2} onChange={handleChange} placeholder="Enter apartment, suite, etc." className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City *</label>
              <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="Enter city" className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Country *</label>
              <select name="country" value={form.country} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                <option>United States</option>
                <option>Canada</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State/Province *</label>
              <select name="state" value={form.state} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                <option>California</option>
                <option>New York</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Zip/Postal Code *</label>
              <input type="text" name="zip" value={form.zip} onChange={handleChange} placeholder="Enter zip/postal code" className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Card Number *</label>
              <input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="Enter card number" className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Expiration Date *</label>
              <div className="flex gap-2 mt-1">
                <input type="text" name="expMonth" value={form.expMonth} onChange={handleChange} placeholder="MM" className="w-1/2 px-3 py-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"/>
                <input type="text" name="expYear" value={form.expYear} onChange={handleChange} placeholder="YYYY" className="w-1/2 px-3 py-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"/>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CVC *</label>
              <input type="text" name="cvc" value={form.cvc} onChange={handleChange} placeholder="Enter CVC" className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Method *</label>
              <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                <option>Stripe</option>
                <option>PayPal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Link to Plan</label>
              <input type="text" name="linkPlan" value={form.linkPlan} onChange={handleChange} placeholder="Learn" className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Billing Type</label>
            <select name="billingType" value={form.billingType} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
              <option>One Time</option>
              <option>Recurring</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Create Payment</button>
          </div>
        </form>
      </div>
    </div>
  );
}

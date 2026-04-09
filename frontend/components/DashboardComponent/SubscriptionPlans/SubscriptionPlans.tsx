// app/admin/subscription-plans/page.tsx
"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, PlusCircle } from "lucide-react";

type PlanStatus = "Active" | "Inactive";

interface SubscriptionPlan {
  id: string;
  name: string;
  type: "Free" | "Premium";
  price: number;
  duration: string; // e.g. "Forever", "1 Month", "12 Months"
  simulationsLimit: number | "Unlimited";
  features: string[];
  status: PlanStatus;
}

const initialPlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free Plan",
    type: "Free",
    price: 0,
    duration: "Forever",
    simulationsLimit: 10,
    features: [
      "Up to 10 simulations per month",
      "Basic scenarios",
      "Email support",
      "Mobile app access",
    ],
    status: "Active",
  },
  {
    id: "premium-monthly",
    name: "Premium Monthly",
    type: "Premium",
    price: 9.99,
    duration: "1 Month",
    simulationsLimit: "Unlimited",
    features: [
      "Unlimited simulations",
      "Advanced scenarios",
      "Priority support",
      "Financial insights",
    ],
    status: "Active",
  },
  {
    id: "premium-yearly",
    name: "Premium Yearly",
    type: "Premium",
    price: 99.99,
    duration: "12 Months",
    simulationsLimit: "Unlimited",
    features: [
      "Unlimited simulations",
      "Advanced scenarios",
      "Priority support",
      "Financial insights",
      "Save 17% vs monthly",
    ],
    status: "Inactive",
  },
];

export default function SubscriptionPlan() {
  const [plans, setPlans] = useState(initialPlans);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);

  const [newPlan, setNewPlan] = useState({
    name: "",
    type: "Premium" as "Free" | "Premium",
    price: 0,
    duration: "1 Month",
    unlimited: true,
    limit: 10,
    features: [] as string[],
  });

  const openEdit = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    setShowEditModal(true);
  };

  const handleCreate = () => {
    // In real app → send to API
    alert("Plan created (mock)");
    setShowAddModal(false);
    setNewPlan({
      name: "",
      type: "Premium",
      price: 0,
      duration: "1 Month",
      unlimited: true,
      limit: 10,
      features: [],
    });
  };

  const handleUpdate = () => {
    // In real app → send to API
    alert("Plan updated (mock)");
    setShowEditModal(false);
    setEditingPlan(null);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-9xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[30px] font-bold text-gray-900">Subscription Plans</h1>
            <p className="mt-1.5 text-sm text-gray-600">
              Create and manage subscription plan types
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-lg bg-[#10B981] px-4 py-2.5 text-sm font-medium text-white hover:bg-green-600 transition"
          >
            <Plus size={18} /> Add Plan
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-6 shadow-sm ${
                plan.type === "Premium" ? "border-amber-200 bg-gradient-to-b from-amber-50/70 to-white" : "bg-white"
              }`}
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        plan.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {plan.status === "Active" ? "Active" : "Inactive"}
                    </span>
                    {plan.type === "Premium" && (
                      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                        PREMIUM
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(plan)}
                    className="rounded p-1.5 text-gray-500 hover:bg-gray-100"
                  >
                    <Pencil size={18} />
                  </button>
                  <button className="rounded p-1.5 text-red-600 hover:bg-red-50">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="mb-5">
                <p className="text-3xl font-bold text-gray-900">
                  ${plan.price}
                  <span className="text-lg font-normal text-gray-500">/{plan.duration}</span>
                </p>
                {plan.duration === "Forever" && <p className="text-sm text-gray-500">/Forever</p>}
              </div>

              {/* Simulations Limit */}
              <p className="mb-4 text-sm font-medium text-gray-700">
                Simulations Limit: {plan.simulationsLimit === "Unlimited" ? "Unlimited" : `${plan.simulationsLimit} per month`}
              </p>

              {/* Features */}
              <ul className="mb-6 space-y-2.5 text-sm text-gray-700">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action */}
              {plan.status === "Active" ? (
                <button className="w-full rounded-lg border border-red-300 bg-red-50 py-2.5 text-sm font-medium text-red-700 hover:bg-red-100 transition">
                  × Deactivate Plan
                </button>
              ) : (
                <button className="w-full rounded-lg bg-[#10B981] py-2.5 text-sm font-medium text-white hover:bg-green-700 transition">
                  ✓ Activate Plan
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ──────── ADD NEW PLAN MODAL ──────── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900">Add New Subscription Plan</h2>
              <button onClick={() => setShowAddModal(false)} className="rounded-full p-1.5 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">Plan Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Premium Monthly, Free Plan"
                  className="mt-1.5 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Plan Type *</label>
                  <select className="mt-1.5 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm">
                    <option>Free</option>
                    <option selected>Premium</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price ($) *</label>
                  <input
                    type="number"
                    defaultValue={0}
                    className="mt-1.5 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Duration *</label>
                <select className="mt-1.5 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm">
                  <option>1 Month</option>
                  <option>3 Months</option>
                  <option>12 Months</option>
                  <option>Forever</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Simulations Limit</label>
                <div className="mt-2 flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Unlimited simulations</span>
                </div>
                <input
                  type="number"
                  defaultValue={10}
                  disabled
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm opacity-60"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Features *</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded bg-gray-100 px-3 py-1.5 text-sm">Enter feature</span>
                  <button className="flex items-center gap-1 rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">
                    <PlusCircle size={16} /> Add Feature
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Note: Changes to subscription plans will affect new subscriptions. Existing user
                subscriptions will remain unchanged unless manually updated.
              </p>
            </div>

            <div className="flex justify-end gap-3 border-t px-6 py-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700"
              >
                Create Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ──────── EDIT PLAN MODAL ──────── */}
      {showEditModal && editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900">Edit Subscription Plan</h2>
              <button onClick={() => setShowEditModal(false)} className="rounded-full p-1.5 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">Plan Name *</label>
                <input
                  type="text"
                  defaultValue={editingPlan.name}
                  className="mt-1.5 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Plan Type *</label>
                  <select defaultValue={editingPlan.type} className="mt-1.5 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm">
                    <option>Free</option>
                    <option>Premium</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price ($) *</label>
                  <input
                    type="number"
                    defaultValue={editingPlan.price}
                    className="mt-1.5 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Duration *</label>
                <input
                  type="text"
                  defaultValue={editingPlan.duration}
                  className="mt-1.5 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Simulations Limit</label>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked={editingPlan.simulationsLimit === "Unlimited"}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Unlimited simulations</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Features *</label>
                <div className="mt-2 space-y-2">
                  {editingPlan.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 rounded border border-gray-200 px-3 py-2">
                      <input
                        type="text"
                        defaultValue={f}
                        className="flex-1 bg-transparent outline-none"
                      />
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button className="flex w-full items-center justify-center gap-2 rounded border border-dashed border-gray-300 py-2.5 text-sm text-gray-600 hover:border-gray-400">
                    <PlusCircle size={16} /> Add Feature
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t px-6 py-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700"
              >
                Update Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
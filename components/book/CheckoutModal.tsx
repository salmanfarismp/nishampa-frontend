"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import {
  X,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  User as UserIcon,
  BookOpen,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuantity?: number;
}

interface ShippingForm {
  name: string;
  phone: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

interface OrderResult {
  order_id: string | number;
  payment_id: string;
  total: number;
  quantity: number;
  shipping: ShippingForm;
}

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayFailureResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: Record<string, unknown>;
  };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: (response: RazorpayFailureResponse) => void) => void;
}

interface RazorpayConstructor {
  new (options: Record<string, unknown>): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

export default function CheckoutModal({
  isOpen,
  onClose,
  initialQuantity = 1,
}: CheckoutModalProps) {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [quantity, setQuantity] = useState(initialQuantity);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [step, setStep] = useState<"checkout" | "success">("checkout");
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null);

  const [shipping, setShipping] = useState<ShippingForm>({
    name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "Kerala",
    postal_code: "",
    country: "India",
  });

  // Check auth and load profile on mount
  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      try {
        setAuthLoading(true);
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();

        if (!mounted) return;
        setUser(currentUser);

        if (currentUser) {
          // Pre-fill user name/email
          const userMeta = currentUser.user_metadata || {};
          const displayName =
            userMeta.full_name || userMeta.name || currentUser.email?.split("@")[0] || "";

          // Fetch profile address
          const { data: profile } = await supabase
            .from("Profile")
            .select("*")
            .eq("id", currentUser.id)
            .maybeSingle();

          if (mounted) {
            setShipping((prev) => ({
              ...prev,
              name: profile?.name || displayName || prev.name,
              phone: profile?.contact_phone || profile?.phone || prev.phone,
              address_line1: profile?.address_line1 || prev.address_line1,
              address_line2: profile?.address_line2 || prev.address_line2,
              city: profile?.city || prev.city,
              state: profile?.state || prev.state,
              postal_code: profile?.postal_code || prev.postal_code,
              country: profile?.country || prev.country,
            }));
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        if (mounted) setAuthLoading(false);
      }
    }

    if (isOpen) {
      checkAuth();
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [isOpen, supabase]);

  if (!isOpen) return null;

  const unitPrice = 290;
  const totalPrice = quantity * unitPrice;

  const handleGoogleLogin = async () => {
    try {
      setErrorMessage(null);
      const redirectOrigin = window.location.origin;
      const nextPath = window.location.pathname + "?checkout=open";

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${redirectOrigin}/auth/callback?next=${encodeURIComponent(
            nextPath
          )}`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
      }
    } catch (err: unknown) {
      const e = err as Error;
      setErrorMessage(e.message || "Failed to initiate Google sign-in");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!shipping.name.trim()) return "ദയവായി നിങ്ങളുടെ പേര് നൽകുക (Please enter your name)";
    if (!shipping.phone.trim() || shipping.phone.trim().length < 10)
      return "ദയവായി സാധുവായ ഫോൺ നമ്പർ നൽകുക (Please enter a valid 10-digit phone number)";
    if (!shipping.address_line1.trim())
      return "ദയവായി ഡെലിവറി വിലാസം നൽകുക (Please enter address line 1)";
    if (!shipping.city.trim()) return "ദയവായി നഗരം/സ്ഥലം നൽകുക (Please enter city)";
    if (!shipping.postal_code.trim())
      return "ദയവായി പിൻ കോഡ് നൽകുക (Please enter postal/PIN code)";
    return null;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (typeof window.Razorpay === "undefined") {
      setErrorMessage(
        "Razorpay checkout script is still loading. Please check your internet connection and try again."
      );
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Create order on backend
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity,
          amount: totalPrice * 100, // paise
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.order_id) {
        throw new Error(orderData.error || orderData.details || "Could not create Razorpay order");
      }

      // 2. Open Razorpay Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Nisham PA",
        description: `Panam, Adhikaram, Arogyam (${quantity} ${quantity > 1 ? "copies" : "copy"})`,
        image: "/favicon.ico",
        order_id: orderData.order_id,
        prefill: {
          name: shipping.name,
          email: user?.email || "",
          contact: shipping.phone,
        },
        theme: {
          color: "#00244c", // Primary Royal Navy
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
        handler: async function (response: RazorpaySuccessResponse) {
          try {
            // 3. Verify Payment
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                quantity,
                shippingAddress: shipping,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              setOrderResult({
                order_id: verifyData.order_id,
                payment_id: verifyData.payment_id,
                total: totalPrice,
                quantity,
                shipping,
              });
              setStep("success");
            } else {
              setErrorMessage(
                verifyData.error || "Payment verification failed. Please contact support."
              );
            }
          } catch (err: unknown) {
            const e = err as Error;
            console.error("Verification error:", err);
            setErrorMessage(
              e.message || "Failed to verify transaction with server."
            );
          } finally {
            setIsProcessing(false);
          }
        },
      };

      const razorpayInstance = new window.Razorpay(options);

      razorpayInstance.on("payment.failed", function (failResponse: RazorpayFailureResponse) {
        console.error("Payment failed:", failResponse);
        setErrorMessage(
          failResponse.error?.description || "Payment failed or was cancelled."
        );
        setIsProcessing(false);
      });

      razorpayInstance.open();
    } catch (err: unknown) {
      const e = err as Error;
      console.error("Order error:", err);
      setErrorMessage(e.message || "An error occurred while creating order.");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div
          role="dialog"
          aria-modal="true"
          className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-surface rounded-2xl shadow-2xl border border-outline-variant/40 text-on-surface"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-surface border-b border-outline-variant/30">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-secondary" />
              <h3 className="text-title-lg font-bold text-primary [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                {step === "checkout" ? "പുസ്തകം ഓർഡർ ചെയ്യുക" : "ഓർഡർ സ്ഥിരീകരണം"}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container-high transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {/* Error Notification */}
            {errorMessage && (
              <div className="mb-5 flex items-start gap-2.5 p-3.5 rounded-lg bg-error/10 border border-error/20 text-error text-body-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="[font-family:var(--font-noto-sans-ml,var(--font-sans))] leading-relaxed">
                  {errorMessage}
                </span>
              </div>
            )}

            {/* STEP 1: AUTH & CHECKOUT */}
            {step === "checkout" && (
              <>
                {/* 1. If not authenticated, require Google login first */}
                {authLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-body-sm text-on-surface-variant">
                      ലോഡിംഗ്... (Checking account status)
                    </p>
                  </div>
                ) : !user ? (
                  <div className="flex flex-col items-center text-center py-6 px-4">
                    <div className="w-14 h-14 rounded-full bg-secondary-container/20 flex items-center justify-center mb-4 text-secondary">
                      <UserIcon className="w-7 h-7" />
                    </div>
                    <h4 className="text-title-lg text-primary font-bold mb-2 [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                      തുടരാൻ ഗൂഗിൾ വഴി ലോഗിൻ ചെയ്യുക
                    </h4>
                    <p className="text-body-md text-on-surface-variant max-w-sm mb-6 [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                      ഡെലിവറി വിലാസം ശേഖരിക്കാനും ഓർഡർ വിവരങ്ങൾ ട്രാക്ക് ചെയ്യാനും നിങ്ങളുടെ Google അക്കൗണ്ട് ഉപയോഗിച്ച് പ്രവേശിക്കുക.
                    </p>

                    <button
                      onClick={handleGoogleLogin}
                      type="button"
                      className="w-full sm:w-auto min-w-[260px] inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl border border-outline-variant bg-surface-container-lowest hover:bg-surface-container shadow-sm hover:shadow transition font-medium text-body-md text-on-surface cursor-pointer"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.13z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </button>

                    <div className="flex items-center gap-2 mt-8 text-label-sm text-on-surface-variant">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      <span>സുരക്ഷിത പേയ്‌മെന്റും സ്വകാര്യതയും ഉറപ്പുനൽകുന്നു</span>
                    </div>
                  </div>
                ) : (
                  /* 2. User is logged in -> Address form & summary */
                  <form onSubmit={handlePayment} className="space-y-6">
                    {/* Logged in status */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-body-sm">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center text-label-sm font-bold flex-shrink-0">
                          {user.email?.[0].toUpperCase()}
                        </div>
                        <span className="truncate text-on-surface font-medium">
                          {user.email}
                        </span>
                      </div>
                      <span className="text-secondary text-label-sm font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> വെരിഫൈഡ്
                      </span>
                    </div>

                    {/* Book Summary & Quantity */}
                    <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-title-md font-bold text-primary [font-family:var(--font-noto-sans-ml,var(--font-serif))]">
                            പണം, അധികാരം, ആരോഗ്യം
                          </h4>
                          <p className="text-body-sm text-on-surface-variant">
                            രണ്ടാം പതിപ്പ് • നിഷാം പി.എ.
                          </p>
                          <div className="flex items-center gap-1.5 mt-2 text-label-sm text-secondary font-semibold">
                            <Truck className="w-4 h-4" />
                            <span>സൗജന്യ ഡെലിവറി (Free Shipping)</span>
                          </div>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center border border-outline-variant rounded-lg overflow-hidden bg-surface">
                            <button
                              type="button"
                              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                              className="p-1.5 text-on-surface-variant hover:bg-surface-container transition cursor-pointer"
                              disabled={quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-body-md font-bold text-primary min-w-[28px] text-center">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                              className="p-1.5 text-on-surface-variant hover:bg-surface-container transition cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-title-md font-bold text-primary">
                            ₹{totalPrice}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Address Form */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-title-md font-bold text-primary [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                        <MapPin className="w-4 h-4 text-secondary" />
                        <span>ഡെലിവറി വിലാസം (Shipping Address)</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="sm:col-span-1">
                          <label className="block text-label-sm text-on-surface-variant font-medium mb-1 [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                            മുഴുവൻ പേര് (Full Name) *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={shipping.name}
                            onChange={handleInputChange}
                            placeholder="നിങ്ങളുടെ പേര്"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>

                        <div className="sm:col-span-1">
                          <label className="block text-label-sm text-on-surface-variant font-medium mb-1 [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                            ഫോൺ നമ്പർ (Phone Number) *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={shipping.phone}
                            onChange={handleInputChange}
                            placeholder="10 അക്ക മൊബൈൽ നമ്പർ"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-label-sm text-on-surface-variant font-medium mb-1 [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                            വീട്ടുപേര് / വിലാസം (Address Line 1) *
                          </label>
                          <input
                            type="text"
                            name="address_line1"
                            required
                            value={shipping.address_line1}
                            onChange={handleInputChange}
                            placeholder="വീട്ടുപേര്, കെട്ടിട നമ്പർ, തെരുവ്"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-label-sm text-on-surface-variant font-medium mb-1 [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                            ലാൻഡ്മാർക്ക് / പ്രദേശം (Line 2 - Optional)
                          </label>
                          <input
                            type="text"
                            name="address_line2"
                            value={shipping.address_line2}
                            onChange={handleInputChange}
                            placeholder="അടുത്തുള്ള പ്രധാന സ്ഥലം (Landmark)"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-label-sm text-on-surface-variant font-medium mb-1 [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                            നഗരം / സ്ഥലം (City / Town) *
                          </label>
                          <input
                            type="text"
                            name="city"
                            required
                            value={shipping.city}
                            onChange={handleInputChange}
                            placeholder="കോഴിക്കോട്, കൊച്ചി, etc."
                            className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-label-sm text-on-surface-variant font-medium mb-1 [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                            പിൻ കോഡ് (Postal / PIN) *
                          </label>
                          <input
                            type="text"
                            name="postal_code"
                            required
                            value={shipping.postal_code}
                            onChange={handleInputChange}
                            placeholder="673001"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-label-sm text-on-surface-variant font-medium mb-1 [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                            സംസ്ഥാനം (State) *
                          </label>
                          <input
                            type="text"
                            name="state"
                            required
                            value={shipping.state}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-label-sm text-on-surface-variant font-medium mb-1 [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                            രാജ്യം (Country)
                          </label>
                          <input
                            type="text"
                            name="country"
                            disabled
                            value={shipping.country}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-container text-body-md text-on-surface-variant cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Pay Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-primary text-on-primary text-title-md font-semibold hover:bg-primary-container shadow-md transition active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>പേയ്‌മെന്റ് ആരംഭിക്കുന്നു...</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-5 h-5" />
                            <span>ഓൺലൈനായി നൽകുക • ₹{totalPrice} (Razorpay)</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-3 mt-3 text-label-sm text-on-surface-variant">
                        <span>UPI</span>
                        <span>•</span>
                        <span>Google Pay / PhonePe</span>
                        <span>•</span>
                        <span>Credit / Debit Cards</span>
                        <span>•</span>
                        <span>NetBanking</span>
                      </div>
                    </div>
                  </form>
                )}
              </>
            )}

            {/* STEP 2: ORDER SUCCESS CONFIRMATION */}
            {step === "success" && orderResult && (
              <div className="py-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <h4 className="text-headline-sm text-primary font-bold mb-1 [font-family:var(--font-noto-sans-ml,var(--font-serif))]">
                  ഓർഡർ വിജയകരമായി സ്വീകരിച്ചു!
                </h4>
                <p className="text-body-md text-on-surface-variant mb-6 [font-family:var(--font-noto-sans-ml,var(--font-sans))]">
                  നിങ്ങളുടെ പെയ്‌മെന്റ് വിജയകരമായി പൂർത്തിയായി. പുസ്തകം ഉടൻ നിങ്ങളുടെ വിലാസത്തിലേക്ക് അയക്കുന്നതാണ്.
                </p>

                {/* Receipt Details Card */}
                <div className="w-full text-left bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 space-y-3 mb-6 text-body-sm">
                  <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                    <span className="text-on-surface-variant">Order ID</span>
                    <span className="font-mono font-bold text-primary">
                      #{orderResult.order_id}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                    <span className="text-on-surface-variant">Payment Ref (Razorpay)</span>
                    <span className="font-mono text-on-surface text-label-sm">
                      {orderResult.payment_id}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                    <span className="text-on-surface-variant">Quantity & Total</span>
                    <span className="font-bold text-primary">
                      {orderResult.quantity} copy (₹{orderResult.total})
                    </span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block mb-1">
                      ഡെലിവറി വിലാസം (Shipping to):
                    </span>
                    <p className="text-on-surface font-medium leading-relaxed">
                      {orderResult.shipping.name}
                      <br />
                      {orderResult.shipping.address_line1}
                      {orderResult.shipping.address_line2 && `, ${orderResult.shipping.address_line2}`}
                      <br />
                      {orderResult.shipping.city}, {orderResult.shipping.state} -{" "}
                      {orderResult.shipping.postal_code}
                      <br />
                      ഫോൺ: {orderResult.shipping.phone}
                    </p>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-2">
                  <button
                    onClick={onClose}
                    type="button"
                    className="w-full py-3 px-6 rounded-xl bg-primary text-on-primary font-semibold hover:bg-primary-container transition cursor-pointer"
                  >
                    പൂർത്തിയായി (Done)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

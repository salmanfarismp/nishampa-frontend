import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { createClient } from "@/utils/supabase/server";

const BOOK_UNIT_PRICE_INR = 290;

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Authentication required to initiate checkout" },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const quantity = Math.max(1, parseInt(body.quantity || "1", 10));

    // Amount in paise: INR 290 * 100 paise = 29000 paise per copy
    const calculatedAmountPaise = quantity * BOOK_UNIT_PRICE_INR * 100;
    const amount =
      body.amount && body.amount >= 100 ? body.amount : calculatedAmountPaise;

    if (amount < 100) {
      return NextResponse.json(
        { error: "Amount must be at least 100 paise (₹1.00)" },
        { status: 400 }
      );
    }

    const receipt = body.receipt || `rcpt_${Date.now()}_${user.id.slice(0, 6)}`;

    // Create Razorpay order
    let razorpayOrder;
    try {
      razorpayOrder = await razorpay.orders.create({
        amount: Math.round(amount),
        currency: "INR",
        receipt: receipt,
        notes: {
          user_id: user.id,
          quantity: quantity.toString(),
          item: "Panam, Adhikaram, Arogyam Book",
        },
      });
    } catch (rzpErr: unknown) {
      const err = rzpErr as Record<string, unknown>;
      console.error("Razorpay order creation error:", rzpErr);
      return NextResponse.json(
        {
          error: "Failed to create Razorpay order",
          details:
            (typeof err.message === "string" && err.message) ||
            (typeof err.description === "string" && err.description) ||
            "Unknown Razorpay error",
        },
        { status: 500 }
      );
    }

    // Insert pending Payment record in Supabase
    let paymentRecord = null;
    const { data: insertedPayment, error: paymentError } = await supabase
      .from("Payment")
      .insert({
        gateway: "online",
        gateway_order_id: razorpayOrder.id,
        amount: (amount / 100).toString(),
        status: "pending",
        raw_response: razorpayOrder,
      })
      .select()
      .single();

    if (paymentError) {
      console.warn(
        "Could not record pending payment in Supabase (continuing):",
        paymentError.message
      );
    } else {
      paymentRecord = insertedPayment;
    }

    return NextResponse.json({
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      payment_record_id: paymentRecord?.id || null,
    });
  } catch (err: unknown) {
    console.error("Unexpected error in /api/create-order:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

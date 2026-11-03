import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      quantity = 1,
      shippingAddress,
    } = body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required payment verification parameters" },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      console.error("RAZORPAY_KEY_SECRET is not configured on server");
      return NextResponse.json(
        { error: "Payment verification configuration error" },
        { status: 500 }
      );
    }

    // Verify HMAC-SHA256 signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(text)
      .digest("hex");

    const isMatch = crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "utf-8"),
      Buffer.from(razorpay_signature, "utf-8")
    );

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid payment signature. Verification failed." },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userId = user?.id || null;
    const qty = Math.max(1, parseInt(quantity, 10));
    const totalAmount = (qty * 290).toString();

    // 1. Update or create Payment record in Supabase
    let paymentId: string | null = null;

    // Try to find existing pending payment by gateway_order_id
    const { data: existingPayment } = await supabase
      .from("Payment")
      .select("id")
      .eq("gateway_order_id", razorpay_order_id)
      .maybeSingle();

    if (existingPayment) {
      paymentId = existingPayment.id;
      await supabase
        .from("Payment")
        .update({
          gateway_payment_id: razorpay_payment_id,
          gateway_signature: razorpay_signature,
          status: "paid",
          raw_response: {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          },
          updated_at: new Date().toISOString(),
        })
        .eq("id", paymentId);
    } else {
      const { data: newPayment, error: newPayErr } = await supabase
        .from("Payment")
        .insert({
          gateway: "online",
          gateway_order_id: razorpay_order_id,
          gateway_payment_id: razorpay_payment_id,
          gateway_signature: razorpay_signature,
          amount: totalAmount,
          status: "paid",
          raw_response: {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          },
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (!newPayErr && newPayment) {
        paymentId = newPayment.id;
      }
    }

    // 2. Insert Shipping Record
    let shippingId: number | null = null;
    if (shippingAddress) {
      const { data: shippingRecord, error: shippingErr } = await supabase
        .from("Shipping")
        .insert({
          address_line1: shippingAddress.address_line1 || "",
          address_line2: shippingAddress.address_line2 || null,
          city: shippingAddress.city || "",
          state: shippingAddress.state || "",
          postal_code: shippingAddress.postal_code || "",
          country: shippingAddress.country || "India",
          contact_phone:
            shippingAddress.contact_phone || shippingAddress.phone || null,
        })
        .select()
        .single();

      if (!shippingErr && shippingRecord) {
        shippingId = shippingRecord.id;
      }
    }

    // 3. Update or Upsert Profile if authenticated
    if (userId && shippingAddress) {
      await supabase
        .from("Profile")
        .update({
          name: shippingAddress.name || undefined,
          phone: shippingAddress.phone || shippingAddress.contact_phone || undefined,
          address_line1: shippingAddress.address_line1 || undefined,
          address_line2: shippingAddress.address_line2 || undefined,
          city: shippingAddress.city || undefined,
          state: shippingAddress.state || undefined,
          postal_code: shippingAddress.postal_code || undefined,
          country: shippingAddress.country || "India",
          contact_phone:
            shippingAddress.contact_phone || shippingAddress.phone || undefined,
        })
        .eq("id", userId);
    }

    // 4. Look up optional Book id
    const { data: bookRecord } = await supabase
      .from("Book")
      .select("id")
      .limit(1)
      .maybeSingle();

    // 5. Insert Order Record
    const { data: orderRecord, error: orderErr } = await supabase
      .from("Order")
      .insert({
        payment: paymentId,
        status: "new",
        fulfillment: "active",
        shipping: shippingId,
        total_amount: totalAmount,
        profile_id: userId,
      })
      .select()
      .single();

    if (orderErr) {
      console.error("Error creating Order record in Supabase:", orderErr);
    }

    // 6. Insert OrderItem Record
    if (orderRecord) {
      const { error: itemErr } = await supabase.from("OrderItem").insert({
        order_id: orderRecord.id,
        quantity: qty,
        product_title_snapshot: "Panam, Adhikaram, Arogyam (പുസ്തകം)",
        unit_price_snapshot: "290",
        total_price: qty * 290,
        book: bookRecord?.id || null,
      });

      if (itemErr) {
        console.error("Error creating OrderItem record in Supabase:", itemErr);
      }
    }

    return NextResponse.json({
      success: true,
      order_id: orderRecord?.id || razorpay_order_id,
      razorpay_order_id,
      payment_id: razorpay_payment_id,
    });
  } catch (err: unknown) {
    console.error("Unexpected error in /api/verify-payment:", err);
    return NextResponse.json(
      { error: "Internal verification error" },
      { status: 500 }
    );
  }
}

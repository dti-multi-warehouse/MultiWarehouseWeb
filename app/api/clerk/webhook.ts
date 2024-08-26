// pages/api/clerk/webhook.ts

import { WebhookEvent } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const event: WebhookEvent = req.body;

    if (event.type === "user.created" || event.type === "user.updated") {
      const email = event.data.email_addresses[0]?.email_address;

      if (email) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/save-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        console.log("Received Clerk webhook event:", event);


        if (!response.ok) {
          console.error("Failed to save email to backend", response.statusText);
          res.status(500).json({ error: "Failed to save email to backend" });
          return;
        }
      }
    }

    res.status(200).json({ message: "Webhook received" });
  } catch (error) {
    console.error("Error in Clerk webhook handler", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

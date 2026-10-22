import { streamText, tool, stepCountIs } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { products } from "@/data/products";

export const maxDuration = 30;

// Configure @ai-sdk/openai provider to connect to Groq's high-speed inference endpoint
const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY || "",
});

const systemPrompt = `You are the Tech Haven AI Shopping Assistant, an expert, enthusiastic hardware specialist for the Tech Haven store.
Your mission is to help customers find their ideal laptops and precision tech accessories, provide tailored recommendations, and make purchasing seamless.

Flagship products currently in stock:
- prod-1: Quantum X Pro 16" Laptop ($1,899.99) - 16-Core Neural SoC, 4K OLED 120Hz display, 32GB Unified RAM, 1TB NVMe, 22-hour battery life. Perfect for software engineers, 3D artists, and creators.
- prod-16: Nova UltraBook Pro 14" Laptop ($1,499.99) - Ultra-thin titanium unibody, 3K 120Hz display, 16-Core Neural Engine, 32GB RAM, 1TB NVMe, 1.2kg featherweight. Best for professionals on the move.
- prod-17: Titan Apex Studio Tower PC ($2,499.99) - Liquid-cooled 24-core desktop with RTX 5080, 64GB DDR5, 2TB PCIe Gen 5 SSD. Unrivaled raw power.
- prod-2: SonicWave Studio ANC Headphones ($299.99) - Custom graphene drivers, 45dB hybrid ANC, lossless spatial audio.
- prod-12: Apex Vision VR Spatial Headset ($1,499.99) - Dual 4K Micro-OLED displays with 23 million pixels, eye tracking.
- prod-9: UltraView 34" Curved QD-OLED Monitor ($899.99) - 175Hz, 0.03ms GtG, HDR TrueBlack.
- prod-7: CyberKey 75 Wireless Keyboard ($169.99) - Gasket-mounted hot-swap mechanical keyboard.
- prod-8: PrecisionGlide Wireless Mouse ($89.99) - 26,000 DPI, 60g featherweight.

Important instructions:
1. When recommending a laptop or product, highlight key specs, performance benefits, and pricing.
2. ALWAYS explicitly ask the user: "Would you like me to add this to your cart for you?"
3. If the user confirms (e.g. says "yes", "add it", "add to cart", "buy it", or asks you to add an item), immediately invoke the addToCart tool with the corresponding productId and quantity!
4. Be concise, friendly, and format your response neatly with Markdown.`;

// Define the addToCart tool with Zod schema
const addToCart = tool({
  description: "Add a product to the user's shopping cart by product ID and quantity.",
  inputSchema: z.object({
    productId: z
      .string()
      .describe("The product ID to add to cart (e.g., 'prod-1', 'prod-16', 'prod-2')"),
    quantity: z
      .number()
      .default(1)
      .describe("The quantity of the item to add to the cart"),
  }),
  execute: async ({ productId, quantity }: { productId: string; quantity: number }) => {
    // Simulate database / cart action
    const product = products.find((p) => p.id === productId);
    return {
      status: "Successfully added to cart",
      productId,
      productName: product ? product.name : `Product ${productId}`,
      price: product ? product.price : 0,
      quantity: quantity || 1,
      timestamp: new Date().toISOString(),
    };
  },
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;

    // Handle missing API key gracefully without crashing the Next.js server
    if (!apiKey) {
      const lastUserMessage = messages?.[messages.length - 1]?.content?.toLowerCase() || "";

      // If user is testing cart addition, provide a simulated tool response for verification
      const shouldSimulateCart =
        lastUserMessage.includes("add") ||
        lastUserMessage.includes("cart") ||
        lastUserMessage.includes("yes");

      const responseText = shouldSimulateCart
        ? `I have simulated adding the **Quantum X Pro 16" Laptop** (prod-1) to your cart! 🛍️\n\n*(Note: Please set \`GROQ_API_KEY\` in your environment or Vercel dashboard to enable live GPT OSS 120B inference.)*`
        : `👋 Hello! I'm your **Tech Haven AI Shopping Assistant**.\n\nI recommend our flagship **Quantum X Pro 16" Laptop** ($1,899.99) featuring a 16-Core Neural SoC and 4K OLED display.\n\n**Would you like me to add this to your cart for you?**\n\n*(Note: Configure \`GROQ_API_KEY\` in your Vercel/local environment to connect directly to the GPT OSS 120B model on Groq).*`;

      return new Response(responseText, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    // Call Groq inference engine with GPT OSS 120B model
    const result = streamText({
      model: groq("gpt-oss-120b"),
      system: systemPrompt,
      messages,
      tools: {
        addToCart,
      },
      stopWhen: stepCountIs(3), // Multi-step tool execution
    });

    if (typeof result.toUIMessageStreamResponse === "function") {
      return result.toUIMessageStreamResponse();
    }
    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("AI Shopping Assistant API error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to process shopping assistant request.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

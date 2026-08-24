import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { createAccountDeletionRequest } from "../db";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) return port;
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const apiWindows = new Map<string, { count: number; resetAt: number }>();
  app.use("/api/trpc", (req, res, next) => {
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const current = apiWindows.get(key);
    const windowState = !current || current.resetAt <= now ? { count: 0, resetAt: now + 5 * 60 * 1000 } : current;
    windowState.count += 1;
    apiWindows.set(key, windowState);
    if (windowState.count > 120) {
      res.status(429).json({ error: "Too many requests. Please try again shortly." });
      return;
    }
    next();
  });
  app.disable("x-powered-by");
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' data: https://d36hbw14aib5lz.cloudfront.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https:");
    next();
  });
  const server = createServer(app);
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  const privacyContact = process.env.HANA_PRIVACY_CONTACT || "the support contact listed in the HANA app and Google Play listing";
  const page = (title: string, body: string) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} · HANA</title><style>body{margin:0;background:#fbf7f1;color:#3a3540;font:16px/1.6 system-ui,sans-serif}main{max-width:720px;margin:0 auto;padding:32px 20px 64px}h1,h2{line-height:1.15}h1{font-size:36px}h2{margin-top:32px;font-size:22px}a{color:#62566a}label{display:block;font-weight:700;margin:16px 0 6px}input{box-sizing:border-box;width:100%;border:1px solid #d9cec4;border-radius:12px;padding:12px;font:inherit}button{margin-top:16px;border:0;border-radius:12px;background:#3a3540;color:white;padding:12px 16px;font:inherit;font-weight:700}</style></head><body><main>${body}</main></body></html>`;
  const privacyBody = [
    "<h1>HANA Privacy Policy</h1>",
    "<p><strong>Last updated: August 25, 2026.</strong></p>",
    "<p>HANA is an AI learning and career companion operated by Ismat Fida. This policy explains what HANA stores, why it is used, and how you can control it.</p>",
    "<h2>Information HANA stores</h2><p>HANA may store your account identifier, name and email, university and degree details, semester and subjects, chosen career, learning journey, completed steps, mastery answers, projects, portfolio entries, competitions, notes, saved links, preferences, and learning history. If you use chat or file analysis, HANA may store conversation messages and the files or text you choose to submit, subject to the controls in the app.</p>",
    "<h2>How HANA uses it</h2><p>HANA uses this information to restore your account across devices, personalise journeys and missions, save progress, answer questions, and provide project and career guidance. HANA does not treat an AI response as a guarantee or professional advice.</p>",
    "<h2>Service providers</h2><p>Depending on the enabled production configuration, data may be processed by authentication, database, storage, hosting, analytics, and AI providers used to operate HANA, including Manus, OpenAI, Google Gemini, and managed database or storage services. HANA should send only the information needed for the requested feature. Review each provider’s current privacy terms before enabling it for production personal data.</p>",
    "<h2>Choices and deletion</h2><p>You can pause cloud memory, clear saved memory, delete chat history where available, and request deletion of your account and associated HANA data. Use <a href=\"/delete-account\">the deletion request page</a> if you cannot sign in. Account deletion does not delete a separate Google account used for sign-in.</p>",
    "<h2>Security and retention</h2><p>HANA uses HTTPS, account-scoped server procedures, and protected session cookies. Data is retained only while needed to provide HANA, comply with law, resolve security issues, or process a deletion request. The exact retention periods and provider terms must be confirmed for the final production configuration.</p>",
    `<h2>Contact</h2><p>For privacy questions or requests, contact ${privacyContact}.</p><p><a href="/delete-account">Request account deletion</a></p>`,
  ].join("");
  const termsBody = [
    "<h1>HANA Terms of Use</h1>",
    "<p><strong>Last updated: August 25, 2026.</strong></p>",
    "<p>These terms govern use of HANA, an AI learning and career companion operated by Ismat Fida. By using HANA, you agree to use it lawfully and responsibly.</p>",
    "<h2>What HANA provides</h2><p>HANA provides learning organisation, career exploration, project guidance, and AI-generated explanations. HANA is not a university, employer, recruiter, financial adviser, lawyer, or substitute for a qualified teacher or professional.</p>",
    "<h2>AI limitations</h2><p>AI responses may be incomplete or wrong. Check important information with trusted sources. Do not use HANA to make safety-critical, medical, legal, financial, or employment decisions without qualified human review. Do not submit passwords, API keys, private keys, confidential records, or personal data that HANA does not need.</p>",
    "<h2>Your content</h2><p>You remain responsible for the code, text, files, links, and other material you submit. You confirm that you have the right to submit it and that it does not violate another person’s rights or the law.</p>",
    "<h2>External services and links</h2><p>HANA may use authentication, hosting, storage, analytics, AI, and external learning services. External links are provided for convenience and are governed by their own terms. Availability and content can change.</p>",
    "<h2>Account and termination</h2><p>Keep your account access secure. You may delete your HANA account through the app or the public deletion page. We may restrict access when needed to prevent abuse, protect security, or comply with law.</p>",
    `<h2>Contact</h2><p>Questions about these terms can be sent to ${privacyContact}.</p><p><a href="/privacy">Privacy Policy</a> · <a href="/delete-account">Delete account</a></p>`,
  ].join("");
  app.get("/privacy", (_req, res) => res.type("html").send(page("Privacy Policy", privacyBody)));
  app.get("/terms", (_req, res) => res.type("html").send(page("Terms of Use", termsBody)));
  app.get("/delete-account", (_req, res) => res.type("html").send(page("Delete HANA account", "<h1>Delete your HANA account</h1><p>Use this page if you cannot access the app. Submit the email address connected to your HANA account. We will use it to verify ownership and process deletion of HANA account data.</p><p>Do not submit a password, OAuth code, API key, private key, or other secret.</p><form method=\"post\" action=\"/delete-account\"><label for=\"email\">Account email</label><input id=\"email\" name=\"email\" type=\"email\" autocomplete=\"email\" required maxlength=\"320\"><button type=\"submit\">Request deletion</button></form><p><a href=\"/privacy\">Read the Privacy Policy</a></p>")));
  app.post("/delete-account", async (req, res) => {
    const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) {
      res.status(400).type("html").send(page("Invalid request", "<h1>Check your email</h1><p>Please enter a valid account email.</p><p><a href=\"/delete-account\">Try again</a></p>"));
      return;
    }
    try {
      await createAccountDeletionRequest(email);
      res.type("html").send(page("Request received", `<h1>Request received</h1><p>We received your deletion request. We will verify account ownership before deleting the HANA account and associated data.</p><p>For help, contact ${privacyContact}.</p><p><a href="/privacy">Back to Privacy Policy</a></p>`));
    } catch (error) {
      console.error("[Privacy] Failed to record deletion request", error);
      res.status(503).type("html").send(page("Request unavailable", "<h1>Please try again later</h1><p>We could not record the request right now. Do not send passwords or secrets.</p>"));
    }
  });

  registerStorageProxy(app);
  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) console.log(`Port ${preferredPort} is busy, using port ${port}`);
  server.listen(port, () => console.log(`Server running on http://localhost:${port}/`));
}

startServer().catch(console.error);

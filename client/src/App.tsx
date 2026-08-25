import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

const Home = lazy(() => import("./pages/Home"));

function HanaLoadingShell() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#FBF7F1] px-6 text-[#3A3540]">
      <section className="w-full max-w-sm text-center" aria-live="polite" aria-busy="true">
        <p className="font-display text-2xl tracking-[.12em]">HANA<span className="text-[#C98C93]">.</span></p>
        <p className="mt-3 text-sm text-[#746B72]">Hana is getting ready…</p>
        <div className="mx-auto mt-5 h-1.5 w-36 overflow-hidden rounded-full bg-[#E5E5F0]">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-[#C98C93]" />
        </div>
      </section>
    </main>
  );
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"}>
        <Suspense fallback={<HanaLoadingShell />}>
          <Home />
        </Suspense>
      </Route>
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

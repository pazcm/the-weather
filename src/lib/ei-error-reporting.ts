// type EiErrorOptions = {
//   mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
//   handled?: boolean;
//   severity?: "error" | "warning" | "info";
// };

// type EiEvents = {
//   track?: (event: string, properties?: Record<string, unknown>) => string | null;
//   captureException?: (
//     error: unknown,
//     context?: Record<string, unknown>,
//     options?: EiErrorOptions,
//   ) => void;
// };

// declare global {
//   interface Window {
//     __EiEvents?: EiEvents;
//     __EiReportRuntimeError?: (payload: {
//       message: string;
//       stack?: string;
//       filename?: string;
//     }) => void;
//   }
// }

// export function reportEiError(error: unknown, context: Record<string, unknown> = {}) {
//   if (typeof window === "undefined") return;
//   window.__eiEvents?.captureException?.(
//     error,
//     {
//       source: "react_error_boundary",
//       route: window.location.pathname,
//       ...context,
//     },
//     {
//       mechanism: "react_error_boundary",
//       handled: false,
//       severity: "error",
//     },
//   );
  
//   const message =
//     error instanceof Response
//       ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
//       : error instanceof Error
//         ? error.message
//         : String(error);
//   const stack = error instanceof Error ? error.stack : undefined;
//   window.__eiReportRuntimeError?.({
//     message,
//     ...(stack !== undefined && { stack }),
//     filename: window.location.pathname,
//   });
// }

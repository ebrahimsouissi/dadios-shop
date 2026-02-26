/**
 * Cloudflare Worker - CORS Proxy for Google Apps Script
 * 
 * Proxies requests to:
 * https://script.google.com/macros/s/AKfycbwRtuAc7O3zL66ZuZGXXf0dpPghJ_h7-b6G3UrRGq2zGgIofFGfB3lyoSQOIxdoSNbnwA/exec
 * 
 * Adds CORS headers for: https://dadiosfragrance.com
 */

const TARGET_URL = "https://script.google.com/macros/s/AKfycbwRtuAc7O3zL66ZuZGXXf0dpPghJ_h7-b6G3UrRGq2zGgIofFGfB3lyoSQOIxdoSNbnwA/exec";
const ALLOWED_ORIGIN = "https://dadiosfragrance.com";

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // Clone the request to modify it
    const clonedReq = request.clone();
    
    // Get the request body for POST requests
    let body = null;
    if (request.method === "POST") {
      try {
        body = await request.formData();
      } catch (e) {
        body = await request.text();
      }
    }

    // Build the fetch options
    const fetchOptions = {
      method: request.method,
      redirect: "follow",
    };

    // Add body for POST requests
    if (body && (request.method === "POST" || request.method === "GET")) {
      if (body instanceof FormData) {
        fetchOptions.body = body;
      } else if (typeof body === "string" && body) {
        fetchOptions.body = body;
        fetchOptions.headers = {
          "Content-Type": "application/x-www-form-urlencoded",
        };
      }
    }

    try {
      // Make the request to Google Apps Script
      const response = await fetch(TARGET_URL, fetchOptions);
      
      // Get response text
      const responseText = await response.text();
      
      // Get response headers
      const responseHeaders = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      // Create new response with CORS headers
      return new Response(responseText, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          ...responseHeaders,
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Content-Type": "application/json; charset=utf-8",
        },
      });
    } catch (error) {
      // Handle errors
      return new Response(JSON.stringify({ 
        ok: false, 
        error: error.message || "Proxy error" 
      }), {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
          "Content-Type": "application/json",
        },
      });
    }
  },
};

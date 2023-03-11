import React from "react";
import { useState } from "react";

export async function getBearerToken() {
  console.log("API Key --> " + import.meta.env.VITE_API_KEY);
  const response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
    body: `grant_type=client_credentials&client_id=${
      import.meta.env.VITE_API_KEY
    }&client_secret=${import.meta.env.VITE_API_SECRET}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  const data = await response.json();
  // console.log("Response --> " + data["token_type"]);
  // console.log("Bearer Token --> " + data["access_token"]);
  return data["access_token"];
}

export async function search(type: any, size: any) {
  let bearerToken = localStorage.getItem("BearerToken");
  const response = await fetch(
    `https://api.petfinder.com/v2/animals?type=${type}&size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "GET",
    }
  );
  const data = await response.json();
  console.log("Response --> " + data);
  return data;
}

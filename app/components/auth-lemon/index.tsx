"use client";
import { useState, useEffect } from "react";
import {
  authenticate,
  deposit,
  isWebView,
  TransactionResult,
} from "@lemoncash/mini-app-sdk";

export const AuthMiniApp = () => {
  const [wallet, setWallet] = useState<string | undefined>(undefined);
  if (isWebView()) {
      return ()

  }

};

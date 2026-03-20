"use client";

import { createContext, useContext } from "react";

export const PrintContext = createContext(false);
export const usePrintMode = () => useContext(PrintContext);

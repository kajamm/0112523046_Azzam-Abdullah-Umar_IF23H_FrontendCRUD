"use client";

import { useEffect } from "react";
import { getMahasiswa } from "@/lib/api";

export default function MahasiswaPage() {
  useEffect(() => {
    async function loadData() {
      const data = await getMahasiswa();
      console.log(data);
    }

    loadData();
  }, []);

  return <h1>Testing API Backend</h1>;
}
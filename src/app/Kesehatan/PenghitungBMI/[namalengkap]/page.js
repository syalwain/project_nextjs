"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { hitungBMI } from "@/lib/bmi";

export default function Page() {
  const params = useParams();
  const nama = decodeURIComponent(params.namalengkap).replaceAll("-", " ");

  const [berat, setBerat] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [hasil, setHasil] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setHasil(hitungBMI(Number.parseFloat(berat), Number.parseFloat(tinggi)));
  }

  function handleReset() {
    setBerat("");
    setTinggi("");
    setHasil(null);
  }

  return (
    <main style={{ maxWidth: 360, margin: "40px auto", padding: "0 16px" }}>
      <h1>Halo, {nama}</h1>
      <p>Silakan masukkan berat badan dan tinggi kamu!</p>

      <p>
        <Link href="/">Bukan kamu? Ganti nama</Link>
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 12, marginTop: 16 }}
      >
        <label>
          <span>Berat (kg)</span>
          <input
            type="number"
            step="any"
            min="1"
            value={berat}
            onChange={(e) => setBerat(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: 6 }}
          />
        </label>

        <label>
          <span>Tinggi (cm)</span>
          <input
            type="number"
            step="any"
            min="1"
            value={tinggi}
            onChange={(e) => setTinggi(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: 6 }}
          />
        </label>

        <button type="submit" style={{ padding: 8 }}>
          Hitung
        </button>
        <button type="button" onClick={handleReset} style={{ padding: 8 }}>
          Reset
        </button>
      </form>

      {hasil && (
        <p style={{ marginTop: 16 }}>
          BMI kamu:{" "}
          <strong style={{ color: hasil.warna }}>{hasil.bmi}</strong>{" "}
          <span style={{ color: hasil.warna }}>({hasil.kategori})</span>
        </p>
      )}
    </main>
  );
}
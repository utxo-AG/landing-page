"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "submitting" | "success" | "error";

export default function CallbackForm() {
  const t = useTranslations("CallbackForm");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "");
    formData.append("subject", "Rückruf-Anfrage von utxoag.com");
    formData.append("from_name", "utxoag.com Rückruf-Formular");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-[#eee] rounded-2xl p-8 text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#111] flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4,10 8,14 16,6" />
          </svg>
        </div>
        <p className="text-[15px] text-[#333] leading-[1.6]">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field name="name" label={t("name")} placeholder={t("namePlaceholder")} required />
        <Field name="company" label={t("company")} placeholder={t("companyPlaceholder")} />
        <Field name="phone" label={t("phone")} placeholder={t("phonePlaceholder")} type="tel" required />
        <Field name="email" label={t("email")} placeholder={t("emailPlaceholder")} type="email" required />
      </div>
      <Field name="preferredTime" label={t("preferredTime")} placeholder={t("preferredTimePlaceholder")} />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-[#111] text-white text-[14px] font-medium px-6 py-3 rounded-full hover:bg-[#333] transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
      {status === "error" && (
        <p className="text-[13px] text-[#c33] text-center mt-2">{t("error")}</p>
      )}
    </form>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[12px] font-mono uppercase tracking-[0.08em] text-[#999] mb-1.5">
        {label}
        {required && <span className="text-[#c33] ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full bg-white border border-[#e5e5e5] rounded-xl px-4 py-2.5 text-[14px] text-[#333] placeholder-[#bbb] focus:outline-none focus:border-[#111] transition-colors"
      />
    </div>
  );
}

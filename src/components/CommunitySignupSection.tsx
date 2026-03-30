"use client";

import React, { useState } from "react";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import AnimatedText from "@/components/AnimatedText";

/*
|------------------------------------------------------------------------------
| $community-signup:props
|------------------------------------------------------------------------------
| Simple, stylable sign-up form section with a decorative illustration.
|
| heading       : main title text (left)
| subheading    : subtitle text (left)
| onSubmitAction: optional async submit handler
| className     : wrapper classes override
| bgClass       : background color class
| textClass     : text color class
|------------------------------------------------------------------------------
*/
type CommunitySignupSectionProps = {
    heading?: string;
    subheading?: string;
    onSubmitAction?: (form: FormData) => void | Promise<void>;
    className?: string;
    bgClass?: string;
    textClass?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-(). ]{5,19}$/;

/*
|------------------------------------------------------------------------------
| $community-signup:component
|------------------------------------------------------------------------------
| Main React component for the "Be Part of a Thriving Community" section.
|------------------------------------------------------------------------------
*/
export default function CommunitySignupSection(
    {
        heading = "Be Part of a Thriving Community",
        subheading = "Sign Up Today!",
        onSubmitAction,
        className = "",
        bgClass = "bg-blush",
        textClass = "text-burgundy",
    }: CommunitySignupSectionProps) {

    const {t} = useTranslation();

    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    /*
    |------------------------------------------------------------------------------
    | $form:validate
    |------------------------------------------------------------------------------
    | Returns a map of field name → error message for any invalid fields.
    | Sanitizes values by trimming whitespace before checking.
    */
    const validate = (form: HTMLFormElement): Record<string, string> => {
        const errors: Record<string, string> = {};
        const required = t("signup.form.errors.required");

        const firstName = (form.elements.namedItem("firstName") as HTMLInputElement).value.trim();
        const surname   = (form.elements.namedItem("surname")   as HTMLInputElement).value.trim();
        const email     = (form.elements.namedItem("email")     as HTMLInputElement).value.trim();
        const phone     = (form.elements.namedItem("phone")     as HTMLInputElement).value.trim();
        const reqType   = (form.elements.namedItem("requestType") as HTMLSelectElement).value;

        if (!firstName) errors.firstName   = required;
        if (!surname)   errors.surname     = required;

        if (!email) {
            errors.email = required;
        } else if (!EMAIL_RE.test(email)) {
            errors.email = t("signup.form.errors.email");
        }

        if (phone && !PHONE_RE.test(phone)) {
            errors.phone = t("signup.form.errors.phone");
        }

        if (!reqType) errors.requestType = required;

        return errors;
    };

    /*
    |------------------------------------------------------------------------------
    | $form:handle-submit
    |------------------------------------------------------------------------------
    | Validates inputs, calls the optional onSubmitAction handler, and manages
    | loading / success / error states.
    */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        const errors = validate(form);
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setFieldErrors({});
        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);

        // Trim all text inputs before building FormData
        const fd = new FormData(form);
        for (const [key, value] of Array.from(fd.entries())) {
            if (typeof value === "string") fd.set(key, value.trim());
        }

        try {
            await onSubmitAction?.(fd);
            setIsSuccess(true);
            form.reset();
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    /*
    |------------------------------------------------------------------------------
    | $helpers
    |------------------------------------------------------------------------------
    */
    const inputClass = (field: string) =>
        `w-full bg-transparent border-0 border-b py-1 focus:outline-none transition-colors ${
            fieldErrors[field]
                ? "border-red-500 focus:border-red-600"
                : "border-burgundy/40 focus:border-burgundy"
        }`;

    return (
        <section id="register" className={`w-full ${bgClass} ${textClass} py-12 md:py-16 ${className} border-t-2 border-[#f4e8d5]`}>
            <div className="container-x">
                <div className="flex flex-col md:flex-row items-start justify-between gap-10">
                    {/* Left: Heading + Form */}
                    <AnimatedText delay={0.1} direction="up" duration={0.8}>
                        <div className="w-full lg:w-auto lg:flex-1">
                            <h2 className="font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl">
                                {heading}
                            </h2>
                            <p className="mt-2 text-xl sm:text-2xl opacity-90">{subheading}</p>

                            <form onSubmit={handleSubmit} noValidate className="mt-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
                                    {/* First Name */}
                                    <div>
                                        <label className="block text-sm mb-2 font-kanun">{t("signup.form.firstName.label")}</label>
                                        <input type="text" name="firstName" className={inputClass("firstName")} aria-required="true" aria-describedby={fieldErrors.firstName ? "err-firstName" : undefined}/>
                                        {fieldErrors.firstName && <p id="err-firstName" className="mt-1 text-xs text-red-600">{fieldErrors.firstName}</p>}
                                    </div>

                                    {/* Surname */}
                                    <div>
                                        <label className="block text-sm mb-2 font-kanun">{t("signup.form.surname.label")}</label>
                                        <input type="text" name="surname" className={inputClass("surname")} aria-required="true" aria-describedby={fieldErrors.surname ? "err-surname" : undefined}/>
                                        {fieldErrors.surname && <p id="err-surname" className="mt-1 text-xs text-red-600">{fieldErrors.surname}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm mb-2 font-kanun">{t("signup.form.email.label")}</label>
                                        <input type="email" name="email" className={inputClass("email")} aria-required="true" aria-describedby={fieldErrors.email ? "err-email" : undefined}/>
                                        {fieldErrors.email && <p id="err-email" className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
                                    </div>

                                    {/* Phone Number */}
                                    <div>
                                        <label className="block text-sm mb-2 font-kanun">{t("signup.form.phone.label")}</label>
                                        <input type="tel" name="phone" className={inputClass("phone")} aria-describedby={fieldErrors.phone ? "err-phone" : undefined}/>
                                        {fieldErrors.phone && <p id="err-phone" className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>}
                                    </div>

                                    {/* Request Type */}
                                    <div>
                                        <label className="block text-sm mb-2 font-kanun">{t("signup.form.requestType.label")}</label>
                                        <div className="relative">
                                            <select name="requestType" className={`appearance-none pr-6 ${inputClass("requestType")}`} defaultValue="" aria-required="true" aria-describedby={fieldErrors.requestType ? "err-requestType" : undefined}>
                                                <option value="" disabled>
                                                    {t("signup.form.requestType.options.0")}
                                                </option>
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <option key={i} value={t(`signup.form.requestType.options.${i}`)}>
                                                        {t(`signup.form.requestType.options.${i}`)}
                                                    </option>
                                                ))}
                                            </select>
                                            <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-sm"></span>
                                        </div>
                                        {fieldErrors.requestType && <p id="err-requestType" className="mt-1 text-xs text-red-600">{fieldErrors.requestType}</p>}
                                    </div>

                                    {/* Subject */}
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm mb-2 font-kanun">{t("signup.form.subject.label")}</label>
                                        <input type="text" name="subject" className={inputClass("subject")}/>
                                    </div>
                                </div>

                                {/* Success / Error banners */}
                                {isSuccess && (
                                    <p role="status" className="mt-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
                                        {t("signup.form.success")}
                                    </p>
                                )}
                                {isError && (
                                    <p role="alert" className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
                                        {t("signup.form.error")}
                                    </p>
                                )}

                                {/* Send button */}
                                <div className="mt-6 text-end">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="inline-flex items-center justify-center rounded-full border border-burgundy/60 px-5 py-1.5 text-sm hover:bg-burgundy/5 transition kanun disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? t("signup.form.send.sending") : t("signup.form.send.label")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </AnimatedText>

                    {/* Right: Decorative blobs */}
                    <AnimatedText delay={0.2} direction="up" duration={0.8}>
                        <div className="relative hidden lg:flex md:flex-1 justify-center items-center">
                            <Image src="/icons/ml_Icon_32.png" alt="Community signup icon" height="500" width="500" className="object-contain image-hover" loading="lazy"/>
                        </div>
                    </AnimatedText>
                </div>
            </div>
        </section>
    );
}

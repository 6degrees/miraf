"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import AnimatedText from "@/components/AnimatedText";

/*
|------------------------------------------------------------------------------
| $community-signup:props
|------------------------------------------------------------------------------
| Simple, stylable sign-up form section with a decorative illustration.
|
| heading       : main title text (left)
| subheading    : subtitle text (left)
| className     : wrapper classes override
| bgClass       : background color class
| textClass     : text color class
|------------------------------------------------------------------------------
*/
type CommunitySignupSectionProps = {
    heading?: string;
    subheading?: string;
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
        className = "",
        bgClass = "bg-blush",
        textClass = "text-burgundy",
    }: CommunitySignupSectionProps) {
    const { t } = useTranslation();

    // State to manage default country code
    const [countryCode, setCountryCode] = useState("+966");

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

        const firstName = (form.elements.namedItem("inp_1") as HTMLInputElement).value.trim();
        const surname   = (form.elements.namedItem("inp_2") as HTMLInputElement).value.trim();
        const email     = (form.elements.namedItem("inp_3") as HTMLInputElement).value.trim();
        const phone     = (form.elements.namedItem("inp_15") as HTMLInputElement).value.trim();
        const reqType   = (form.elements.namedItem("inp_9143") as HTMLSelectElement).value;

        if (!firstName) errors.inp_1 = required;
        if (!surname)   errors.inp_2 = required;

        if (!email) {
            errors.inp_3 = required;
        } else if (!EMAIL_RE.test(email)) {
            errors.inp_3 = t("signup.form.errors.email");
        }

        if (phone && !PHONE_RE.test(phone)) {
            errors.inp_15 = t("signup.form.errors.phone");
        }

        if (!reqType) errors.inp_9143 = required;

        return errors;
    };

    /*
    |------------------------------------------------------------------------------
    | handleSubmit
    |------------------------------------------------------------------------------
    | Handles the form submission process.
    |
    | Steps:
    | 1. Validate inputs client-side
    | 2. Collect all form input values using FormData API
    | 3. Combine country code with phone number
    | 4. Add hidden fields required by Emarsys (CID, campaign params, opt-in, etc.)
    | 5. Convert FormData to URLSearchParams
    | 6. Send data to Emarsys endpoint via GET request
    | 7. Reset form and country code on success
    |
    | Note: Uses 'no-cors' mode due to browser restrictions. Response cannot be read.
    |------------------------------------------------------------------------------
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

        const formData = new FormData(form);

        // Append country code to phone number
        const phone = formData.get("inp_15");
        if (phone && typeof phone === "string") formData.set("inp_15", `${countryCode}${phone}`);

        // Add hidden Emarsys fields
        formData.set("CID", "788929414");
        formData.set("f", "1069");
        formData.set("p", "2");
        formData.set("a", "r");
        formData.set("inp_9142", countryCode);
        formData.set("inp_9144", "26");
        formData.set("inp_9145", "16");
        formData.set("optin", "y");

        // Convert all fields to URL parameters
        const params = new URLSearchParams();
        formData.forEach((value, key) => params.append(key, value.toString()));

        try {
            // Send GET request to Emarsys
            await fetch(`https://link.by.refad.com.sa/u/register.php?${params.toString()}`, {
                method: "GET",
                mode: "no-cors",
            });

            setIsSuccess(true);
            form.reset();
            setCountryCode("+966");
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
                    {/* Left Column: Heading and Form */}
                    <AnimatedText delay={0.1} direction="up" duration={0.8}>
                        <div className="w-full lg:w-auto lg:flex-1">
                            {/* Section Heading */}
                            <h2 className="font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl">{heading}</h2>

                            {/* Section Subheading */}
                            <p className="mt-2 text-xl sm:text-2xl opacity-90">{subheading}</p>

                            {/* Sign-up Form */}
                            <form onSubmit={handleSubmit} noValidate className="mt-8">
                                {/* Hidden Fields for Emarsys */}
                                <input type="hidden" name="CID" value="788929414" />
                                <input type="hidden" name="f" value="1069" />
                                <input type="hidden" name="p" value="2" />
                                <input type="hidden" name="a" value="r" />
                                <input type="hidden" name="inp_9142" value={countryCode} />
                                <input type="hidden" name="inp_9144" value="26" />
                                <input type="hidden" name="inp_9145" value="16" />
                                <input type="hidden" name="optin" value="y" />

                                {/* Form Fields Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
                                    {/* First Name */}
                                    <div>
                                        <label className="block text-sm mb-2 font-kanun">{t("signup.form.firstName.label")}</label>
                                        <input type="text" name="inp_1" className={inputClass("inp_1")} aria-required="true" aria-describedby={fieldErrors.inp_1 ? "err-firstName" : undefined}/>
                                        {fieldErrors.inp_1 && <p id="err-firstName" className="mt-1 text-xs text-red-600">{fieldErrors.inp_1}</p>}
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label className="block text-sm mb-2 font-kanun">{t("signup.form.surname.label")}</label>
                                        <input type="text" name="inp_2" className={inputClass("inp_2")} aria-required="true" aria-describedby={fieldErrors.inp_2 ? "err-surname" : undefined}/>
                                        {fieldErrors.inp_2 && <p id="err-surname" className="mt-1 text-xs text-red-600">{fieldErrors.inp_2}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm mb-2 font-kanun">{t("signup.form.email.label")}</label>
                                        <input type="email" name="inp_3" className={inputClass("inp_3")} aria-required="true" aria-describedby={fieldErrors.inp_3 ? "err-email" : undefined}/>
                                        {fieldErrors.inp_3 && <p id="err-email" className="mt-1 text-xs text-red-600">{fieldErrors.inp_3}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm mb-2 font-kanun">{t("signup.form.phone.label")}</label>
                                        <input type="tel" name="inp_15" className={inputClass("inp_15")} aria-describedby={fieldErrors.inp_15 ? "err-phone" : undefined}/>
                                        {fieldErrors.inp_15 && <p id="err-phone" className="mt-1 text-xs text-red-600">{fieldErrors.inp_15}</p>}
                                    </div>

                                    {/* Request Type */}
                                    <div>
                                        <label className="block text-sm mb-2 font-kanun">{t("signup.form.requestType.label")}</label>
                                        <select name="inp_9143" className={`appearance-none pr-6 ${inputClass("inp_9143")}`} defaultValue="" aria-required="true" aria-describedby={fieldErrors.inp_9143 ? "err-requestType" : undefined}>
                                            <option value="" disabled>{t("signup.form.requestType.options.0")}</option>
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <option key={i} value={t(`signup.form.requestType.options.${i}`)}>
                                                    {t(`signup.form.requestType.options.${i}`)}
                                                </option>
                                            ))}
                                        </select>
                                        {fieldErrors.inp_9143 && <p id="err-requestType" className="mt-1 text-xs text-red-600">{fieldErrors.inp_9143}</p>}
                                    </div>

                                    {/* Subject */}
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm mb-2 font-kanun">{t("signup.form.subject.label")}</label>
                                        <input type="text" name="inp_9141" className={inputClass("inp_9141")}/>
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

                                {/* Submit Button */}
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

                    {/* Right Column: Decorative Image */}
                    <AnimatedText delay={0.2} direction="up" duration={0.8}>
                        <div className="relative hidden lg:flex md:flex-1 justify-center items-center">
                            <Image src="/icons/ml_Icon_32.png" alt="Community signup icon" height={500} width={500} className="object-contain image-hover" loading="lazy" />
                        </div>
                    </AnimatedText>
                </div>
            </div>
        </section>
    );
}

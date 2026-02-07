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
| onSubmit      : optional submit handler
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

/*
|------------------------------------------------------------------------------
| $community-signup:component
|------------------------------------------------------------------------------
| Main React component for the "Be Part of a Thriving Community" section.
|------------------------------------------------------------------------------
|
| - Renders a responsive layout with two columns:
|     • Left: heading text and a sign-up form
|     • Right: decorative abstract SVG shapes
| - Uses TailwindCSS utilities for spacing, alignment, and responsiveness
| - Customizable via props for heading, subheading, colors, and handlers
| - Ideal for contact or marketing signup sections on landing pages
|
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

    /*
    |------------------------------------------------------------------------------
    | handleSubmit
    |------------------------------------------------------------------------------
    | Handles the form submission process.
    |
    | Steps:
    | 1. Prevent default browser form submission
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

            // Show success message
            alert("Your registration has been submitted successfully!");
            form.reset();
            setCountryCode("+966"); // Reset country code
        } catch (error) {
            console.error(error);
            alert("Failed to send. Please try again later.");
        }
    };

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
                            <form onSubmit={handleSubmit} className="mt-8">
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
                                        <input type="text" name="inp_1" className="w-full bg-transparent border-0 border-b border-burgundy/40 focus:border-burgundy focus:outline-none py-1" required />
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label className="block text-sm mb-2 font-kanun">{t("signup.form.surname.label")}</label>
                                        <input type="text" name="inp_2" className="w-full bg-transparent border-0 border-b border-burgundy/40 focus:border-burgundy focus:outline-none py-1" required />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm mb-2 font-kanun">{t("signup.form.email.label")}</label>
                                        <input type="email" name="inp_3" className="w-full bg-transparent border-0 border-b border-burgundy/40 focus:border-burgundy focus:outline-none py-1" required />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm mb-2 font-kanun">{t("signup.form.phone.label")}</label>
                                        <input type="tel" name="inp_15" className="w-full bg-transparent border-0 border-b border-burgundy/40 focus:border-burgundy focus:outline-none py-1" required />
                                    </div>

                                    {/* Request Type */}
                                    <div>
                                        <label className="block text-sm mb-2 font-kanun">{t("signup.form.requestType.label")}</label>
                                        <select name="inp_9143" className="appearance-none w-full bg-transparent border-0 border-b border-burgundy/40 focus:border-burgundy focus:outline-none py-1 pr-6" defaultValue="" required>
                                            <option value="" disabled>{t("signup.form.requestType.options.0")}</option>
                                            <option value="1">Miraf District</option>
                                            <option value="2">Merkan Quarter</option>
                                            <option value="3">Refad Compound</option>
                                            <option value="4">Logistics Solutions</option>
                                            <option value="5">Partnership & Investment</option>
                                            <option value="6">Support</option>
                                            <option value="7">HR Department</option>
                                            <option value="8">Vendor Registration</option>
                                        </select>
                                    </div>

                                    {/* Subject */}
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm mb-2 font-kanun">{t("signup.form.subject.label")}</label>
                                        <input type="text" name="inp_9141" className="w-full bg-transparent border-0 border-b border-burgundy/40 focus:border-burgundy focus:outline-none py-1" required />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="mt-6 text-end">
                                    <button type="submit" className="inline-flex items-center justify-center rounded-full border border-burgundy/60 px-5 py-1.5 text-sm hover:bg-burgundy/5 transition kanun">
                                        {t("signup.form.send.label")}
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

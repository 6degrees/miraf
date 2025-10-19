"use client";

import React from "react";
import Image from "next/image";
import {useTranslation} from "react-i18next";

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
    onSubmitAction?: (form: FormData) => void;
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
        onSubmitAction,
        className = "",
        bgClass = "bg-blush",
        textClass = "text-burgundy",
    }: CommunitySignupSectionProps) {
    /*
    |--------------------------------------------------------------------------
    | $i18n-translator
    |--------------------------------------------------------------------------
    |
    | Retrieve the `t` function from i18next for localized strings.
    |
    */
    const {t} = useTranslation();

    /*
    |------------------------------------------------------------------------------
    | $form:handle-submit
    |------------------------------------------------------------------------------
    | Handles form submission logic.
    |------------------------------------------------------------------------------
    |
    | - Prevents the default browser form reload
    | - Collects all input values via FormData API
    | - Invokes the optional `onSubmit` callback (if provided)
    | - Designed to be replaced or extended with real API integration
    |
    */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        onSubmitAction?.(fd);
    };

    /*
    |------------------------------------------------------------------------------
    | $component-render
    |------------------------------------------------------------------------------
    | Renders the full section layout and form elements.
    |------------------------------------------------------------------------------
    |
    | - Wrapper section uses customizable background/text colors
    | - Left column:
    |     → Displays main title, subtitle, and underlined input form
    | - Right column:
    |     → Displays low-opacity decorative SVG shapes
    | - Fully responsive (1 column on mobile, 2 columns from md breakpoint)
    | - Input fields use minimalist underlined style for elegant look
    |
    */
    return (
        <section id="register" className={`w-full ${bgClass} ${textClass} py-12 md:py-16 ${className} border-t-2 border-[#f4e8d5]`}>
            <div className="container-x">
                <div className="flex flex-col md:flex-row items-start justify-between gap-10">
                    {/* Left: Heading + Form */}
                    <div className="w-full lg:w-auto lg:flex-1">
                        <h2 className="font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl">
                            {heading}
                        </h2>
                        <p className="mt-2 text-xl sm:text-2xl opacity-90">{subheading}</p>

                        <form onSubmit={handleSubmit} className="mt-8">
                            {/* Two-column form rows (still grid inside form) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
                                {/* First Name */}
                                <div>
                                    <label className="block text-sm mb-2">{t("signup.form.firstName.label")}</label>
                                    <input type="text" name="firstName" className="w-full bg-transparent border-0 border-b border-burgundy/40 focus:border-burgundy focus:outline-none py-1" required/>
                                </div>

                                {/* Surname */}
                                <div>
                                    <label className="block text-sm mb-2">{t("signup.form.surname.label")}</label>
                                    <input type="text" name="surname" className="w-full bg-transparent border-0 border-b border-burgundy/40 focus:border-burgundy focus:outline-none py-1" required/>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm mb-2">{t("signup.form.email.label")}</label>
                                    <input type="email" name="email" className="w-full bg-transparent border-0 border-b border-burgundy/40 focus:border-burgundy focus:outline-none py-1" required/>
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block text-sm mb-2">{t("signup.form.phone.label")}</label>
                                    <input type="tel" name="phone" className="w-full bg-transparent border-0 border-b border-burgundy/40 focus:border-burgundy focus:outline-none py-1"/>
                                </div>

                                {/* Request Type */}
                                <div>
                                    <label className="block text-sm mb-2">{t("signup.form.requestType.label")}</label>
                                    <div className="relative">
                                        <select name="requestType" className="appearance-none w-full bg-transparent border-0 border-b border-burgundy/40 focus:border-burgundy focus:outline-none py-1 pr-6" defaultValue="" required>
                                            <option value="" disabled>
                                                {t("signup.form.requestType.options.0")}
                                            </option>
                                            <option value="other">{t("signup.form.requestType.options.1")}</option>
                                        </select>
                                        <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-sm"></span>
                                    </div>
                                </div>

                                {/* Subject */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm mb-2">{t("signup.form.subject.label")}</label>
                                    <input type="text" name="subject" className="w-full bg-transparent border-0 border-b border-burgundy/40 focus:border-burgundy focus:outline-none py-1"/>
                                </div>
                            </div>

                            {/* Send button */}
                            <div className="mt-6 text-end">
                                <button type="submit" className="inline-flex items-center justify-center rounded-full border border-burgundy/60 px-5 py-1.5 text-sm hover:bg-burgundy/5 transition">
                                    {t("signup.form.send.label")}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right: Decorative blobs */}
                    <div className="relative hidden lg:flex md:flex-1 justify-center items-center">
                        <Image src="/icons/ml_Icon_32.png" alt="" height="500" width="500" className="object-contain"/>
                    </div>
                </div>
            </div>
        </section>
    );
}

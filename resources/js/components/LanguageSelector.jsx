// resources/js/Components/LanguageSelector.jsx

import React, { useState, useEffect } from "react";
import AnimatedButton from "./AnimatedButton";

/**
 * LanguageSelector Component
 *
 * A custom language selector that interacts with the hidden Google Translate widget.
 * It displays a dropdown of languages and, when a language is selected,
 * it calls the provided `onLanguageChange` function to update the Google Translate.
 *
 * @param {object} props - The component props.
 * @param {function} props.onLanguageChange - A callback function to trigger language change
 * in the Google Translate widget (e.g., from Header).
 * @param {boolean} props.isGoogleTranslateScriptLoaded - Indicates if the Google Translate script is loaded.
 */
const LanguageSelector = ({
    onLanguageChange,
    isGoogleTranslateScriptLoaded,
}) => {
    // List of languages to display in the selector
    const languages = [
        { code: "en", name: "English" },
        { code: "ceb", name: "Cebuano" },
        { code: "tl", name: "Tagalog" },
        { code: "es", name: "Spanish" }, // Changed Español to Spanish for consistency with image
        { code: "fr", name: "French" }, // Changed Français to French
        { code: "de", name: "German" }, // Changed Deutsch to German
        { code: "zh", name: "Chinese" }, // Changed 中文 to Chinese
        { code: "ja", name: "Japanese" }, // Changed 日本語 to Japanese
        { code: "it", name: "Italian" }, // Changed Italiano to Italian
        { code: "ar", name: "Arabic" }, // Changed العربية to Arabic
        { code: "ru", name: "Russian" }, // Changed Русский to Russian
    ];

    // State to hold the currently selected language
    const [selectedLanguage, setSelectedLanguage] = useState("en");

    // Effect to try and synchronize the selected language with Google Translate's current language
    useEffect(() => {
        if (isGoogleTranslateScriptLoaded) {
            const translateElement = document.getElementById(
                "google_translate_element"
            );
            if (translateElement) {
                const selectElement =
                    translateElement.querySelector(".goog-te-combo");
                if (selectElement && selectElement.value) {
                    setSelectedLanguage(selectElement.value);
                }
            }
        }
    }, [isGoogleTranslateScriptLoaded]);

    const handleLanguageChange = (event) => {
        const newLang = event.target.value;
        setSelectedLanguage(newLang);
        if (onLanguageChange && isGoogleTranslateScriptLoaded) {
            onLanguageChange(newLang);
        } else if (!isGoogleTranslateScriptLoaded) {
            console.warn(
                "Google Translate script not yet loaded, cannot change language."
            );
        }
    };

    return (
        <div className="relative inline-block text-left">
            <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                // IMPORTANT: Add the 'notranslate' class here
                className="block p-4 px-6 py-0 text-sm text-blue-700 bg-white border border-gray-300 rounded-md shadow-sm notranslate focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                disabled={!isGoogleTranslateScriptLoaded} // Disable until script is loaded
            >
                {/* Option to display when script is not loaded */}
                {!isGoogleTranslateScriptLoaded && (
                    <option value="" disabled>
                        Loading...
                    </option>
                )}
                {/* Render language options */}
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;

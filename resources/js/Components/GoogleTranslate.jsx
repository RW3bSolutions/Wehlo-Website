// resources/js/Components/GoogleTranslate.jsx

import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * GoogleTranslate Component (Headless)
 *
 * This component dynamically loads the Google Translate Element script
 * and initializes a single instance of the widget into a hidden div.
 * It provides a function to change the translation language programmatically.
 *
 * @param {object} props - The component props.
 * @param {function} [props.onScriptLoaded] - Callback function called with a boolean
 * argument (true when script is loaded, false otherwise)
 * to inform the parent component about the script's loading status.
 * @param {React.MutableRefObject} [props.setTranslateFunctionRef] - A ref object that will be
 * populated with a function to programmatically change the Google Translate language.
 */
const GoogleTranslate = ({ onScriptLoaded, setTranslateFunctionRef }) => {
    // This ref points to the hidden div where Google Translate will inject its UI.
    const hiddenTranslateContainerRef = useRef(null);

    // State to track if the Google Translate script has loaded internally
    const [scriptLoadedInternal, setScriptLoadedInternal] = useState(false);

    // NEW: Ref to hold the current instance of initializeGoogleTranslate callback
    // This ensures a stable reference for the global window.googleTranslateElementInit
    const initializeFnRef = useRef();

    // Function to programmatically change the Google Translate language
    const changeGoogleTranslateLanguage = useCallback((langCode) => {
        // Ensure the global Google Translate object is available
        if (window.google && window.google.translate) {
            const translateElement = document.getElementById(
                "google_translate_element"
            );
            if (translateElement) {
                const selectElement =
                    translateElement.querySelector(".goog-te-combo");
                if (selectElement) {
                    // Set the value and dispatch a change event to trigger translation
                    selectElement.value = langCode;
                    selectElement.dispatchEvent(new Event("change"));
                    console.log(`Language changed to: ${langCode}`);
                } else {
                    console.warn(
                        "Google Translate language select element (.goog-te-combo) not found."
                    );
                }
            } else {
                console.warn(
                    "Google Translate container element (#google_translate_element) not found."
                );
            }
        } else {
            console.warn(
                "Google Translate API (window.google.translate) not available."
            );
        }
    }, []);

    // Function to initialize Google Translate, wrapped in useCallback for stability
    const initializeGoogleTranslate = useCallback(() => {
        console.log("Attempting to initialize Google Translate widget...");
        if (
            window.google &&
            window.google.translate &&
            hiddenTranslateContainerRef.current
        ) {
            try {
                // Clear content to prevent re-initialization issues if component re-mounts
                hiddenTranslateContainerRef.current.innerHTML = "";

                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "en",
                        includedLanguages: "en,ceb,tl,es,fr,de,zh,ja,it,ar,ru",
                        autoDisplay: false, // Keep autoDisplay true for it to render initially
                    },
                    hiddenTranslateContainerRef.current.id // Target the hidden div by its ID
                );
                console.log(
                    "Google Translate widget initialized successfully."
                );

                // Expose the change language function via the provided ref
                if (setTranslateFunctionRef) {
                    setTranslateFunctionRef.current =
                        changeGoogleTranslateLanguage;
                    console.log("Translate function exposed via ref.");
                }
                setScriptLoadedInternal(true);
                if (onScriptLoaded) {
                    onScriptLoaded(true);
                }
            } catch (e) {
                console.error("Error initializing Google Translate widget:", e);
                setScriptLoadedInternal(false);
                if (onScriptLoaded) {
                    onScriptLoaded(false);
                }
            }
        } else {
            console.warn(
                "Google Translate API or container not ready for initialization (inside initializeGoogleTranslate)."
            );
        }
    }, [
        changeGoogleTranslateLanguage,
        onScriptLoaded,
        setTranslateFunctionRef,
    ]);

    // NEW: Update the ref whenever initializeGoogleTranslate changes
    useEffect(() => {
        initializeFnRef.current = initializeGoogleTranslate;
    }, [initializeGoogleTranslate]);

    // Effect for loading the Google Translate script and setting up the global callback
    useEffect(() => {
        // Define the global callback function.
        // This wrapper ensures that `initializeGoogleTranslate` is called
        // via the stable `initializeFnRef.current`, even if the script's callback
        // fires before React has fully set up the component's internal functions.
        window.googleTranslateElementInit = () => {
            console.log(
                "window.googleTranslateElementInit called by Google script."
            );
            // Use a small timeout to ensure React's state and refs are fully updated
            // before `initializeGoogleTranslate` is called via the ref.
            setTimeout(() => {
                if (initializeFnRef.current) {
                    initializeFnRef.current();
                } else {
                    console.error(
                        "initializeFnRef.current is null/undefined when window.googleTranslateElementInit fires."
                    );
                }
            }, 0); // A 0ms timeout defers execution to the next event loop tick
        };

        // Check if script already exists to prevent duplicates
        if (document.getElementById("google-translate-script")) {
            console.log(
                "Google Translate script already exists. Triggering init."
            );
            // If script exists, trigger the init function manually in case
            // the original onload was missed or component remounted.
            window.googleTranslateElementInit();
            return;
        }

        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        script.defer = true;

        script.onerror = (e) => {
            console.error("Failed to load Google Translate script:", e);
            setScriptLoadedInternal(false);
            if (onScriptLoaded) {
                onScriptLoaded(false);
            }
        };

        // Ensure document.body exists before appending
        if (document.body) {
            document.body.appendChild(script);
            console.log("Google Translate script appended to body.");
        } else {
            console.error(
                "document.body is not available to append Google Translate script."
            );
            setScriptLoadedInternal(false);
            if (onScriptLoaded) {
                onScriptLoaded(false);
            }
        }

        // Cleanup function for when the component unmounts
        return () => {
            console.log("GoogleTranslate cleanup running.");
            const scriptTag = document.getElementById(
                "google-translate-script"
            );
            if (scriptTag && scriptTag.parentNode) {
                scriptTag.parentNode.removeChild(scriptTag);
                console.log("Google Translate script removed.");
            }
            // Clear the global init function, but only if it's the one we set
            if (window.googleTranslateElementInit) {
                // Check if it exists before deleting
                delete window.googleTranslateElementInit;
                console.log("Global googleTranslateElementInit cleared.");
            }

            // Reset body styles that Google Translate might have altered
            document.body.style.top = "";
            document.body.classList.remove("translated");

            if (onScriptLoaded) {
                onScriptLoaded(false);
            }
            setScriptLoadedInternal(false);

            // Clear the content of the hidden container on unmount to prevent stale widgets
            if (hiddenTranslateContainerRef.current) {
                hiddenTranslateContainerRef.current.innerHTML = "";
                console.log("Hidden translate container cleared.");
            }
        };
    }, [onScriptLoaded]); // Removed initializeGoogleTranslate and setTranslateFunctionRef from dependencies here
    // as they are handled by initializeFnRef.current and the outer useEffect.

    // Effect to hide the Google Translate toolbar and the invisible iframe
    useEffect(() => {
        if (!scriptLoadedInternal) return;

        const hideGoogleArtifacts = () => {
            const banner = document.querySelector(".goog-te-banner-frame");
            const iframe = document.querySelector("iframe.skiptranslate");

            if (banner && banner.style) {
                banner.style.display = "none";
            }
            if (iframe && iframe.style) {
                iframe.style.display = "none";
            }
            document.body.style.top = "0px"; // Ensure body top is reset
            // console.log("Google Translate artifacts hidden.");
        };

        const observer = new MutationObserver(hideGoogleArtifacts);
        // Observe the body for changes, including subtree for iframes
        observer.observe(document.body, { childList: true, subtree: true });

        // Fallback setTimeout in case MutationObserver misses it
        const fallbackTimeout = setTimeout(hideGoogleArtifacts, 2000); // Increased timeout

        return () => {
            observer.disconnect();
            clearTimeout(fallbackTimeout);
            // console.log("MutationObserver and fallback timeout cleared.");
        };
    }, [scriptLoadedInternal]);

    return (
        // This div is the target for the Google Translate widget.
        // It's hidden from view, but Google Translate will still initialize into it.
        <div
            id="google_translate_element" // This ID is crucial for Google Translate
            ref={hiddenTranslateContainerRef}
            style={{
                position: "absolute",
                left: "-9999px",
                top: "-9999px",
                width: "1px",
                height: "1px",
                overflow: "hidden",
            }}
        ></div>
    );
};

export default GoogleTranslate;

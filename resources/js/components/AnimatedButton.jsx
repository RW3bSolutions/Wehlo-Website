import React from "react";
import { motion, useAnimation } from "motion/react";
export default function AnimatedButton({
    text,
    className = "",
    bgColor = "bg-blue-600",
    textColor = "text-white",
}) {
    const controls = useAnimation();

    const handleHoverStart = () => {
        controls.start({
            x: "0%",
            transition: { duration: 0.6, ease: "easeOut" },
        });
    };

    const handleHoverEnd = () => {
        controls.start({
            x: "-100%",
            transition: { duration: 0.4, ease: "easeIn" },
        });
    };

    return (
        <motion.button
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            className={`relative overflow-hidden px-5 py-2 flex items-center justify-center gap-2 font-bold  rounded-full transition-all ${className}`}
        >
            {/* Sliding animated background */}
            <motion.span
                initial={{ x: "-100%" }}
                animate={controls}
                className={`absolute top-0 left-0 z-0 w-full h-full ${bgColor}`}
            />

            {/* Text and Icon */}
            <span
                className={`relative z-10 flex items-center gap-2 ${textColor}`}
            >
                {text}
            </span>
        </motion.button>
    );
}

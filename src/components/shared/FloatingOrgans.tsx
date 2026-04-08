"use client";

import React from "react";

/*
  Animated floating organs — heart, brain, kidney, liver
  Each is a simplified SVG that subtly drifts across the page background.
*/

function HeartSVG({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 56 C16 44 4 34 4 22 C4 12 12 4 22 4 C26.8 4 31 6.4 32 10 C33 6.4 37.2 4 42 4 C52 4 60 12 60 22 C60 34 48 44 32 56Z"
                fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.15" />
            {/* Pulse animation */}
            <circle cx="32" cy="28" r="6" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.12">
                <animate attributeName="r" values="5;9;5" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.12;0.25;0.12" dur="1.5s" repeatCount="indefinite" />
            </circle>
        </svg>
    );
}

function BrainSVG({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Brain left hemisphere */}
            <path d="M18 48 C8 44 4 36 6 28 C8 18 14 12 22 10 C26 8 30 10 32 14"
                stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.12" strokeLinecap="round" fill="currentColor" fillOpacity="0.05" />
            {/* Brain right hemisphere */}
            <path d="M46 48 C56 44 60 36 58 28 C56 18 50 12 42 10 C38 8 34 10 32 14"
                stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.12" strokeLinecap="round" fill="currentColor" fillOpacity="0.05" />
            {/* Folds */}
            <path d="M20 24 C24 20 28 22 32 20 C36 18 40 22 44 24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.08" strokeLinecap="round" fill="none" />
            <path d="M16 32 C22 28 26 32 32 30 C38 28 42 32 48 32" stroke="currentColor" strokeWidth="1" strokeOpacity="0.08" strokeLinecap="round" fill="none" />
            <path d="M18 40 C24 36 28 40 32 38 C36 36 40 40 46 40" stroke="currentColor" strokeWidth="1" strokeOpacity="0.08" strokeLinecap="round" fill="none" />
            {/* Synapse pulse */}
            <circle cx="26" cy="22" r="2" fill="currentColor" fillOpacity="0.1">
                <animate attributeName="fill-opacity" values="0.05;0.2;0.05" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="40" cy="30" r="2" fill="currentColor" fillOpacity="0.1">
                <animate attributeName="fill-opacity" values="0.05;0.2;0.05" dur="2.5s" repeatCount="indefinite" />
            </circle>
        </svg>
    );
}

function KidneySVG({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Kidney bean shape */}
            <path d="M24 8 C38 8 44 16 44 26 C44 32 40 36 36 38 C40 42 44 48 44 54 C44 58 38 60 32 58 C26 56 18 50 16 40 C14 30 14 8 24 8Z"
                fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.12" />
            {/* Ureter */}
            <path d="M30 42 C28 48 30 54 34 58" stroke="currentColor" strokeWidth="1" strokeOpacity="0.08" strokeLinecap="round" fill="none" />
            {/* Flow animation */}
            <circle cx="30" cy="28" r="3" fill="none" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.1">
                <animate attributeName="r" values="2;5;2" dur="3s" repeatCount="indefinite" />
            </circle>
        </svg>
    );
}

function LiverSVG({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Liver shape */}
            <path d="M14 24 C10 20 12 14 18 10 C26 6 38 4 48 8 C56 12 60 22 56 32 C52 42 44 48 34 50 C24 52 16 46 14 38 C12 32 14 28 14 24Z"
                fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.12" />
            {/* Lobe division */}
            <path d="M34 12 C30 20 28 30 30 42" stroke="currentColor" strokeWidth="1" strokeOpacity="0.08" strokeLinecap="round" fill="none" />
            {/* Gallbladder */}
            <ellipse cx="38" cy="44" rx="4" ry="6" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.08" />
        </svg>
    );
}

function LungsSVG({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Trachea */}
            <rect x="30" y="4" width="4" height="16" rx="2" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" />
            {/* Left lung */}
            <path d="M30 20 C24 22 12 28 10 40 C8 50 14 56 22 56 C28 56 30 52 30 46Z"
                fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.1">
                <animate attributeName="opacity" values="0.04;0.08;0.04" dur="3s" repeatCount="indefinite" />
            </path>
            {/* Right lung */}
            <path d="M34 20 C40 22 52 28 54 40 C56 50 50 56 42 56 C36 56 34 52 34 46Z"
                fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.1">
                <animate attributeName="opacity" values="0.04;0.08;0.04" dur="3s" repeatCount="indefinite" />
            </path>
        </svg>
    );
}

const organs = [
    { Component: HeartSVG, style: { left: "3%", top: "12%", animationDelay: "0s", animationDuration: "12s" }, size: "w-16 h-16" },
    { Component: BrainSVG, style: { left: "82%", top: "8%", animationDelay: "2s", animationDuration: "14s" }, size: "w-20 h-20" },
    { Component: KidneySVG, style: { left: "8%", top: "55%", animationDelay: "4s", animationDuration: "16s" }, size: "w-14 h-14" },
    { Component: LiverSVG, style: { left: "78%", top: "60%", animationDelay: "1s", animationDuration: "13s" }, size: "w-18 h-18 md:w-20 md:h-20" },
    { Component: LungsSVG, style: { left: "45%", top: "80%", animationDelay: "3s", animationDuration: "15s" }, size: "w-16 h-16" },
    { Component: HeartSVG, style: { left: "60%", top: "15%", animationDelay: "5s", animationDuration: "11s" }, size: "w-12 h-12" },
    { Component: BrainSVG, style: { left: "25%", top: "35%", animationDelay: "6s", animationDuration: "17s" }, size: "w-10 h-10" },
    { Component: KidneySVG, style: { left: "88%", top: "38%", animationDelay: "1.5s", animationDuration: "12s" }, size: "w-12 h-12" },
];

export default function FloatingOrgans() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
            {organs.map((organ, i) => {
                const { Component, style, size } = organ;
                return (
                    <div
                        key={i}
                        className={`absolute ${size} text-emerald-500 dark:text-emerald-400`}
                        style={{
                            left: style.left,
                            top: style.top,
                            animation: `organFloat ${style.animationDuration} ease-in-out ${style.animationDelay} infinite`,
                        }}
                    >
                        <Component className="w-full h-full" />
                    </div>
                );
            })}
        </div>
    );
}

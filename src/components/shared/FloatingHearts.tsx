"use client";

import React from "react";

export default function FloatingHearts() {
    return (
        <>
            <div className="floating-heart text-4xl" style={{ left: "6%", top: "18%", animationDelay: "0s" }}>💚</div>
            <div className="floating-heart text-2xl" style={{ left: "88%", top: "32%", animationDelay: "2s" }}>💚</div>
            <div className="floating-heart text-3xl" style={{ left: "72%", top: "68%", animationDelay: "4s" }}>💚</div>
            <div className="floating-heart text-xl" style={{ left: "12%", top: "78%", animationDelay: "6s" }}>💚</div>
            <div className="floating-heart text-2xl" style={{ left: "45%", top: "12%", animationDelay: "1s" }}>💚</div>
            <div className="floating-heart text-lg" style={{ left: "55%", top: "85%", animationDelay: "3s" }}>💚</div>
        </>
    );
}

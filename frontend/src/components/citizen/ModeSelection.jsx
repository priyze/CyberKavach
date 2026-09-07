import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldHalf } from "lucide-react";
import { PALETTE } from "../../utils/constants";

export default function ModeSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-start justify-center p-4" style={{ backgroundColor: PALETTE.cream, fontFamily: "Manrope, system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        button { font-family: inherit; }
        body { font-family: 'Manrope', system-ui, sans-serif; }
      `}</style>
      
      <div className="w-full max-w-sm overflow-hidden" style={{ border: "1px solid #3a3e6e", borderRadius: "12px", backgroundColor: "#1c1e44", boxShadow: "0 1px 3px rgba(18,24,44,0.08)" }}>
        <div className="px-5 pt-4 pb-3" style={{ backgroundColor: "#1c1e44", borderBottom: "1px solid #3a3e6e" }}>
          <div className="flex items-center gap-2">
            <ShieldHalf size={24} color={PALETTE.cream} />
            <div>
              <div style={{ color: PALETTE.cream, fontWeight: 800, fontSize: "1.1rem" }}>CyberKavach</div>
              <div style={{ color: "#aab0d8", fontSize: "0.75rem" }}>Pre-transaction fraud shield</div>
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <div className="text-center py-4">
            <h1 style={{ color: PALETTE.cream, fontWeight: 800, fontSize: "1.5rem", lineHeight: 1.25, marginBottom: "0.5rem" }}>
              Welcome to CyberKavach
            </h1>
            <p style={{ color: "#aab0d8", fontSize: "0.9rem", lineHeight: 1.5 }}>
              Check suspicious UPI payments before you approve them
            </p>
          </div>

          <button 
            onClick={() => navigate("/citizen")}
            className="w-full"
            style={{ 
              backgroundColor: "#F5F6DB", 
              color: "#1c1e44", 
              padding: "1.2rem", 
              borderRadius: "8px", 
              fontSize: "1rem", 
              fontWeight: 700,
              border: "none",
              cursor: "pointer"
            }}
          >
            Normal Mode
          </button>

          <button 
            onClick={() => navigate("/elderly")}
            className="w-full"
            style={{ 
              backgroundColor: "#7ee2a8", 
              color: "#1c1e44", 
              padding: "1.2rem", 
              borderRadius: "8px", 
              fontSize: "1rem", 
              fontWeight: 700,
              border: "none",
              cursor: "pointer"
            }}
          >
            Elderly Mode
          </button>

          <button 
            onClick={() => navigate("/admin")}
            className="w-full"
            style={{ 
              backgroundColor: "#2b2f54", 
              color: PALETTE.cream, 
              padding: "1.2rem", 
              borderRadius: "8px", 
              fontSize: "1rem", 
              fontWeight: 700,
              border: "1px solid #3a3e6e",
              cursor: "pointer"
            }}
          >
            Government Portal
          </button>

          <p style={{ textAlign: "center", color: "#aab0d8", fontSize: "0.75rem", marginTop: "1rem" }}>
            No sign-in. No phone number. Reports stay anonymous.
          </p>
        </div>
      </div>
    </div>
  );
}
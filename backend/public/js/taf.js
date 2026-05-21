// ======================================================
// TAF.JS — Cockpit IFR EBLG PRO+++
// - Chargement sécurisé TAF
// - Parsing minimal (raw + âge)
// - Mise à jour UI
// ======================================================

import { ENDPOINTS } from "./config.js";
import { fetchJSON, updateStatusPanel } from "./helpers.js";

// ------------------------------------------------------
// INIT
// ------------------------------------------------------
export function initTaf() {
    safeLoadTaf();
}

// ------------------------------------------------------
// CHARGEMENT SÉCURISÉ
// ------------------------------------------------------
export async function safeLoadTaf() {
    try {
        const data = await fetchJSON(ENDPOINTS.taf);

        if (!data || !data.raw) {
            console.error("[TAF] Données invalides", data);
            updateStatusPanel("TAF", { error: true });
            return;
        }

        renderTaf(data);
        updateStatusPanel("TAF", { ok: true });

    } catch (err) {
        console.error("[TAF] Erreur safeLoadTaf", err);
        updateStatusPanel("TAF", { error: true });
    }
}

// ------------------------------------------------------
// RENDU TAF
// ------------------------------------------------------
function renderTaf(data) {
    const tafEl = document.getElementById("taf");
    if (!tafEl) return;

    const raw = data.raw || "TAF indisponible";
    const age = data.ageMinutes ?? null;

    tafEl.textContent =
        raw +
        (age != null ? `\n\nÂge TAF : ${age.toFixed(1)} min` : "");
}

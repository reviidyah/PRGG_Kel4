// ===============================
// LISTENER HIGHLIGHT JALAN (FINAL)
// ===============================

console.log("listener.js loaded");

let originalStylesSaved = false;
let originalStyles = new Map();

window.addEventListener("message", function (event) {

    console.log("MESSAGE MASUK:", event.data);

    // validasi data
    if (!event.data || !event.data.zoomTo) return;

    let target = String(event.data.zoomTo)
        .toLowerCase()
        .replace(/\s+/g, ''); // buang spasi

    // =============================
    // 1. SIMPAN STYLE ASLI (SEKALI)
    // =============================
    if (!originalStylesSaved) {
        layer_JalanKemantrenGondokusuman_4.eachLayer(function (layer) {
            originalStyles.set(layer._leaflet_id, {
                color: layer.options.color,
                weight: layer.options.weight,
                opacity: layer.options.opacity
            });
        });
        originalStylesSaved = true;
        console.log("Original styles saved");
    }

    // =============================
    // 2. RESET SEMUA JALAN
    // =============================
    layer_JalanKemantrenGondokusuman_4.eachLayer(function (layer) {
        let saved = originalStyles.get(layer._leaflet_id);
        if (saved) {
            layer.setStyle(saved);
        }
    });

    // =============================
    // 3. CARI & HIGHLIGHT (SATU SAJA)
    // =============================
    let sudahKetemu = false;

    layer_JalanKemantrenGondokusuman_4.eachLayer(function (layer) {

        if (sudahKetemu) return;
        if (!layer.feature || !layer.feature.properties) return;

        let nama = String(layer.feature.properties.nama || "")
            .toLowerCase()
            .replace(/\s+/g, '');

        console.log("CEK:", nama);

        if (nama.includes(target)) {
            sudahKetemu = true;

            console.log("MATCH:", nama);

            layer.setStyle({
                color: "#ff0000",
                weight: 7,
                opacity: 1
            });

            map.fitBounds(layer.getBounds(), {
                maxZoom: 19,
                padding: [40, 40]
            });

            // optional: buka popup
            if (layer.getPopup()) {
                layer.openPopup();
            }
        }
    });

});

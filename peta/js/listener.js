let originalStylesSaved = false;  
let originalStyles = new Map();   

window.addEventListener("message", function (event) {

    if (!event.data || !event.data.zoomTo) return;

    let fiturDicari = event.data.zoomTo.toLowerCase();

    // 1. SIMPAN STYLE ASLI (hanya sekali)
    if (!originalStylesSaved) {
        layer_JalanKemantrenGondokusuman_4.eachLayer(function(layer){
            originalStyles.set(layer._leaflet_id, {
                color: layer.options.color,
                weight: layer.options.weight,
                opacity: layer.options.opacity
            });
        });
        originalStylesSaved = true;
        console.log("Original styles saved.");
    }

    // 2. RESET STYLE KE ASLI
    layer_JalanKemantrenGondokusuman_4.eachLayer(function(layer){
        let saved = originalStyles.get(layer._leaflet_id);
        if (saved) {
            layer.setStyle(saved);
        }
    });

    // 3. CARI JALAN & HIGHLIGHT
    layer_JalanKemantrenGondokusuman_4.eachLayer(function(layer){

        if (layer.feature && layer.feature.properties) {

            let nama = String(layer.feature.properties['nama'] || "").toLowerCase();

            if (nama.includes(fiturDicari)) {

                layer.setStyle({
                    color: "#ff0000",
                    weight: 7,
                    opacity: 1
                });

                map.fitBounds(layer.getBounds(), { maxZoom: 19 });
            }
        }
    });

});

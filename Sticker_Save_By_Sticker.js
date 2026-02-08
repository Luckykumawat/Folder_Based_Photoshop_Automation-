#target photoshop
app.displayDialogs = DialogModes.NO;

// ===============================
// CONFIG
// ===============================
var JPG_QUALITY = 10;

// ===============================
// SELECT MODELS FOLDER
// ===============================
var modelsFolder = Folder.selectDialog("Select folder containing ALL model PSD files");
if (!modelsFolder) exit();

// ===============================
// SELECT STICKERS FOLDER
// ===============================
var stickersFolder = Folder.selectDialog("Select folder containing ALL sticker PSD files");
if (!stickersFolder) exit();

// ===============================
// GET FILE LISTS
// ===============================
var modelFiles = modelsFolder.getFiles("*.psd");
if (modelFiles.length === 0) {
    alert("No model PSD files found.");
    exit();
}

var stickerFiles = stickersFolder.getFiles("*.psd");
if (stickerFiles.length === 0) {
    alert("No sticker PSD files found.");
    exit();
}

// ===============================
// JPG SAVE OPTIONS
// ===============================
var jpgOptions = new JPEGSaveOptions();
jpgOptions.embedColorProfile = true;
jpgOptions.formatOptions = FormatOptions.STANDARDBASELINE;
jpgOptions.matte = MatteType.NONE;
jpgOptions.quality = JPG_QUALITY;

// ===============================
// MAIN STICKER LOOP
// ===============================
for (var s = 0; s < stickerFiles.length; s++) {

    var stickerFile = stickerFiles[s];
    var stickerName = stickerFile.name.replace(/\.[^\.]+$/, "");

    // Create output folder per sticker
    var outputFolder = new Folder(stickersFolder + "/OUTPUT/" + stickerName);
    if (!outputFolder.exists) outputFolder.create();

    // ===============================
    // MODEL LOOP
    // ===============================
    for (var m = 0; m < modelFiles.length; m++) {

        try {
            var modelFile = modelFiles[m];
            var modelName = modelFile.name.replace(/\.[^\.]+$/, "");

            var doc = app.open(modelFile);

            // Find STICKER smart object
            var stickerLayer = findStickerLayer(doc);
            if (!stickerLayer) throw "STICKER Smart Object not found";

            // Replace sticker
            replaceSmartObject(stickerFile, stickerLayer);

            // Save JPG
            var saveFile = new File(outputFolder + "/" + modelName + ".jpg");
            doc.saveAs(saveFile, jpgOptions, true, Extension.LOWERCASE);

            doc.close(SaveOptions.DONOTSAVECHANGES);

        } catch (err) {
            alert("Error in model: " + modelFiles[m].name + "\n" + err);
            if (app.documents.length)
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            continue;
        }
    }
}

alert("✅ Automation complete! Images exported sticker-wise.");

// ===============================
// FIND STICKER SMART OBJECT
// ===============================
function findStickerLayer(doc) {
    for (var i = 0; i < doc.layers.length; i++) {
        var layer = doc.layers[i];
        if (layer.kind === LayerKind.SMARTOBJECT && layer.name === "1") {
            return layer;
        }
    }
    return null;
}

// ===============================
// REPLACE SMART OBJECT CONTENT
// ===============================
function replaceSmartObject(file, layer) {
    app.activeDocument.activeLayer = layer;

    var id = stringIDToTypeID("placedLayerReplaceContents");
    var desc = new ActionDescriptor();
    desc.putPath(charIDToTypeID("null"), new File(file));
    desc.putInteger(charIDToTypeID("PgNm"), 1);
    executeAction(id, desc, DialogModes.NO);
}
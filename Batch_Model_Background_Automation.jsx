
#target photoshop
app.bringToFront();

// Select Background Folder
var bgFolder = Folder.selectDialog("Select Background Images Folder");
if (!bgFolder) {
    alert("No Background folder selected.");
    exit();
}

// Select Model PSD Folder
var modelFolder = Folder.selectDialog("Select Model PSD Folder");
if (!modelFolder) {
    alert("No Model folder selected.");
    exit();
}

// Get all background images (jpg, jpeg, png)
var bgFiles = bgFolder.getFiles(/\.(jpg|jpeg|png)$/i);

// Get all PSD model files
var modelFiles = modelFolder.getFiles("*.psd");

if (bgFiles.length == 0 || modelFiles.length == 0) {
    alert("No background images or PSD files found.");
    exit();
}

// Create Output folder inside Model folder
var outputRoot = new Folder(modelFolder + "/output");
if (!outputRoot.exists) outputRoot.create();

// Loop through each model
for (var i = 0; i < modelFiles.length; i++) {

    var modelFile = modelFiles[i];
    var modelName = decodeURI(modelFile.name).replace(".psd", "");

    // Open Model
    var modelDoc = app.open(modelFile);

    // Create model specific output folder
    var modelOutputFolder = new Folder(outputRoot + "/" + modelName);
    if (!modelOutputFolder.exists) modelOutputFolder.create();

    // Store original ruler units
    var originalUnits = app.preferences.rulerUnits;
    app.preferences.rulerUnits = Units.PIXELS;

    var canvasWidth = modelDoc.width;
    var canvasHeight = modelDoc.height;

    // Loop through each background
    for (var j = 0; j < bgFiles.length; j++) {

        var bgFile = bgFiles[j];
        var bgName = decodeURI(bgFile.name).replace(/\.(jpg|jpeg|png)$/i, "");

        var bgDoc = app.open(bgFile);

        // Resize background to match model canvas
        bgDoc.resizeImage(canvasWidth, canvasHeight);

        // Copy background
        bgDoc.selection.selectAll();
        bgDoc.selection.copy();
        bgDoc.close(SaveOptions.DONOTSAVECHANGES);

        // Paste into model
        app.activeDocument = modelDoc;
        var pastedLayer = modelDoc.paste();

        // Move background layer to bottom
        pastedLayer.move(modelDoc.layers[modelDoc.layers.length - 1], ElementPlacement.PLACEAFTER);

        // Save as JPG
        var saveFile = new File(modelOutputFolder + "/" + modelName + "_" + bgName + ".jpg");

        var jpgOptions = new JPEGSaveOptions();
        jpgOptions.quality = 10;

        modelDoc.saveAs(saveFile, jpgOptions, true);

        // Remove background layer
        pastedLayer.remove();
    }

    // Close model without saving changes
    modelDoc.close(SaveOptions.DONOTSAVECHANGES);

    app.preferences.rulerUnits = originalUnits;
}

alert("Process Completed Successfully!");

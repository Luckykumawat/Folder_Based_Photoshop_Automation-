# Folder_Based_Photoshop_Automation-
This automation script is built for Adobe Photoshop (ExtendScript / JavaScript) to bulk-generate product images by combining multiple model PSD files with multiple sticker PSD files.


Photoshop Model × Sticker Automation Script
📌 Overview

This automation script is built for Adobe Photoshop (ExtendScript / JavaScript) to bulk-generate product images by combining multiple model PSD files with multiple sticker PSD files.

It replaces a predefined Smart Object placeholder (STICKER) in each model PSD with hundreds of sticker PSDs and exports the final images as JPG files, model by model — ensuring speed, stability, and zero overwrite issues.

This is especially useful for:

E-commerce catalog creation

Marketplace product uploads (Meesho, Amazon, Flipkart, etc.)

Bulk mockup generation

Sticker / label / skin previews on models

🚀 Key Features

🔁 One-by-one model processing (prevents crashes & long waits)

🧠 Smart Object replacement using a fixed placeholder layer

📂 Automatic folder-level export

⚡ Handles hundreds of sticker PSDs efficiently

🖼️ Exports high-quality JPGs

❌ No need to rename sticker files (supports 1.psd → 200.psd)

🛑 Stops safely on errors without breaking the whole process

🧩 Automation Workflow

You prepare model PSD files

Each model contains a top-level Smart Object named STICKER

The sticker position and scale are set once manually

You prepare sticker PSD files

Files can be numbered (1.psd, 2.psd, 3.psd, …)

No renaming required

Run the script:

Select parent folder containing all model folders

Select all sticker PSD files

Script automatically:

Opens one model PSD

Replaces STICKER Smart Object with each sticker PSD

Saves JPGs into that model’s Exports folder

Closes the model safely

Moves to the next model

📁 Folder Structure (Required)
Models/
├─ Model_01/
│  ├─ model.psd
│  └─ Exports/
├─ Model_02/
│  ├─ model.psd
│  └─ Exports/


Sticker files:

Stickers/
├─ 1.psd
├─ 2.psd
├─ 3.psd
...

⚠️ Important Requirement

Each model PSD must contain a TOP-LEVEL Smart Object

The Smart Object must be named exactly:

STICKER


The STICKER layer must NOT be inside another Smart Object

🛠️ Technologies Used

Adobe Photoshop ExtendScript (JavaScript)

Smart Object Replace Contents API

Folder-based batch processing

🎯 Output Format
ModelName_StickerNumber.jpg


Example:

oppo_a15s_1.jpg
oppo_a15s_2.jpg

💡 Why This Script?

Traditional batch methods fail or become slow when processing large datasets.
This script processes one model at a time, making it:

More reliable

Faster

Easier to debug

Suitable for production-level automation

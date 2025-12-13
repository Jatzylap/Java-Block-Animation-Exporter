Adds the option to turn animation keyframes into a sequence of block/item models based on the Java Block codec.
This will not export any item definition files for the exported models, so these must be referenced manually in a resource pack.
Requires Minecraft 1.21.11 or later.

# How it works
The Java Block Animation Exporter basically adds a format which combines the Blockbench `Bake Animation Pose To Model` and `resolve` functions into a single 'Export Java Block Animation' button. These models will be stored into a zip archive under the name of the selected animation.

## How to use
Start by creating a new model or converting an existing cube-based project into a **Java Block Animation**. Create an animation. Right-click your animation. Click **Export Java Block Animation** from the drop-down menu. Each model will be displayed in-game based on settings in the Display tab.

# Troubleshooting
- If the exported models aren't getting rotated or positioned properly, make sure the groups/bones used in your animation have been checked (`Export: On`) in the `Edit` tab.

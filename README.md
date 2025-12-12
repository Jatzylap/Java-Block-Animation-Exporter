# Java Block Animation Exporter
A model exporter plugin for Blockbench based on the 1.21.11+ Java Block codec. This format is designed to make entity animations easier and more streamlined in Minecraft: Java Edition. The plugin simply turns animation frames into a series item models. Requires Minecraft 1.21.11 or later.

# Functionality
The Java Block Animation Exporter (JBAE) basically combines the Blockbench `Bake Animation Pose To Model` and `resolve` functions. To export your animation into a **Java Block Animation**, start by creating a new **Java Block Animation** project, then right-click your animation (created in the **Animate** tab) and click **Export Java Block Animation** from the drop-down menu. 
This will not export any item definition files for the exported models; these must be referenced manually.
In a nutshell, the JBAE exports Java Block models similar to the OBJ Animation Exporter tool by JannisX11.

# Pre-requisite:
- Java Block format `1.21.11+` on blockbench

# For local setup
- Click **Load Plugin From File** in Blockbench at **File > Plugins**, select the `java_block_animation_export.js` plugin and then click **OK** when prompted.

# Troubleshooting
- If the exported models aren't getting rotated or positioned properly, make sure the groups/bones used in your animation have been checked (`Export: On`) in the `Edit` tab.

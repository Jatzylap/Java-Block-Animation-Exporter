# Java Block Animation Exporter
A model exporter plugin for Blockbench based on the Java Block codec. This was designed to make entity animations easier and more streamlined in Minecraft: Java Edition. Some tweaks were made to the codec to handle the Minecraft 1.21.11 model syntax.

# Prerequisites
- Blockbench `v5.0.4`

# Setup
- Clone the Blockbench `v5.0.4` source code
- Replace the `java_block.js` file in `js\io\formats\java_block.js`
- Run `npm install` and `npm run dev` from the root directory of the blockbench source code
- Click **Load Plugin From File** in Blockbench at **File > Plugins** and then click **OK** when prompted

# Functionality
The Java Block Animation Exporter (JBAE) basically uses modified versions of the Blockbench `Bake Animation Pose To Model` and `resolve` functions. To export your animation into a **Java Block Animation**, start by right-clicking your animation (created in the **Animate** tab) and click **Export Java Block Animation** from the drop-down menu. In a nutshell, the JBAE exports Java Block models similar to the OBJ Animation Exporter tool by JannisX11.

# Troubleshooting
- If the exported models aren't getting rotated or positioned properly, make sure the groups/bones used in your animation have been checked (`Export: On`) in the `Edit` tab.
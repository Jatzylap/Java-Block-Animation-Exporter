(function() {

	let export_action;
	
	BBPlugin.register('java_block_animation_export', {
		title: 'Java Block Animation Exporter',
		icon: 'icon-objects',
		author: 'Jatzylap',
		description: 'Exports a sequence of JSON models using the Java Block codec',
		about: 'To export, right click an animation and click Export Java Block Animation.',
		tags: ['Exporter'],
		version: '0.1.0',
		min_version: '4.0.0',
		variant: 'both',
		onload() {
			
			export_action = new Action('export_java_block_sequence', {
				name: 'Export Java Block Animation',
				description: 'Export animation as Java Block models',
				icon: 'icon-objects',
				category: 'animation',
				condition: () => Modes.animate && Animation.selected,
				click() {
					new Dialog({
						id: 'export_java_block_sequence',
						title: 'Export Java Block Animation',
						form: {
							length: {label: 'Length', type: 'number', value: Animation.selected.length, min: 0, max: 10000},
							fps: {label: 'FPS', type: 'number', value: Animation.selected.snapping, min: 1, max: 1000},
						},
						onConfirm({length, fps}) {

							let archive = new JSZip();
							Timeline.setTime(0);

							for (let frame = 0; frame <= length * fps; frame++) {
								Timeline.setTime(frame / fps);
								Animator.preview();

								let animatable_elements = Outliner.elements.filter(el => el.constructor.animator);

								[...Group.all, ...animatable_elements].forEach(node => {
									let {offset_rotation, offset_position, offset_scale, origin} = set_defaults(node);
									offset(node, offset_rotation, offset_position, offset_scale, origin);
								});

								let javablockmodel = Codecs.java_block.compile();
								archive.file(`${frame}.json`, javablockmodel);

								[...Group.all, ...animatable_elements].forEach(node => {
									let {offset_rotation, offset_position, offset_scale, origin} = set_defaults(node);
									undo_offset(node, offset_rotation, offset_position, offset_scale, origin);
								});
							}

							function set_defaults(node) {
								let offset_rotation = [0, 0, 0];
								let offset_position = [0, 0, 0];
								let offset_scale = [1, 1, 1];
								let origin = [0, 0, 0];
								origin.V3_set(node.origin);
								
								Animator.animations.forEach(animation => {
									if (animation.playing) {
										let animator = animation.getBoneAnimator(node);
										let multiplier = animation.blend_weight ? Math.clamp(Animator.MolangParser.parse(animation.blend_weight), 0, Infinity) : 1;
										
										if (node instanceof Group) {
											let rotation = animator.interpolate('rotation');
											let position = animator.interpolate('position');
											let scale = animator.interpolate('scale');
											if (scale instanceof Array) offset_scale.V3_multiply(scale.map(v => v * multiplier));
											if (rotation instanceof Array) offset_rotation.V3_add(rotation.map(v => v * multiplier));
											if (position instanceof Array) offset_position.V3_add(position.map(v => v * multiplier));
										}
									}
								});
								return {offset_rotation, offset_position, offset_scale, origin};
							}

							// Rotation, Position, Scale
							function offset(node, offset_rotation, offset_position, offset_scale, origin) {
								if (node.getTypeBehavior('rotatable')) {
									node.rotation[0] += offset_rotation[0];
									node.rotation[1] += offset_rotation[1];
									node.rotation[2] += offset_rotation[2];
								}
								if (node instanceof Group) { // Bone
									node.origin.V3_add(offset_position);
									node.children.forEach(child => {
										offset(child, offset_rotation, offset_position, offset_scale, origin);
									});
								} else { // Cube
									if (node.from) node.from.V3_add(offset_position);
									if (node.to) node.to.V3_add(offset_position);
									if (node.origin) node.origin.V3_set(origin);
								}
							}

							// Undo: Rotation, Position, Scale
							function undo_offset(node, offset_rotation, offset_position, offset_scale, origin) {
								if (node.getTypeBehavior('rotatable')) {
									node.rotation[0] -= offset_rotation[0];
									node.rotation[1] -= offset_rotation[1];
									node.rotation[2] -= offset_rotation[2];
								}
								if (node instanceof Group) { // Bone
									node.origin.V3_subtract(offset_position);
									node.children.forEach(child => {
										undo_offset(child, offset_rotation, offset_position, offset_scale, origin);
									});
								} else { // Cube
									if (node.from) node.from.V3_subtract(offset_position);
									if (node.to) node.to.V3_subtract(offset_position);
									if (node.origin) node.origin.V3_set(origin);
								}
							}

							archive.generateAsync({type: 'blob'}).then(content => {
								Blockbench.export({
									resource_id: 'model',
									type: 'Zip Archive',
									extensions: ['zip'],
									name: Animation.selected.name,
									content: content,
									savetype: 'zip'
								});
							});
						}
					}).show();
				}
			});
	
			Animation.prototype.menu.addAction(export_action, '-1');
		},
		onunload() {
			export_action.delete();
		}
	});
})()
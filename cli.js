#!/usr/bin/env node
const path = require('path');
const isDev = process.argv.find ((item) => item === '-l');

let localPkg = path.join (process.cwd(), 'node_modules', 'fit-core');
let devPkg = path.join (process.cwd(), '..', 'fit-core');
let fit;

try {
	require.resolve (localPkg);
	fit = isDev ? devPkg : localPkg;
}
catch (e) {
	try {
		require.resolve (globalPkg);
		fit = globalPkg;
	}
	catch (e) {
		console.log('CAN NOT RUN');
		console.log('Make sure you install '+ (isDev ? 'Dev' : 'Local') +' \'fit-core\'.');
	}
}

if (fit) {
	const core = require(fit);

	core.config.init()
		.then(() => {
			return core.install();
		})
		.then(() => {
			return core.loader();
		})
		.catch((e) => {
			console.log(e);
		});
}

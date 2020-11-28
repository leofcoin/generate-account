export default [{
	input: 'src/generate-account.js',
	output: {
		dir: './dist/commonjs',
		format: 'cjs',
		sourcemap: false
	}
}, {
	input: 'src/generate-account.js',
	output: {
		dir: './dist/module',
		format: 'es',
		sourcemap: false
	}
}]
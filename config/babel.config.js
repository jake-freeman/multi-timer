module.exports = function (api) {
    api.cache(true);

    const presets = [
        [
            '@babel/preset-env', {
                'targets': {
                    'chrome': '71',
                    'edge': '44',
                    'firefox': '64'
                },
                // useBuiltIns: 'usage' tells babel to
                // only polyfill certain features based on
                // usage so we don't need to include a huge
                // library of polyfills we don't need
                'useBuiltIns': 'usage',
                // When using useBuiltIns: 'usage', we need to specify the major
                // version of the `core-js` package we want to use for the
                // polyfills. This must match the major version of `core-js`
                // in our package.json `dependencies`
                'corejs': '3',
            }
        ],
        ["@babel/preset-react"]
    ];

    const plugins = [
        // The class property syntax is nice for static class members such as
        // propType declarations and default props in React components. This
        // way they can be part of the class definition.
        //
        '@babel/plugin-proposal-class-properties'
    ];

    return {
        presets: presets,
        plugins: plugins,

        // Because we (out of necessity) mix in some CommonJS modules,
        // we need to tell Babel not to add import statements to them.
        sourceType: 'unambiguous'
    };
}
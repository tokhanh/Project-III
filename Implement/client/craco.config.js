const CracoLessPlugin = require('craco-less')

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#6200EE',
                            '@success-color': '#09af00',
                            '@warning-color': '#ff9e22',
                            '@error-color': '#e54304',
                            '@btn-danger-bg': '@error-color',
                            '@btn-warning-bg': '@warning-color',
                            '@btn-success-bg': '@success-color'

                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
}

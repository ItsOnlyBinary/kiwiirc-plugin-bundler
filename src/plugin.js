/* global kiwi:true */

// javascript-obfuscator:disable
const modules = ImportAll(require.context('./modules/', true, /index.js$/));
// javascript-obfuscator:enable

function ImportAll(r) {
    return r.keys().map((key) => r(key));
}

kiwi.plugin('bundler', (kiwi, log) => {
    const allowedHosts = [
        'localhost:8080',
    ];

    if (!allowedHosts.includes(window.location.host)) {
        return;
    }

    modules.forEach((module) => {
        if (typeof module.init === 'function') {
            module.init(kiwi, log);
        }
    });
});

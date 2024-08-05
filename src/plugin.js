/* global kiwi:true */

const modules = ImportAll(require.context('./modules/', true, /index.js$/));

function ImportAll(r) {
    return r.keys().map((key) => r(key));
}

kiwi.plugin('bundler', (kiwi, log) => {
    modules.forEach((module) => {
        if (typeof module.init === 'function') {
            module.init(kiwi, log);
        }
    });
});

const http = (function () {
    const HOST = 'http://localhost:4200';
//    const HOST = 'http://10.224.2.140:4200';

    function customFecth(url, config, resolve, reject) {
        fetch(url, config).then(data => {
            if (data.ok) resolve(data.json());
            else reject(data);
        }).catch(reject);
    }

    return {
        post(path, data, resolve, reject) {
            const url = HOST + path;

            const options = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json', mode: 'no-cors' },
            };

            customFecth(url, options, resolve, reject);
        },

        delete(path, resolve, reject) {
            const url = HOST + path;

            const options = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', mode: 'no-cors' }
            };

            customFecth(url, options, resolve, reject);
        }
    }
})();
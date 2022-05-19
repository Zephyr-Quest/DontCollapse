// const HOST = 'http://localhost:4200';
const HOST = 'http://10.222.8.203:4200';

function customFecth(url, config, resolve, reject,) {
    fetch(url, config).then(data => {
        if (data.ok) return data.json();
        else reject(data);
    })
    .then(resolve)
    .catch(reject);
}

function get(path, resolve, reject) {
    const url = HOST + path;

    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', mode: 'no-cors' },
    };

    customFecth(url, options, resolve, reject);
}

function post(path, data, resolve, reject) {
    const url = HOST + path;

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json', mode: 'no-cors' },
    };

    customFecth(url, options, resolve, reject);
}

function del(path, resolve, reject) {
    const url = HOST + path;

    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', mode: 'no-cors' }
    };

    customFecth(url, options, resolve, reject);
}

export default {get, post, del}
import React from 'react';

const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

function buildHeaders() {
    const jwt = localStorage.getItem('jwt');
    return !jwt ? defaultHeaders : {
        ...defaultHeaders,
        Authorization: authToken,
    };
}

export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function parseJSON(response) {
    return response.json();
}

export function httpGet(url) {
    const options = {
        headers: buildHeaders(),
    };
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON);
}

export function httpPost(url, data) {
    const body = JSON.stringify(data);
    const options = {
        method: 'post',
        headers: buildHeaders(),
        body: body,
    };
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON);
}

export function httpDelete(url) {
    const options = {
        method: 'delete',
        headers: buildHeaders(),
    };
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON);
}

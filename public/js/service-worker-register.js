// REGISTER SERVICE WORKER
if (!('serviceWorker' in navigator)) {
    console.log('ServiceWorker is not supported in this browser.');
} else {
    registerServiceWorker();
    requestPermission();
}

// Register service worker
function registerServiceWorker() {
    return navigator.serviceWorker
        .register('../service-worker.js')
        .then(function (registration) {
        console.log('Service worker registration was successful.');
        return registration;
    })
        .catch(function (err) {
            console.error('Service worker registration failed.', err);
        });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function (result) {
            if (result === 'denied') {
                console.log('Notification feature is not allowed.');
            return;
            } else if (result === 'default') {
                console.error('The user closes the permission of request dialog box.');
            return;
            }

            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then(function(registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BMHAiD8K1RRbfCZkagSbJLJZDvUVHeuO2w5El-7mNEgon4N3UvT_g_wrpk3fWD0S4kTn4c4D6DAj2Tc6mFTkDC0")
                    }).then(function(subscribe) {
                        console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('p256dh')))));
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('auth')))));
                    }).catch(function(e) {
                        console.error('Tidak dapat melakukan subscribe ', e.message);
                    });
                });
            }
        });
    }
}

// REQUEST API UNTUK PERTAMA KALI
document.addEventListener('DOMContentLoaded', function () {
    let page = window.location.hash.substr(1);
});

// {"publicKey":"BMHAiD8K1RRbfCZkagSbJLJZDvUVHeuO2w5El-7mNEgon4N3UvT_g_wrpk3fWD0S4kTn4c4D6DAj2Tc6mFTkDC0","privateKey":"C4fz8d-iEYMgHSXroQRBtDWMRzjl1VPXjVJabzgFsE4"}
let webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BMHAiD8K1RRbfCZkagSbJLJZDvUVHeuO2w5El-7mNEgon4N3UvT_g_wrpk3fWD0S4kTn4c4D6DAj2Tc6mFTkDC0",
    "privateKey": "C4fz8d-iEYMgHSXroQRBtDWMRzjl1VPXjVJabzgFsE4"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dFeKnv7yGmU:APA91bHZBT78VB8q0k4X2S60oGdy5jSL-mhcfrsn8NREl2mJbXofEFBcZ7aVR8K3jkvV0OJo_RqvUZcW0zQkXhFfusTsRz-xpeFmtBd4CW2NOrr-c1PG0Zmk88q7Yewfr9HvPJUAIKpK",
    "keys": {
        "p256dh": "BE3ObmivqiMWe8A/wCSBrVFfdAHQ7HsryGtgUURhxm4/MOS3uDavC5n0U6l8McmnCuRjsbcTBvSFdJ/WE5e8WoY=",
        "auth": "VxWZ6J09B3ZT/J4cEQkUJg=="
    }
};

let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '939440165494',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
const crypto = require('crypto');

const iv = Buffer.from('0102030405060708');
const presetKey = Buffer.from('0CoJUm6Qyw8W8jud');
const base62 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const publicKey = '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgtQn2JZ34ZC28NWYpAUd98iZ37BUrX/aKzmFbt7clFSs6sXqHauqKWqdtLkF2KexO40H1YTX8z2lSgBBOAxLsvaklV8k4cBFK9snQXE9/DDaFt6Rr7iVZMldczhC0JNgTz+SHXT6CBHuX3e9SdB1Ua44oncaTWz7OBGLbCiK45wIDAQAB\n-----END PUBLIC KEY-----';

const aesEncrypt = (buffer, mode, key, iv) => {
    const cipher = crypto.createCipheriv(`aes-128-${mode}`, key, iv);
    return Buffer.concat([cipher.update(buffer), cipher.final()]);
};

const rsaEncrypt = (buffer, key) => {
    buffer = Buffer.concat([Buffer.alloc(128 - buffer.length), buffer]);
    return crypto.publicEncrypt({ key, padding: crypto.constants.RSA_NO_PADDING }, buffer);
};

const weapi = (object) => {
    const text = JSON.stringify(object);
    const secretKey = crypto.randomBytes(16).map(n => base62.charCodeAt(n % 62));
    return {
        params: aesEncrypt(Buffer.from(aesEncrypt(Buffer.from(text), 'cbc', presetKey, iv).toString('base64')), 'cbc', secretKey, iv).toString('base64'),
        encSecKey: rsaEncrypt(secretKey.reverse(), publicKey).toString('hex'),
    };
};

async function testAlbum(albumId) {
    console.log(`Testing album ${albumId} using weapi NO_PADDING...`);
    const data = weapi({});
    const url = `https://music.163.com/weapi/v1/album/${albumId}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://music.163.com/'
            },
            body: new URLSearchParams(data).toString()
        });

        const body = await response.json();
        if (body.code === 200) {
            console.log('Success!');
            console.log('Album:', body.album.name);
            console.log('Songs count:', body.songs.length);
        } else {
            console.log('Failed code:', body.code);
            console.log('Msg:', body.message || 'No msg');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testAlbum('367402346');

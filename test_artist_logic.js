
import { eapiRequest } from './src/modules/utils/musicSdk/wy/utils/index'
import { weapi } from './src/modules/utils/musicSdk/wy/utils/crypto'
import { httpFetch } from './src/modules/utils/request'

async function testEapi(id) {
    console.log('--- Testing EAPI ---');
    try {
        // According to singer.js, it might expect .then() directly? 
        // But httpFetch returns { promise }. Let's check both.
        const req = eapiRequest('/api/artist/head/info/get', { id });
        console.log('EAPI Request type:', typeof req);
        console.log('EAPI Request has promise:', !!req.promise);

        const res = await (req.promise || req);
        console.log('EAPI Result:', JSON.stringify(res.body).substring(0, 200));
    } catch (e) {
        console.error('EAPI Error:', e.message);
    }
}

async function testWeapi(id) {
    console.log('\n--- Testing WEAPI (Mobile Logic) ---');
    try {
        const url = 'https://music.163.com/weapi/artist/head/info/get';
        const req = httpFetch(url, {
            method: 'post',
            form: weapi({ id })
        });
        const { body } = await req.promise;
        console.log('WEAPI Result Code:', body.code);
        if (body.code === 200) {
            console.log('Artist Name:', body.data.artist.name);
            console.log('Artist Avatar:', body.data.user.avatarUrl);
        } else {
            console.log('WEAPI Body:', JSON.stringify(body));
        }
    } catch (e) {
        console.error('WEAPI Error:', e.message);
    }
}

const artistId = '166011';
testEapi(artistId).then(() => testWeapi(artistId));

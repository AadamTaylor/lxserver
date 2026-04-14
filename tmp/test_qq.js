const needle = require('needle');

async function testQQ(uid) {
    const APIURL = 'https://c.y.qq.com/rsc/fcgi-bin/fcg_user_created_diss';
    const params = {
        hostuin: uid,
        sin: 0,
        size: 40,
        r: 1614957597503,
        g_tk_new_20200303: 1718906646,
        g_tk: 1718906646,
        loginUin: 0,
        hostUin: 0,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq.json',
        needNewCode: 0
    };

    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://y.qq.com/',
            'Host': 'c.y.qq.com'
        }
    };

    console.log(`Fetching playlists for QQ: ${uid}...`);
    try {
        const resp = await needle('get', APIURL, params, options);
        console.log('Status Code:', resp.statusCode);
        console.log('Body:', JSON.stringify(resp.body, null, 2));
    } catch (err) {
        console.error('Error:', err.message);
    }
}

testQQ('804093032');

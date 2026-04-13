
import { weapi } from './src/modules/utils/musicSdk/wy/utils/crypto'
import { httpFetch } from './src/modules/utils/request'

async function runTest(id) {
    console.log(`--- Fetching Artist Albums for ID: ${id} using WEAPI ---`);
    try {
        const url = `https://music.163.com/weapi/artist/albums/${id}`;
        const req = httpFetch(url, {
            method: 'post',
            form: weapi({
                limit: 50,
                offset: 0,
                total: true
            })
        });
        const { body } = await req.promise;

        if (body.code === 200) {
            console.log('Result SUCCESS:');
            console.log('Hot Albums Count:', body.hotAlbums ? body.hotAlbums.length : 0);
            if (body.hotAlbums && body.hotAlbums.length > 0) {
                console.log('First Album:', body.hotAlbums[0].name);
            }
            console.log('More:', body.more);
        } else {
            console.log('Result FAILED:', body);
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
}

runTest('6452');

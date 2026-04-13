
import { weapi } from './src/modules/utils/musicSdk/wy/utils/crypto'
import { httpFetch } from './src/modules/utils/request'

async function runTest(id) {
    console.log(`--- Fetching Artist Detail for ID: ${id} using WEAPI ---`);
    try {
        const url = 'https://music.163.com/weapi/artist/head/info/get';
        const req = httpFetch(url, {
            method: 'post',
            form: weapi({ id })
        });
        const { body } = await req.promise;

        if (body.code === 200) {
            const data = body.data;
            console.log('Result SUCCESS:');
            console.log('Name:', data.artist.name);
            console.log('Avatar:', data.user ? data.user.avatarUrl : 'N/A');
            console.log('Desc:', data.artist.briefDesc);
            console.log('Secondary Info:', data.secondaryInfo || 'N/A');
            console.log('Stats:', {
                music: data.artist.musicSize,
                album: data.artist.albumSize,
                mv: data.artist.mvSize
            });
        } else {
            console.log('Result FAILED:', body);
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
}

runTest('166011');

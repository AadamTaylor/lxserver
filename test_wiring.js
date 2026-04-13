
import wy from './src/modules/utils/musicSdk/wy/index'

async function test() {
    console.log('--- Testing Wy ExtendDetail with WEAPI ---');
    const artistId = '166011';

    try {
        console.log('\n1. Testing getArtistDetail...');
        const detail = await wy.extendDetail.getArtistDetail(artistId);
        console.log('Detail Result:', detail);

        console.log('\n2. Testing getArtistSongs...');
        const songs = await wy.extendDetail.getArtistSongs(artistId);
        console.log('Songs count:', songs.list.length);
        if (songs.list.length > 0) {
            console.log('First song:', songs.list[0].name, '-', songs.list[0].singer);
        }

        console.log('\n3. Testing getArtistAlbums...');
        const albums = await wy.extendDetail.getArtistAlbums(artistId);
        console.log('Albums count:', albums.list.length);
        if (albums.list.length > 0) {
            console.log('First album:', albums.list[0].name);
        }

        console.log('\n--- ALL TESTS PASSED ---');
    } catch (e) {
        console.error('Test Failed:', e);
    }
}

test();

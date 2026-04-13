const { weapiRequest } = require('./src/modules/utils/musicSdk/wy/utils/index');
const crypto = require('./src/modules/utils/musicSdk/wy/utils/crypto');

async function testAlbumDetail(albumId) {
    console.log(`Testing album detail for ID: ${albumId}`);
    try {
        // weapi logic from mobile SDK
        const res = await weapiRequest(`https://music.163.com/weapi/v1/album/${albumId}`, {});
        console.log('Success!');
        console.log('Album name:', res.album ? res.album.name : 'Unknown');
        console.log('Songs count:', res.songs ? res.songs.length : 0);
        if (res.songs && res.songs.length > 0) {
            console.log('First song:', res.songs[0].name);
        }
    } catch (err) {
        console.error('Failed:', err.message);
    }
}

const albumId = '367402346';
testAlbumDetail(albumId);

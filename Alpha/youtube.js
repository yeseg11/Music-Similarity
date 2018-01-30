var y = require('youtube-node');
var youTube = new y();

youTube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU');

exports.scrapt = function(options) {
    return new Promise(function(resolve, reject) {
        youTube.search(options.name, 2, function(error, result) {
            if (error) return reject(error || new Error(result));

            if(!result || !result.items || !result.items[0] || !result.items[0].id || !result.items[0].id.videoId) return resolve({})
            
            var videoId = result.items[0].id.videoId;

            youTube.getById(videoId, function(error, result) {
                if (error || !result.items || !result.items[0]) return reject(error || new Error(result));
                var viewCount = parseInt(result.items[0].statistics.viewCount);



                youTube.clearParams();
                youTube.clearParts();
                // videos?part=snippet&id=::id::&key=AIzaSyDXKEiZzKTDzYIaRUG63nK7dO-h5Yykfyk`


                youTube.addPart('id');

                youTube.addParam('part', 'snippet');
                youTube.addParam('id', videoId);

                youTube.request(youTube.getUrl('videos'), function(error, result) {
                    if (error || !result.items || !result.items[0]) return reject(error || new Error(result));
                    var tags = result.items[0].snippet.tags;
                    return resolve({
                        videoId: videoId,
                        views: viewCount,
                        tags: tags
                    });

                });

            });

        })
    });
}
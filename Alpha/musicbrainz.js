var debug = require('debug');
var request = require('request');
//send a request to musicbraintz for the year and return it .

exports.scrapt = getDataFromMB;
function getDataFromMB(options){

   //console.log("url: "+options.url);
    return new Promise((resolve, reject) => {
    	if(!options || !options.url) return reject(new Error(`Missing url options for musicbrainz`))
        request({
            'method': 'GET',
            'uri': options.url,
            'headers': {
                'User-Agent': 'MY IPHINE 7s ' + (+new Date()) // A hack to get into musicbrainz api
            }

        }, function(error, response, body) {
            // if (error) return reject(error);
            if (error || !response || !response.statusCode || response.statusCode !== 200) {
            	options.retry = options.retry || 0;
                options.retry++;
                // if (options.retry > 10) return reject(new Error('Check your ISP internet connection'));
                var nextRetry = (10000 * Math.random() + 10000 * Math.random() + 5000) * options.retry *1.5;
                return setTimeout(function() {
                	debug('app:musicbrainz')(`RETRY ${options.retry} in ${nextRetry} s. :: ${options.url}`);
                    getDataFromMB(options).then(resolve).catch(reject);
                }, nextRetry);
            }
            debug('app:musicbrainz')(`recived data from ${options.url}`);
            try {
                var data = JSON.parse(body);
                //console.log("data: "+data);
                return resolve({items: data, options: options});
            } catch (e) {
                return reject(e);
            }
        });
    })
}

exports.query = query;
function query(options){
	if(!options || !options.query || ['ageYear'].indexOf(options.query) == -1) return Promise.reject(new Error(`mising query type!`));

	return new Promise((resolve, reject)=>{
		switch(options.query){
			case 'ageYear':
				return getDataFromMB({url: `https://musicbrainz.org/ws/2/${options.type}?query=date:${options.date}&fmt=json&limit=${options.limit || 100}&offset=${options.offset || 0}`}).then(resolve).catch(reject)
			break;
		}

		return reject(new Error('WTF you want :)'));
	});
}
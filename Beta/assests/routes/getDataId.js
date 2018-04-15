(function($) {
    $(document).ready(function() {

        var musicWrapper = $('#musicWrapper');

        var template  = '<div class="wrap-input100 input100-select">';
        template += '<span id="::videoId:::" class="label-input100"></span>';
        template += '<div id="demo"></div>';
        template += '<span class="focus-input100">::name::</span>';
        template += '<iframe width="560" height="315" src="http://www.youtube.com/embed/::link::"></iframe>';
        template += '</div>';


        $('#send').on("click", function(e) {
            if( $('#id').length)         // use this if you are using id to check
            {
                var id = $('#id');
                //console.log(id.val().toString());
            }
            else{
                return $('#error').text("insert id!");
            }
            $.get('/user/' + id.val().toString(), function(data) {
                if(!data || !data.items || !data.items.length) return musicWrapper.html('<h3>Please rephrase search</h3>');
                //console.log(data);
                var year = data.items[0].year;
                var country = data.items[0].country;
                 musicWrapper.html('<h3><i class="fa fa-spinner fa-spin fa-3x fa-fw"></i> Loading</h3>');
                //console.log(data.items[0].group);
                $.get('/playList/' + data.items[0].group.toString(), function(data) {
                    //console.log(data);
                    if(!data || !data.items || !data.items.length) return musicWrapper.html('<h3>Please rephrase search</h3>');
                    var rec = data.items[0].records;
                    var html = '';
                    for (var i = 0; i < Object.keys(rec).length; i++) {
                        //console.log(rec[i]);
                        var item = rec[i];
                        //console.log(item);
                        var videoId = (item && item.youtube && item.youtube.videoId) ? item.youtube.videoId : '';
                        //console.log(videoId);
                        var title = (item && item.title)? item.title: '';
                        var artist = (item && item.artist && item.artist[0] && item.artist[0].name)? item.artist[0].name : '';
                        html += template.replace('::videoId::', videoId).replace('::name::', title + ' - ' + artist).replace('::link::',videoId);
                    }
                    $('#title').html("Your Music: "+year + ',' + country);
                    musicWrapper.html(html);
                });
            });
        });
    });
})(jQuery);
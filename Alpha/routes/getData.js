
window.onload = function() {
    document.getElementById("send").addEventListener("click", setData);
    let isoCountries = {
        'AF' : 'Afghanistan',
        'AX' : 'Aland Islands',
        'AL' : 'Albania',
        'DZ' : 'Algeria',
        'AS' : 'American Samoa',
        'AD' : 'Andorra',
        'AO' : 'Angola',
        'AI' : 'Anguilla',
        'AQ' : 'Antarctica',
        'AG' : 'Antigua And Barbuda',
        'AR' : 'Argentina',
        'AM' : 'Armenia',
        'AW' : 'Aruba',
        'AU' : 'Australia',
        'AT' : 'Austria',
        'AZ' : 'Azerbaijan',
        'BS' : 'Bahamas',
        'BH' : 'Bahrain',
        'BD' : 'Bangladesh',
        'BB' : 'Barbados',
        'BY' : 'Belarus',
        'BE' : 'Belgium',
        'BZ' : 'Belize',
        'BJ' : 'Benin',
        'BM' : 'Bermuda',
        'BT' : 'Bhutan',
        'BO' : 'Bolivia',
        'BA' : 'Bosnia And Herzegovina',
        'BW' : 'Botswana',
        'BV' : 'Bouvet Island',
        'BR' : 'Brazil',
        'IO' : 'British Indian Ocean Territory',
        'BN' : 'Brunei Darussalam',
        'BG' : 'Bulgaria',
        'BF' : 'Burkina Faso',
        'BI' : 'Burundi',
        'KH' : 'Cambodia',
        'CM' : 'Cameroon',
        'CA' : 'Canada',
        'CV' : 'Cape Verde',
        'KY' : 'Cayman Islands',
        'CF' : 'Central African Republic',
        'TD' : 'Chad',
        'CL' : 'Chile',
        'CN' : 'China',
        'CX' : 'Christmas Island',
        'CC' : 'Cocos (Keeling) Islands',
        'CO' : 'Colombia',
        'KM' : 'Comoros',
        'CG' : 'Congo',
        'CD' : 'Congo, Democratic Republic',
        'CK' : 'Cook Islands',
        'CR' : 'Costa Rica',
        'CI' : 'Cote D\'Ivoire',
        'HR' : 'Croatia',
        'CU' : 'Cuba',
        'CY' : 'Cyprus',
        'CZ' : 'Czech Republic',
        'DK' : 'Denmark',
        'DJ' : 'Djibouti',
        'DM' : 'Dominica',
        'DO' : 'Dominican Republic',
        'EC' : 'Ecuador',
        'EG' : 'Egypt',
        'SV' : 'El Salvador',
        'GQ' : 'Equatorial Guinea',
        'ER' : 'Eritrea',
        'EE' : 'Estonia',
        'ET' : 'Ethiopia',
        'FK' : 'Falkland Islands (Malvinas)',
        'FO' : 'Faroe Islands',
        'FJ' : 'Fiji',
        'FI' : 'Finland',
        'FR' : 'France',
        'GF' : 'French Guiana',
        'PF' : 'French Polynesia',
        'TF' : 'French Southern Territories',
        'GA' : 'Gabon',
        'GM' : 'Gambia',
        'GE' : 'Georgia',
        'DE' : 'Germany',
        'GH' : 'Ghana',
        'GI' : 'Gibraltar',
        'GR' : 'Greece',
        'GL' : 'Greenland',
        'GD' : 'Grenada',
        'GP' : 'Guadeloupe',
        'GU' : 'Guam',
        'GT' : 'Guatemala',
        'GG' : 'Guernsey',
        'GN' : 'Guinea',
        'GW' : 'Guinea-Bissau',
        'GY' : 'Guyana',
        'HT' : 'Haiti',
        'HM' : 'Heard Island & Mcdonald Islands',
        'VA' : 'Holy See (Vatican City State)',
        'HN' : 'Honduras',
        'HK' : 'Hong Kong',
        'HU' : 'Hungary',
        'IS' : 'Iceland',
        'IN' : 'India',
        'ID' : 'Indonesia',
        'IR' : 'Iran, Islamic Republic Of',
        'IQ' : 'Iraq',
        'IE' : 'Ireland',
        'IM' : 'Isle Of Man',
        'IL' : 'Israel',
        'IT' : 'Italy',
        'JM' : 'Jamaica',
        'JP' : 'Japan',
        'JE' : 'Jersey',
        'JO' : 'Jordan',
        'KZ' : 'Kazakhstan',
        'KE' : 'Kenya',
        'KI' : 'Kiribati',
        'KR' : 'Korea',
        'KW' : 'Kuwait',
        'KG' : 'Kyrgyzstan',
        'LA' : 'Lao People\'s Democratic Republic',
        'LV' : 'Latvia',
        'LB' : 'Lebanon',
        'LS' : 'Lesotho',
        'LR' : 'Liberia',
        'LY' : 'Libyan Arab Jamahiriya',
        'LI' : 'Liechtenstein',
        'LT' : 'Lithuania',
        'LU' : 'Luxembourg',
        'MO' : 'Macao',
        'MK' : 'Macedonia',
        'MG' : 'Madagascar',
        'MW' : 'Malawi',
        'MY' : 'Malaysia',
        'MV' : 'Maldives',
        'ML' : 'Mali',
        'MT' : 'Malta',
        'MH' : 'Marshall Islands',
        'MQ' : 'Martinique',
        'MR' : 'Mauritania',
        'MU' : 'Mauritius',
        'YT' : 'Mayotte',
        'MX' : 'Mexico',
        'FM' : 'Micronesia, Federated States Of',
        'MD' : 'Moldova',
        'MC' : 'Monaco',
        'MN' : 'Mongolia',
        'ME' : 'Montenegro',
        'MS' : 'Montserrat',
        'MA' : 'Morocco',
        'MZ' : 'Mozambique',
        'MM' : 'Myanmar',
        'NA' : 'Namibia',
        'NR' : 'Nauru',
        'NP' : 'Nepal',
        'NL' : 'Netherlands',
        'AN' : 'Netherlands Antilles',
        'NC' : 'New Caledonia',
        'NZ' : 'New Zealand',
        'NI' : 'Nicaragua',
        'NE' : 'Niger',
        'NG' : 'Nigeria',
        'NU' : 'Niue',
        'NF' : 'Norfolk Island',
        'MP' : 'Northern Mariana Islands',
        'NO' : 'Norway',
        'OM' : 'Oman',
        'PK' : 'Pakistan',
        'PW' : 'Palau',
        'PS' : 'Palestinian Territory, Occupied',
        'PA' : 'Panama',
        'PG' : 'Papua New Guinea',
        'PY' : 'Paraguay',
        'PE' : 'Peru',
        'PH' : 'Philippines',
        'PN' : 'Pitcairn',
        'PL' : 'Poland',
        'PT' : 'Portugal',
        'PR' : 'Puerto Rico',
        'QA' : 'Qatar',
        'RE' : 'Reunion',
        'RO' : 'Romania',
        'RU' : 'Russian Federation',
        'RW' : 'Rwanda',
        'BL' : 'Saint Barthelemy',
        'SH' : 'Saint Helena',
        'KN' : 'Saint Kitts And Nevis',
        'LC' : 'Saint Lucia',
        'MF' : 'Saint Martin',
        'PM' : 'Saint Pierre And Miquelon',
        'VC' : 'Saint Vincent And Grenadines',
        'WS' : 'Samoa',
        'SM' : 'San Marino',
        'ST' : 'Sao Tome And Principe',
        'SA' : 'Saudi Arabia',
        'SN' : 'Senegal',
        'RS' : 'Serbia',
        'SC' : 'Seychelles',
        'SL' : 'Sierra Leone',
        'SG' : 'Singapore',
        'SK' : 'Slovakia',
        'SI' : 'Slovenia',
        'SB' : 'Solomon Islands',
        'SO' : 'Somalia',
        'ZA' : 'South Africa',
        'GS' : 'South Georgia And Sandwich Isl.',
        'ES' : 'Spain',
        'LK' : 'Sri Lanka',
        'SD' : 'Sudan',
        'SR' : 'Suriname',
        'SJ' : 'Svalbard And Jan Mayen',
        'SZ' : 'Swaziland',
        'SE' : 'Sweden',
        'CH' : 'Switzerland',
        'SY' : 'Syrian Arab Republic',
        'TW' : 'Taiwan',
        'TJ' : 'Tajikistan',
        'TZ' : 'Tanzania',
        'TH' : 'Thailand',
        'TL' : 'Timor-Leste',
        'TG' : 'Togo',
        'TK' : 'Tokelau',
        'TO' : 'Tonga',
        'TT' : 'Trinidad And Tobago',
        'TN' : 'Tunisia',
        'TR' : 'Turkey',
        'TM' : 'Turkmenistan',
        'TC' : 'Turks And Caicos Islands',
        'TV' : 'Tuvalu',
        'UG' : 'Uganda',
        'UA' : 'Ukraine',
        'AE' : 'United Arab Emirates',
        'GB' : 'United Kingdom',
        'US' : 'United States',
        'UM' : 'United States Outlying Islands',
        'UY' : 'Uruguay',
        'UZ' : 'Uzbekistan',
        'VU' : 'Vanuatu',
        'VE' : 'Venezuela',
        'VN' : 'Viet Nam',
        'VG' : 'Virgin Islands, British',
        'VI' : 'Virgin Islands, U.S.',
        'WF' : 'Wallis And Futuna',
        'EH' : 'Western Sahara',
        'YE' : 'Yemen',
        'ZM' : 'Zambia',
        'ZW' : 'Zimbabwe'
    };
    getData(isoCountries);
};


function getData(isoCountries){

    document.getElementById("send").addEventListener("click", setData);
    var country_arr = {"Afghanistan":{}, "Albania":{}, "Algeria":{}, "American Samoa":{}, "Angola":{}, "Anguilla":{}, "Antartica":{}, "Antigua and Barbuda":{}, "Argentina":{}, "Armenia":{}, "Aruba":{}, "Ashmore and Cartier Island":{}, "Australia":{}, "Austria":{}, "Azerbaijan":{}, "Bahamas":{}, "Bahrain":{}, "Bangladesh":{}, "Barbados":{}, "Belarus":{}, "Belgium":{}, "Belize":{}, "Benin":{}, "Bermuda":{}, "Bhutan":{}, "Bolivia":{}, "Bosnia and Herzegovina":{}, "Botswana":{}, "Brazil":{}, "British Virgin Islands":{}, "Brunei":{}, "Bulgaria":{}, "Burkina Faso":{}, "Burma":{}, "Burundi":{}, "Cambodia":{}, "Cameroon":{}, "Canada":{}, "Cape Verde":{}, "Cayman Islands":{}, "Central African Republic":{}, "Chad":{}, "Chile":{}, "China":{}, "Christmas Island":{}, "Clipperton Island":{}, "Cocos (Keeling) Islands":{}, "Colombia":{}, "Comoros":{}, "Congo, Democratic Republic of the":{}, "Congo, Republic of the":{}, "Cook Islands":{}, "Costa Rica":{}, "Cote d'Ivoire":{}, "Croatia":{}, "Cuba":{}, "Cyprus":{}, "Czeck Republic":{}, "Denmark":{}, "Djibouti":{}, "Dominica":{}, "Dominican Republic":{}, "Ecuador":{}, "Egypt":{}, "El Salvador":{}, "Equatorial Guinea":{}, "Eritrea":{}, "Estonia":{}, "Ethiopia":{}, "Europa Island":{}, "Falkland Islands (Islas Malvinas)":{}, "Faroe Islands":{}, "Fiji":{}, "Finland":{}, "France":{}, "French Guiana":{}, "French Polynesia":{}, "French Southern and Antarctic Lands":{}, "Gabon":{}, "Gambia, The":{}, "Gaza Strip":{}, "Georgia":{}, "Germany":{}, "Ghana":{}, "Gibraltar":{}, "Glorioso Islands":{}, "Greece":{}, "Greenland":{}, "Grenada":{}, "Guadeloupe":{}, "Guam":{}, "Guatemala":{}, "Guernsey":{}, "Guinea":{}, "Guinea-Bissau":{}, "Guyana":{}, "Haiti":{}, "Heard Island and McDonald Islands":{}, "Holy See (Vatican City)":{}, "Honduras":{}, "Hong Kong":{}, "Howland Island":{}, "Hungary":{}, "Iceland":{}, "India":{}, "Indonesia":{}, "Iran":{}, "Iraq":{}, "Ireland":{}, "Ireland, Northern":{}, "Israel":{}, "Italy":{}, "Jamaica":{}, "Jan Mayen":{}, "Japan":{}, "Jarvis Island":{}, "Jersey":{}, "Johnston Atoll":{}, "Jordan":{}, "Juan de Nova Island":{}, "Kazakhstan":{}, "Kenya":{}, "Kiribati":{}, "Korea, North":{}, "Korea, South":{}, "Kuwait":{}, "Kyrgyzstan":{}, "Laos":{}, "Latvia":{}, "Lebanon":{}, "Lesotho":{}, "Liberia":{}, "Libya":{}, "Liechtenstein":{}, "Lithuania":{}, "Luxembourg":{}, "Macau":{}, "Macedonia, Former Yugoslav Republic of":{}, "Madagascar":{}, "Malawi":{}, "Malaysia":{}, "Maldives":{}, "Mali":{}, "Malta":{}, "Man, Isle of":{}, "Marshall Islands":{}, "Martinique":{}, "Mauritania":{}, "Mauritius":{}, "Mayotte":{}, "Mexico":{}, "Micronesia, Federated States of":{}, "Midway Islands":{}, "Moldova":{}, "Monaco":{}, "Mongolia":{}, "Montserrat":{}, "Morocco":{}, "Mozambique":{}, "Namibia":{}, "Nauru":{}, "Nepal":{}, "Netherlands":{}, "Netherlands Antilles":{}, "New Caledonia":{}, "New Zealand":{}, "Nicaragua":{}, "Niger":{}, "Nigeria":{}, "Niue":{}, "Norfolk Island":{}, "Northern Mariana Islands":{}, "Norway":{}, "Oman":{}, "Pakistan":{}, "Palau":{}, "Panama":{}, "Papua New Guinea":{}, "Paraguay":{}, "Peru":{}, "Philippines":{}, "Pitcaim Islands":{}, "Poland":{}, "Portugal":{}, "Puerto Rico":{}, "Qatar":{}, "Reunion":{}, "Romainia":{}, "Russia":{}, "Rwanda":{}, "Saint Helena":{}, "Saint Kitts and Nevis":{}, "Saint Lucia":{}, "Saint Pierre and Miquelon":{}, "Saint Vincent and the Grenadines":{}, "Samoa":{}, "San Marino":{}, "Sao Tome and Principe":{}, "Saudi Arabia":{}, "Scotland":{}, "Senegal":{}, "Seychelles":{}, "Sierra Leone":{}, "Singapore":{}, "Slovakia":{}, "Slovenia":{}, "Solomon Islands":{}, "Somalia":{}, "South Africa":{}, "South Georgia and South Sandwich Islands":{}, "Spain":{}, "Spratly Islands":{}, "Sri Lanka":{}, "Sudan":{}, "Suriname":{}, "Svalbard":{}, "Swaziland":{}, "Sweden":{}, "Switzerland":{}, "Syria":{}, "Taiwan":{}, "Tajikistan":{}, "Tanzania":{}, "Thailand":{}, "Tobago":{}, "Toga":{}, "Tokelau":{}, "Tonga":{}, "Trinidad":{}, "Tunisia":{}, "Turkey":{}, "Turkmenistan":{}, "Tuvalu":{}, "Uganda":{}, "Ukraine":{}, "United Arab Emirates":{}, "United Kingdom":{}, "Uruguay":{}, "USA":{}, "Uzbekistan":{}, "Vanuatu":{}, "Venezuela":{}, "Vietnam":{}, "Virgin Islands":{}, "Wales":{}, "Wallis and Futuna":{}, "West Bank":{}, "Western Sahara":{}, "Yemen":{}, "Yugoslavia":{}, "Zambia":{}, "Zimbabwe":{}};
    var countySel = document.getElementById("countySel");
    for (var country in isoCountries) {
        countySel.options[countySel.options.length] = new Option(country, country);
    }


   // var language_arr = {"Hebrew":{},"English":{},"German":{}};
   // var languageSel = document.getElementById("languageSel");
   // for (var language in language_arr) {
   //     languageSel.options[languageSel.options.length] = new Option(language, language);
   // }

};


function setData() {

   // countryElementId
       // this.lang = document.getElementById("languageSel").value;
      //  if (this.lang == null || this.lang == 0)
     //   {
     //       document.getElementById("demo").innerHTML = "error in language";
     //       return;
     //   }
        this.age  = document.getElementById("age").value;
        if (this.age <= 20)
        {
            document.getElementById("demo").innerHTML = "error in age";
            return;
        }
        this.country =document.getElementById("countySel").value;
        if (this.country == 0)
        {
            document.getElementById("demo").innerHTML = "error in country";
            return;
        }

       // var c = getCountryName(this.country);
       // console.log(c);


        //document.getElementById("demo").innerHTML = "age:" + this.age + " , lang : "+this.lang +", country:"+this.country;
        //alert("age:" + age.toString() + ", lang : "+lang.toString() +", country:"+country.toString())


    var year = calculator(this.age);
    obj ={
            //language:this.lang,
            country:this.country,
            age:this.age,
            year:year
    };
    console.log(obj);

    document.getElementById("btn_country").addEventListener("click",getAreaList);
    document.getElementById("btn_years").addEventListener("click",getYearList);
    document.getElementById("btn_tracks").addEventListener("click",getTrackList);
    //document.getElementById("years").action =;
    //document.getElementById("years").addEventListener("click", function(){
        //document.getElementById("frame").push = "http://www.cnn.com";
    //    document.getElementById("demo").innerHTML = JSON.stringify(obj);

    //});
    //return obj;

};


function calculator(age) {
    var years = 20 ;
    let year = parseInt(age - years) ;
    var d = new Date();
    var todayYear = d.getFullYear();
    let serYear =todayYear - year ;
    document.getElementById("search").innerHTML = "Search in Year : "+serYear;
    return serYear;
}


function getAreaList()
{
    let str = "http://localhost:3000/mb/area/recording/"+obj.country;
    var item =httpGetAsync(str,function(data) {
        //console.log("data: ", data);
        var arr=data.split('\n');
        //console.log("arr: ", arr);
        let jas = JSON.parse(arr);
        //console.log("jas: ", jas.items);
        document.getElementById("list").innerHTML ='';
        if(jas.items.length == 0){
            document.getElementById("list").innerHTML +='Need to search this data , click again on the byCountry button';
        }
        for(let i =0 ;i<jas.items.length;i++){
            document.getElementById("list").innerHTML +='mbid:'+ jas.items[i].mbid + '<br/>';
        }
    });
}

function getYearList()
{
    let str = "http://localhost:3000/mb/year/recording/"+obj.year;
    var item =httpGetAsync(str,function(data) {
        //console.log("data: ", data);
        var arr=data.split('\n');
        //console.log("arr: ", arr);
        let jas = JSON.parse(arr);
        console.log("jas: ", jas.items);
        document.getElementById("list").innerHTML ='';
        if(jas.items.length == 0){
            document.getElementById("list").innerHTML +='Need to search this data , click again on the byYear button';
        }
        for(let i =0 ;i<jas.items.length;i++){
            document.getElementById("list").innerHTML +='mbid: '+ jas.items[i].mbid +' artist_name: '+ jas.items[i].artist_name+' track_name: '+ jas.items[i].track_name + '<br/>';
        }
    });
}


function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    //console.log("items length is 1: "+theUrl);
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
};






/*
function getCountryName (countryCode) {
    if (this.isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
}*/

function getTrackList()
{
    var arr1 =[];
    var promise1 = new Promise(function(resolve, reject) {
        let str = "http://localhost:3000/mb/track/recording/"+obj.year+"/"+obj.country;
        var item =httpGetAsync(str,function(data) {
            //console.log("data: ", data);
            var arr=data.split('\n');
            //console.log("arr: ", arr);
            let jas = JSON.parse(arr);
            //console.log("jas: ", jas.items);
            document.getElementById("list").innerHTML ='';
            if(jas.items.length == 0){
                document.getElementById("list").innerHTML +='Need to search this data , click again on the byTrack button';
            }
            for(let i =0 ;i<2/*jas.items.length*/;i++){
                document.getElementById("list").innerHTML +='artist: '+ jas.items[i].artist_name +', track: '+ jas.items[i].track_name +', area: '+ jas.items[i].area_code +', year: '+ jas.items[i].year + '<br/>';
                arr1.push(jas.items[i].ur);
            }
            resolve(arr1);
        });
    });
    promise1.then(function(arr1) {
        //console.log("after p: "+arr1);
        let link ="";
        for (let i = 0 ; i < arr1.length;i++){
            var it = httpGetAsync(arr1[i],function(data) {
                let j = JSON.parse(data);
                let stat=j.items[0].id;         //
                console.log("----- stat obj:    "+ stat);
                let videoId=stat.videoId;
                //	console.log("-----------------------------------------------------------------");
                console.log("videoId: "+videoId);
                //onsole.log("videoId: "+videoId);
                link = '<iframe width="420" height="345" src="http://www.youtube.com/embed/';
                link+=videoId.toString();
                link+='">';
                document.getElementById("demo").innerHTML +=link +'<br/>';
                /*var $frame = $(link);
                $('demo').html( $frame );
                setTimeout( function() {
                    var doc = $frame[0].contentWindow.document;
                    var $demo = $('demo',doc);
                    $demo.html('<h1>link</h1>');
                }, 1 );
                */
            });
        }
    });

}
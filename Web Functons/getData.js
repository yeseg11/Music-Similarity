

window.onload = function() {
    document.getElementById("send").addEventListener("click", setData);
    //var country_arr = new Array("Afghanistan", "Albania", "Algeria", "American Samoa", "Angola", "Anguilla", "Antartica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Ashmore and Cartier Island", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Clipperton Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czeck Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Europa Island", "Falkland Islands (Islas Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern and Antarctic Lands", "Gabon", "Gambia, The", "Gaza Strip", "Georgia", "Germany", "Ghana", "Gibraltar", "Glorioso Islands", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City)", "Honduras", "Hong Kong", "Howland Island", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Ireland, Northern", "Israel", "Italy", "Jamaica", "Jan Mayen", "Japan", "Jarvis Island", "Jersey", "Johnston Atoll", "Jordan", "Juan de Nova Island", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Man, Isle of", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Midway Islands", "Moldova", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcaim Islands", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romainia", "Russia", "Rwanda", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Scotland", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and South Sandwich Islands", "Spain", "Spratly Islands", "Sri Lanka", "Sudan", "Suriname", "Svalbard", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Tobago", "Toga", "Tokelau", "Tonga", "Trinidad", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "USA", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands", "Wales", "Wallis and Futuna", "West Bank", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe");
    //let country =document.getElementById("country").classList.toggle("show");
    //alert("here");
    //countriesDropdown("countries");
    let lang;
    let age;
    let country;
    getData();
};


function getData(){
    document.getElementById("send").addEventListener("click", setData);
    var country_arr = {"Afghanistan":{}, "Albania":{}, "Algeria":{}, "American Samoa":{}, "Angola":{}, "Anguilla":{}, "Antartica":{}, "Antigua and Barbuda":{}, "Argentina":{}, "Armenia":{}, "Aruba":{}, "Ashmore and Cartier Island":{}, "Australia":{}, "Austria":{}, "Azerbaijan":{}, "Bahamas":{}, "Bahrain":{}, "Bangladesh":{}, "Barbados":{}, "Belarus":{}, "Belgium":{}, "Belize":{}, "Benin":{}, "Bermuda":{}, "Bhutan":{}, "Bolivia":{}, "Bosnia and Herzegovina":{}, "Botswana":{}, "Brazil":{}, "British Virgin Islands":{}, "Brunei":{}, "Bulgaria":{}, "Burkina Faso":{}, "Burma":{}, "Burundi":{}, "Cambodia":{}, "Cameroon":{}, "Canada":{}, "Cape Verde":{}, "Cayman Islands":{}, "Central African Republic":{}, "Chad":{}, "Chile":{}, "China":{}, "Christmas Island":{}, "Clipperton Island":{}, "Cocos (Keeling) Islands":{}, "Colombia":{}, "Comoros":{}, "Congo, Democratic Republic of the":{}, "Congo, Republic of the":{}, "Cook Islands":{}, "Costa Rica":{}, "Cote d'Ivoire":{}, "Croatia":{}, "Cuba":{}, "Cyprus":{}, "Czeck Republic":{}, "Denmark":{}, "Djibouti":{}, "Dominica":{}, "Dominican Republic":{}, "Ecuador":{}, "Egypt":{}, "El Salvador":{}, "Equatorial Guinea":{}, "Eritrea":{}, "Estonia":{}, "Ethiopia":{}, "Europa Island":{}, "Falkland Islands (Islas Malvinas)":{}, "Faroe Islands":{}, "Fiji":{}, "Finland":{}, "France":{}, "French Guiana":{}, "French Polynesia":{}, "French Southern and Antarctic Lands":{}, "Gabon":{}, "Gambia, The":{}, "Gaza Strip":{}, "Georgia":{}, "Germany":{}, "Ghana":{}, "Gibraltar":{}, "Glorioso Islands":{}, "Greece":{}, "Greenland":{}, "Grenada":{}, "Guadeloupe":{}, "Guam":{}, "Guatemala":{}, "Guernsey":{}, "Guinea":{}, "Guinea-Bissau":{}, "Guyana":{}, "Haiti":{}, "Heard Island and McDonald Islands":{}, "Holy See (Vatican City)":{}, "Honduras":{}, "Hong Kong":{}, "Howland Island":{}, "Hungary":{}, "Iceland":{}, "India":{}, "Indonesia":{}, "Iran":{}, "Iraq":{}, "Ireland":{}, "Ireland, Northern":{}, "Israel":{}, "Italy":{}, "Jamaica":{}, "Jan Mayen":{}, "Japan":{}, "Jarvis Island":{}, "Jersey":{}, "Johnston Atoll":{}, "Jordan":{}, "Juan de Nova Island":{}, "Kazakhstan":{}, "Kenya":{}, "Kiribati":{}, "Korea, North":{}, "Korea, South":{}, "Kuwait":{}, "Kyrgyzstan":{}, "Laos":{}, "Latvia":{}, "Lebanon":{}, "Lesotho":{}, "Liberia":{}, "Libya":{}, "Liechtenstein":{}, "Lithuania":{}, "Luxembourg":{}, "Macau":{}, "Macedonia, Former Yugoslav Republic of":{}, "Madagascar":{}, "Malawi":{}, "Malaysia":{}, "Maldives":{}, "Mali":{}, "Malta":{}, "Man, Isle of":{}, "Marshall Islands":{}, "Martinique":{}, "Mauritania":{}, "Mauritius":{}, "Mayotte":{}, "Mexico":{}, "Micronesia, Federated States of":{}, "Midway Islands":{}, "Moldova":{}, "Monaco":{}, "Mongolia":{}, "Montserrat":{}, "Morocco":{}, "Mozambique":{}, "Namibia":{}, "Nauru":{}, "Nepal":{}, "Netherlands":{}, "Netherlands Antilles":{}, "New Caledonia":{}, "New Zealand":{}, "Nicaragua":{}, "Niger":{}, "Nigeria":{}, "Niue":{}, "Norfolk Island":{}, "Northern Mariana Islands":{}, "Norway":{}, "Oman":{}, "Pakistan":{}, "Palau":{}, "Panama":{}, "Papua New Guinea":{}, "Paraguay":{}, "Peru":{}, "Philippines":{}, "Pitcaim Islands":{}, "Poland":{}, "Portugal":{}, "Puerto Rico":{}, "Qatar":{}, "Reunion":{}, "Romainia":{}, "Russia":{}, "Rwanda":{}, "Saint Helena":{}, "Saint Kitts and Nevis":{}, "Saint Lucia":{}, "Saint Pierre and Miquelon":{}, "Saint Vincent and the Grenadines":{}, "Samoa":{}, "San Marino":{}, "Sao Tome and Principe":{}, "Saudi Arabia":{}, "Scotland":{}, "Senegal":{}, "Seychelles":{}, "Sierra Leone":{}, "Singapore":{}, "Slovakia":{}, "Slovenia":{}, "Solomon Islands":{}, "Somalia":{}, "South Africa":{}, "South Georgia and South Sandwich Islands":{}, "Spain":{}, "Spratly Islands":{}, "Sri Lanka":{}, "Sudan":{}, "Suriname":{}, "Svalbard":{}, "Swaziland":{}, "Sweden":{}, "Switzerland":{}, "Syria":{}, "Taiwan":{}, "Tajikistan":{}, "Tanzania":{}, "Thailand":{}, "Tobago":{}, "Toga":{}, "Tokelau":{}, "Tonga":{}, "Trinidad":{}, "Tunisia":{}, "Turkey":{}, "Turkmenistan":{}, "Tuvalu":{}, "Uganda":{}, "Ukraine":{}, "United Arab Emirates":{}, "United Kingdom":{}, "Uruguay":{}, "USA":{}, "Uzbekistan":{}, "Vanuatu":{}, "Venezuela":{}, "Vietnam":{}, "Virgin Islands":{}, "Wales":{}, "Wallis and Futuna":{}, "West Bank":{}, "Western Sahara":{}, "Yemen":{}, "Yugoslavia":{}, "Zambia":{}, "Zimbabwe":{}};
    var countySel = document.getElementById("countySel");
    for (var country in country_arr) {
        countySel.options[countySel.options.length] = new Option(country, country);
    }
};


function setData() {

   // countryElementId

    this.lang = document.getElementById("lang").value;
    if (this.lang == null || this.lang == 0)
    {
        document.getElementById("demo").innerHTML = "error in languge"
        return;
    }
    this.age  = document.getElementById("age").value;
    if (this.age <= 20)
    {
        document.getElementById("demo").innerHTML = "error in age"
        return;
    }
    this.country =document.getElementById("countySel").value;
    if (this.country == 0)
    {
        document.getElementById("demo").innerHTML = "error in country"
        return;
    }
    document.getElementById("demo").innerHTML = "age:" + this.age + " , lang : "+this.lang +", country:"+this.country;
    //alert("age:" + age.toString() + ", lang : "+lang.toString() +", country:"+country.toString())

    calculator(this.age);


};


function calculator(age) {
    var years = 20 ;
    let year = parseInt(age - years) ;
    var d = new Date();
    var todayYear = d.getFullYear();
    let serYear =todayYear - year ;
    document.getElementById("search").innerHTML = "Search in Year : "+serYear;

    
}



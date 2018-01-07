$(document).ready(function() {
    var d = $("<h1>getData:</h1>\n" +
        "<p><a href=\"https://www.w3schools.com/tags/ref_country_codes.asp\">list code to country</a></p>\n"+
    //    "<from><b>language:</b><select id=\"languageSel\" size=\"1\" name='language' ><option value=\"\"  selected=\"selected\">-- Select Language --</option> </select></from>\n" +
        "<from><b>age:</b><input type=\"number\" value=\"age\" id=\"age\" name='age'> </from>\n" +
        "<from><b>country:</b> <select id=\"countySel\" size=\"1\" name='county'><option value=\"\"  selected=\"selected\">-- Select Country --</option> </select> </from>\n" +
        "<button id=\"send\">send</button>\n" +"<br/>"+
        "<button id=\"btn_years\" formaction=\"showByYear\">byYear</button>\n" +
        "<button id=\"btn_country\">byCountry</button>\n" +
        "<p id=\"demo\">\n" +
        "<p id=\"search\">\n"+"<br/>"+
        "<div id=\"list\"></div>");
    $("body").append(d);
});

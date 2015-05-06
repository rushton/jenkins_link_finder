jQuery.noConflict();
jQuery(document).ready(function() {
    var lines = jQuery('pre.console-output').text().split('\n');
    var links = lines.map(function(v,k) {
        if(v.indexOf("Test failed: ") > 0) {
            test_name = v.split('Test failed: ')[1];
            search_offset = 1;
            while(true) {
                if(lines[k - search_offset].indexOf("Executing: GET") > 0) {
                    return {'test': test_name, 'url': lines[k-search_offset].split('GET')[1]};
                }
                if(lines[k - search_offset].indexOf("BEGIN TESTING " + test_name) > 0) {
                    return {'test': test_name, 'url': lines[k-search_offset + 2].split('Request path')[1]};
                }
                search_offset++;
                if (search_offset > 100) {
                    console.log("couldn't find url for " + test_name)
                    return "";
                }
            }
        }
        return "";
    }).filter(function(v) { return v != "" });
    if (links.length > 0) {
        console.log("%cREGRESSION FAILURES", 'font-size:15px;color:#a00');
        links.forEach(function(v) {
           console.log(v.test + ": " + v.url);
        });
        console.log("Num errors: " + links.length);
    } else {
        console.log("%cREGRESSION SUCCESS, NO FAILURES.", 'font-size:15px;color:#0a0');
    }
});

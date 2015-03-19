jQuery.noConflict();
jQuery(document).ready(function() {
        var lines = jQuery('pre.console-output').text().split('\n');
        var errors = lines.filter(function test(v,k) {
            return v.indexOf("[testng] FAILED") > 0;
        });
        var test_names = errors.map(function(v,k) {
            return v.split('FAILED: ')[1].split('(')[0];
        });
        var links = lines.map(function(v,k) {
            for (idx in test_names) {
                if(v.indexOf("Test failed: " + test_names[idx]) > 0) {
                    current_line = "";
                    search_idx = 1;
                    while(true) {
                        if(lines[k - search_idx].indexOf("Executing: GET") > 0) {
                            return {'test': test_names[idx], 'url': lines[k-search_idx].split('GET')[1]};
                        }
                        search_idx++;
                        if (search_idx > 100) {
                            console.log("couldn't find url for " + test_names[idx])
                            return "";
                        }
                    }
                }
            }
            return "";
        }).filter(function(v) { return v != "" });
        console.log("FAILING URLS");
        links.forEach(function(v) {
           console.log(v.test + ": " + v.url);
        });

});

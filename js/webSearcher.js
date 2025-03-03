const headers = {
    'authority': 'duckduckgo.com',
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'sec-fetch-dest': 'empty',
    'x-requested-with': 'XMLHttpRequest',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'referer': 'https://duckduckgo.com/',
    'accept-language': 'en-US,en;q=0.9',
}

const url = 'https://duckduckgo.com/';

/////////////////////////////////////////////////////////////////////////////////
function search(keywords, max_results=-1){
    console.log("Hitting DuckDuckGo for Token")

    // First make a request to above URL, and parse out the 'vqd'
    // This is a special token, which should be used in the subsequent request
    var params = new URLSearchParams();
    params.append('q', keywords);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Make the POST request

    // Reason: CORS header ‘Access-Control-Allow-Origin’ missing)
    // res = response
    // searchObj = match
    var match = 0;

    fetch(url, {
        method: 'POST',
        headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded', // or 'application/json' depending on the server's requirement
        },
        body: params.toString(),
    })
        .then(response => response.text())  // Get the response as text
        .then(text => {                     // Use a regular expression to match the 'vqd' value
        const regex = /vqd=([\d-]+)\&/i;    // 'i' flag for case-insensitivity
        match = regex.exec(text);
    
        if (match) {
            const vqd = match[1];  // Extract the vqd value
            console.log('found token vqd:', vqd);
        } else {
            console.log('No token found'); return;
        }
        })
        .catch(error => console.error('Error:', error));

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return;
    let requestUrl = url + "i.js";
    params = {
        'l': 'us-en',
        'o': 'json',
        'q': keywords,
        'vqd': match, // searchObj.group(1)
        'f': ',,,',
        'p': '1',
        'v7exp': 'a',
    }

    console.log(`Hitting Url: ${requestUrl}`);
    // const params = {
    //     key1: 'value1',
    //     key2: 'value2',
    // };

    let count = 0;
    while (count < 100){ // true
        count++;
        while(count < 100){ // true
            count++;
            try {
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                res = requests.get(requestUrl, headers=headers, params=params);
                var data = json.loads(res.text);

                const urlParams = new URLSearchParams(params).toString();
                
                fetch(`${requestUrl}?${urlParams}`, {
                    method: 'GET',
                    headers: headers,  // Attach headers
                })
                .then(response => response.json())  // Parse the response as JSON
                .then(data => {
                    console.log('Data:', data);  // Handle the JSON data
                })
                .catch(error => console.error('Error:', error));  // Handle errors


                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                
                break;
            } catch (error) {
                console.log("Hitting Url Failure - Sleep and Retry: %s", requestUrl);
                return;
                //time.sleep(5);
                continue;
            }    
        }

        console.log(`Hitting Url Success: ${requestUrl}`);
        printJson(data.results);

        if (data.next === undefined){
            console.log("No Next Page - Exiting");
            return;
            // exit(0);
        }            

        requestUrl = url + data["next"];
    }
}

function printJson(objs){
    objs.forEach(item => {
        console.log(`Width: ${item.width}, Height: ${item.height}`);
        console.log(`Thumbnail: ${item.thumbnail}`);
        console.log(`Url: ${item.url}`);
        console.log(`Title: ${item.title}`); // encode as unicode utf8?
        console.log(`Image: ${item.image}`);
        console.log("__________");
    });        
}

const fetch = require("node-fetch");

module.exports = {
	readHistoricalData(totalHistTweets){
		fetch("http://localhost:9870/webhdfs/v1/user/hadoop/twitter-java-save-txt/V01Sql.1608024278655/?op=LISTSTATUS")
		.then(response => response.json())
		.then(text => {
			var file = text.FileStatuses.FileStatus
			file.forEach(line => {
				var f = line
				//Identify files (parts)
				if(f.pathSuffix.substr(0,4) == "part"){
					console.log("Getting file with name: " + f.pathSuffix)

					//Getting the specific content of the file
					fetch("http://localhost:9870/webhdfs/v1/user/hadoop/twitter-java-save-txt/V01Sql.1608024278655/" + f.pathSuffix + "?op=OPEN")
					.then(response => response.text())
					.then(file => file.split("\n"))
					.then(tweets => {
						//For each tweet in the file of tweets, send to the client
						tweets.forEach(tweet => {
							try{
								totalHistTweets.push(JSON.parse(tweet))
							}catch(err){
								//console.log("Caused by: " + tweet)
								//console.log(err)
							}
						})
					})
				}
			})
		})
	}
}
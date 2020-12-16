//Plots the sentiments of tweets in comparrison with friend group sizes
function plotSentiments(sentiments, container){
	var graph = {
  		"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  		"description": "A scatterplot showing the relative sentiments of tweets in comparison to the persons friend group",
		"width": 400,
  		"height": 250,
  		"data": {
			"name": "table",
			"values": sentiments
		},
  		"mark": "bar",
		"transform":[
			{
			"filter": {"field": "friendsCount", "range": [0, 30000]}
			}
		],
  		"encoding": {
    			"x": {"field": "friendsCount", "type": "quantitative", "title": "Average number of friends", "aggregate": "average"},
			"y": {"field": "sentimentScore", "type": "ordinal", "title": "Sentiment"},
  		}
	}
  	vegaEmbed('#' + container, graph);
}
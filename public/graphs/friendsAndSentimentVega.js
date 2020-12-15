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
  		"mark": "point",
  		"encoding": {
    			"y": {"field": "friendsCount", "type": "quantitative", "title": "Friends"},
			"x": {"field": "sentimentScore", "type": "quantitative", "title": "Sentiment", "aggregate": "average"},
  		}
	}
  	vegaEmbed('#' + container, graph);
}
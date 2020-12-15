//Plots the sentiments of tweets mentioning others.
function plotSentimentsMentions(sentiments, container){
	var graph = {
  		"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  		"description": "A scatterplot showing the relative sentiments of tweets with and without metions of others",
		"width": 400,
  		"height": 250,
  		"data": {
			"name": "table",
			"values": sentiments
		},
  		"mark": "bar",
  		"encoding": {
    			"x": {"field": "hasMentioned", "type": "nominal", "title": "Has mentions", "sort": "-x"},
			"y": {"field": "sentimentScore", "type": "quantitative", "title": "Sentiment", "aggregate": "average", "scale": {"padding": 10}},
  		}
	}
  	vegaEmbed('#' + container, graph);

}
// Assign the specification to a local variable vlSpec.
var vlSpec = {
	$schema: 'https://vega.github.io/schema/vega-lite/v4.json',
	data: {
		values: [
			{a: 'C', b: 2},
			{a: 'C', b: 7},
			{a: 'C', b: 4},
			{a: 'D', b: 1},
			{a: 'D', b: 2},
			{a: 'D', b: 6},
			{a: 'E', b: 8},
			{a: 'E', b: 4},
			{a: 'E', b: 7}
		]
		},
	        mark: 'bar',
	        encoding: {
		y: {field: 'a', type: 'nominal'},
		x: {
			aggregate: 'average',
			field: 'b',
			type: 'quantitative',
			axis: {
				title: 'Average of b'
			}
		}
	}
};

// Embed the visualization in the container with id `vis`
vegaEmbed('#vis', vlSpec);

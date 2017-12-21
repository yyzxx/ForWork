**
 * 图表Option业务逻辑
 */
var gChartOptionOperate = {
	/**
	 * 创建图表参数列表 - 曲线为一条
	 * @param {Object} xAxisData：横坐标刻度尺
	 * @param {Object} seriesData： 数据
	 * @param {Object} legendData： 数据指示
	 */
	freshOptions1: function(xAxisData, seriesData, legendData) {
		var option = {
			tooltip: {
				trigger: 'axis' //鼠标移动后显示数据
			},
			legend: {
				data: [legendData]
			},
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				data: xAxisData
			}],
			yAxis: [{
				type: 'value'
			}],
			series: [
				{
					name: legendData,
					type: 'line', //设置为折线
					data: seriesData
				}
			]
		}
		return option;
	},
	
	
	/**
	 * 创建图表参数列表 - 曲线为两条条
	 * @param {Object} xAxisData：横坐标刻度尺
	 * @param {Object} seriesData： 数据
	 * @param {Object} legendData： 数据指示
	 */
	newOptions2: function(xAxisData, seriesData1, seriesData2, legendData1, legendData2) {
		var option = {
			tooltip: {
				trigger: 'axis' //鼠标移动后显示数据
			},
			legend: {
				data: [legendData1, legendData2]
			},
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				data: xAxisData
			}],
			yAxis: [{
				type: 'value'
			}],
			series: [
				{
					name: legendData1,
					type: 'line', //设置为折线
					data: seriesData1
				},
				{
					name: legendData2,
					type: 'line', //设置为折线
					data: seriesData2
				}
			]
		}

		return option;
	},
	
	/**
	 * 创建图表参数列表 - 曲线为N条
	 * @param {Object} xAxisData：横坐标刻度尺
	 * @param {Object} seriesData： 数据
	 * @param {Object} legendData： 数据指示
	 */
	newOptionsN: function(xAxisData, seriesData, legendData) {
		var option = {
			tooltip: {
				trigger: 'axis' //鼠标移动后显示数据
			},
			legend: {
				data: legendData
			},
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				data: xAxisData
			}],
			yAxis: [{
				type: 'value'
			}],
			series: seriesData
		}

		return option;
	},
	
	/**
	 * 创建图表参数列表 - 曲线为一条 单位(%)
	 * @param {Object} xAxisData：横坐标刻度尺
	 * @param {Object} seriesData： 数据
	 * @param {Object} legendData： 数据指示
	 */
	newOptions1_Percentage: function(xAxisData, seriesData, legendData) {
		var option = {
			tooltip: {
				trigger: 'axis' //鼠标移动后显示数据
			},
			legend: {
				data: [legendData]
			},
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				data: xAxisData
			}],
			yAxis: [{
				type: 'value',
				axisLabel : {
	                formatter: '{value} %'
	            }
			}],
			series: [
				{
					name: legendData,
					type: 'line', //设置为折线
					data: seriesData
				}
			]
		}

		return option;
	},
	
	/**
	 * 创建图表参数列表 - 曲线为两条条 单位(%)
	 * @param {Object} xAxisData：横坐标刻度尺
	 * @param {Object} seriesData： 数据
	 * @param {Object} legendData： 数据指示
	 */
	newOptions2_Percentage: function(xAxisData, seriesData1, seriesData2, legendData1, legendData2) {
		var option = {
			tooltip: {
				trigger: 'axis' //鼠标移动后显示数据
			},
			legend: {
				data: [legendData1, legendData2]
			},
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				data: xAxisData
			}],
			yAxis: [{
				type: 'value',
				axisLabel : {
	                formatter: '{value} %'
	            }
			}],
			series: [
				{
					name: legendData1,
					type: 'line', //设置为折线
					data: seriesData1
				},
				{
					name: legendData2,
					type: 'line', //设置为折线
					data: seriesData2
				}
			]
		}

		return option;
	},
	
	/**
	 * 创建图表参数列表 - 曲线为N条 单位(%)
	 * @param {Object} xAxisData：横坐标刻度尺
	 * @param {Object} seriesData： 数据
	 * @param {Object} legendData： 数据指示
	 */
	newOptionsN_Percentage: function(xAxisData, seriesData, legendData) {
		var option = {
			tooltip: {
				trigger: 'axis' //鼠标移动后显示数据
			},
			legend: {
				data: legendData
			},
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				data: xAxisData
			}],
			yAxis: [{
				type: 'value',
				axisLabel : {
	                formatter: '{value} %'
	            }
			}],
			series: seriesData
		}

		return option;
	}
	
}
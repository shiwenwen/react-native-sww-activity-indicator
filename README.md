# react-native-sww-activity-indicator
兼容ios android的ActivityIndicator 支持文字指示（例如显示进度）， 菊花会有个透明背景遮挡住下面的所有视图，拦截住点击
###使用方法

	import SActivityIndicator from 'react-native-sww-activity-indicator';
	//在任意需要显示菊花的地方 （
		SActivityIndicator.show(animated=true,message)
		会返回一个菊花的实例对象
		//animated 出现和消失的时候是否带动画
		//message 文字指示的内容 可空，则不显示
	//在操作完成需要隐藏菊花的时候				
		SActivityIndicator.hide(AIV) 
		//AIV:需要隐藏的菊花的实例
		
		
###示例
 ![image](https://github.com/shiwenwen/react-native-sww-activity-indicator/blob/master/SActivityIndicator.gif)

		






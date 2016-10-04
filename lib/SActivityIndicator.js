/**
 * Created by Shiwenwen on 16/9/27.
 */

import React,{Component,PropTypes} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Dimensions,
  Animated,
  Easing,
  Text
} from 'react-native';
import RootSiblings from 'react-native-root-siblings'
var {width, height} = Dimensions.get('window');

const  ANIMATED_DURATION = 250;
export default class SActivityIndicator extends Component{
  static animated = true
  static message = ''

  /**
   * 显示菊花
   * @param animated 是否显示出现和消失动画
   * @param message 菊花底部文字
   * @returns {SiblingsManager}
   */
  static show(animated=true,message){
    SActivityIndicator.animated = animated
    SActivityIndicator.message = message
    let root = new RootSiblings(<ActivityIndicatorContent
      animated={animated}
      message={message}
    />)

    return root
  }

  /**
   * 隐藏菊花
   * @param AIV 需要隐藏的菊花
   */
  static hide(AIV){
    if (AIV instanceof RootSiblings) {

      AIV.update(<ActivityIndicatorContent
        animated={SActivityIndicator.animated}
        message={SActivityIndicator.message}
        isHide={true}
      />)
    }
  }

  /**
   * 更新菊花文字
   * @param AIV 需要更新文字的菊花
   * @param message 文字内容
   */
  static  updateMessage(AIV,message){
    AIV.update(<ActivityIndicatorContent
      animated={SActivityIndicator.animated}
      message={message}
    />)
  }

};

/**
 * 菊花内部模块
 */
class ActivityIndicatorContent extends Component{

  constructor(props) {
    super(props);
    this.state = {
      opacity:new Animated.Value(0)
    };
  }

  static defaultProps={
    animated:true,
    isHide:false

  }
  static propTypes={
    animated:PropTypes.bool,
    message:PropTypes.string,
    updateMessage:PropTypes.func,
    isHide:PropTypes.bool
  }
  render(){
    return(
      <View style={[styles.background,this.props.styles]}>
        <Animated.View style={[styles.activeBg,{opacity:this.state.opacity}]}>
          <ActivityIndicator
            animating={true}
            size="large"
          />
          {this._messageView()}
        </Animated.View>
      </View>
    )

  }
  _messageView(){
    if (this.props.message){
      return(
        <Text style={styles.message}>
          {this.props.message}
        </Text>
      )
    }
  }
  componentDidMount() {
    this._show();

  }

  componentDidUpdate() {
    if (this.props.isHide) {
      this._hide()
    }
  }
  componentWillUnmount(){
    this._hide();
  };
  _show(){
    Animated.timing(this.state.opacity,{
      toValue: 1,
      duration: this.props.animated ? ANIMATED_DURATION : 0,
      easing: Easing.out(Easing.ease)
    }).start()

  }
  _hide(){
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: this.props.animated ? ANIMATED_DURATION : 0,
      easing: Easing.in(Easing.ease)
    }).start(({finished})=>{
      if(finished){
        this.props.siblingManager.destroy()
      }
    });
  };
}




const styles = StyleSheet.create({
  background:{
    backgroundColor:'rgba(0,0,0,0.05)',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    width:width,
    height:height,
    left:0,
    top:0
  },
  activeBg:{
    padding:15,
    backgroundColor:'rgba(0,0,0,0.6)',
    borderRadius:7,
    justifyContent:'center',
    alignItems:'center'
  },
  message:{
    color:'white',
    fontSize:15,
    marginTop:5,
    opacity:0.8
  }


});
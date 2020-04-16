import Taro, { useState, useEffect, useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './header.scss'
import { AtIcon } from 'taro-ui'

function Header(props) {
  let [loction, setLoction] = useState({});
  let [currentLoc, setLoct] = useState({}) // 当前定位
  // 第一次进来查找历史记录
  useDidShow(() => { // 等同于 componentDidHide 页面生命周期钩子
    try {
      var loct = Taro.getStorageSync('loct');
      if (loct) {
        console.log('loct', loct);
        setLoct(loct)
      }
    } catch (e) {
      console.log('错误信息', e)
    }
  })
  useEffect(() => {
    if (props.weatherList) {
      setLoction(props.weatherList.loc || {});
    }
  }, [props.weatherList]);
  const clickMap = () => {
    Taro.navigateTo({ url: '/pages/search/search'})
  }
  return (
    <View>
      <View className="header">
        <View className="header-left" onClick={clickMap}>
          <AtIcon value='map-pin' size="16" className="icon"></AtIcon>
          <Text v-else>{loction.length === 2 ? loction[0] + ' - ' + loction[1] : (loction[1] || '').trim() + ' - ' + (loction[2] || '').trim()}</Text>
        </View>
        <View className="header-right">
          <AtIcon value='file-generic' size="16" className="icon"></AtIcon>
        </View>

      </View>
    </View>
  )
}
export default Header

import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './main.scss'

function Main(props) {
  const wind_direction = ['微风', '东北风', '东风', '东南风', '南风', '西南风', '西风', '西北风', '北风']; // 风向

  const [isShow, setShow] = useState(true);
  let [observe, setObserve] = useState({});
  let [tips, setTips] = useState({});
  useEffect(() => {
    setTimeout(() => {
      setShow(!isShow);
    }, 8000);
  }, [isShow]);
  useEffect(() => {
    if (props.weatherList) {
      setObserve(props.weatherList.observe || {});
      setTips(props.weatherList.tips || {});
    }
  }, [props.weatherList]);
  return (
    <View className="main">
      <View className="t-c">
          <View className="f-100">{observe.degree}°</View>
          <View>{observe.weather}</View>

          <View className="animation">
            <Text className={isShow ? 'show item' : 'item'}>
              湿度 {observe.humidity}%
            </Text>
            <Text className={isShow ? 'item' : 'show item'}>
              {wind_direction[observe.wind_direction]} {observe.wind_power}级
            </Text>
          </View>

          <View className="ptb-50">
            <Text>
              {tips.observe && tips.observe[0]}
            </Text>
          </View>

        </View>
    </View>
  )
}
export default Main
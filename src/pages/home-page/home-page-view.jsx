import { HomeOutlined, SkinOutlined,} from '@ant-design/icons';
import { Layout, Menu, Card, Row, Col } from 'antd';
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SuggestedClothes from '../../components/SuggestedClothes/SuggestedClothes';
// import WeatherForecast from '../../components/WeatherForecast/WeatherForecast';
import styles from './home-page-view.module.css'

const HomePageView = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { Content, Footer, Sider } = Layout;

    const [avgTemp, setAvgTemp] = useState(null);
    const [weatherCat, setWeatherCat] = useState(null);

    const [dayCond, setDayCond] = useState(null);
    const [lowTemp, setLowTemp] = useState(null);
    const [highTemp, setHighTemp] = useState(null);
    
    const categorizeTemp = (temp) => {
        console.log('categorizing temp', temp)
        if (Number(temp) >= 80) {
            return "hot";
        } else if (Number(temp) >= 70) {
            return "warm";
        } else if (Number(temp) >= 60) {
            return "chilly";
        } else {
            return "cold";
        }
    };

    const getWeather = async () => {
        try {
            const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${process.env.REACT_APP_WEATHER_ZIPCODE}`);
            const forecast = await res.json();
            const avgDailyTemp = forecast.forecast.forecastday[0].day.avgtemp_f;
            setAvgTemp(avgDailyTemp);
            setDayCond(forecast.forecast.forecastday[0].day.condition.text);
            setLowTemp(forecast.forecast.forecastday[0].day.mintemp_f);
            setHighTemp(forecast.forecast.forecastday[0].day.maxtemp_f);
            console.log(forecast);
            // console.log(typeof forecast.forecast.forecastday[0].day.avgtemp_f);
            console.log('avg temp before', avgTemp);
            setWeatherCat(categorizeTemp(avgDailyTemp));
            console.log('avg temp after', avgTemp);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        console.log('getting weather');
        getWeather();
        // setWeatherCat(categorizeTemp(avgTemp));
    }, []);

    const WeatherForecast = () => {
        return (
            <div>
                <div className={styles['avg-temp']}>{avgTemp}</div>
                <div className={styles['high-low-temp']}>{lowTemp} | {highTemp}</div>
                <div className={styles['weather-cond']}>{dayCond.toLowerCase()}</div>
            </div>
        )
    }


    return (
        <Layout
        style={{
            minHeight: '100vh',
        }}
        >
            <Sider
                theme="light"
                style={{
                    backgroundColor: 'white',
                }}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <Menu
                    theme="light"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    onClick={(info) => console.log(info)}
                >
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to={"/"}>Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<SkinOutlined />}>
                        <Link to={"/closet"}>Closet</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content
                    style={{
                        padding: '0 16px',
                        backgroundColor: '#f5f3f4',
                    }}
                >
                    {avgTemp ? (
                        <div>
                            <Card className={styles['day-details']}>
                                <div className={styles['text-container']}>
                                    <div className={styles['welcome-msg']}>Hi Mia, it's a great day, check out these clothes!</div>
                                    <div className={styles['weather']}>
                                        <WeatherForecast />
                                    </div>
                                </div>
                            </Card>
                            <SuggestedClothes weatherCategory={weatherCat} />
                        </div>) : null}
                </Content>
            </Layout>
        </Layout>
    );
};

export default HomePageView;
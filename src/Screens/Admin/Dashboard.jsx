import { useQuery } from '@tanstack/react-query';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import User from '../../assets/images/dash-user.svg?react';
import dcardIcon1 from '../../assets/images/dcardIcon1.png';
import dcardIcon2 from '../../assets/images/dcardIcon2.png';
import dcardIcon3 from '../../assets/images/dcardIcon3.png';
import dcardIcon4 from '../../assets/images/dcardIcon4.png';
import dcardIcon5 from '../../assets/images/dcardIcon5.png';
import graphImg1 from '../../assets/images/graphImg1.png';
import graphImg2 from '../../assets/images/graphImg2.png';
import graphImg3 from '../../assets/images/graphImg3.png';
import graphImg4 from '../../assets/images/graphImg4.png';
import graphImg5 from '../../assets/images/graphImg5.png';
import Receivable from '../../assets/images/receivable.svg?react';
import CustomSelect from '../../Components/CustomSelect';
import withModal from '../../HOC/withModal';
import { usePageTitle } from '../../Hooks/usePageTitle';
import { lineGraphOptions } from '../../Mocks/MockData';
import {
  getDashboardData,
  getEarningChart,
  getUserChart,
} from '../../Services/Admin/Dashboard';
import useThemeStore from '../../Stores/ThemeStore';
import { themeDictionary } from '../../Utils/Constants/ColorConstants';
import { dateRangeSelectOptions } from '../../Utils/Constants/SelectOptions';

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler
);

const Dashboard = ({ showModal }) => {
  usePageTitle('Dashboard');
  const { theme } = useThemeStore();
  const navigate = useNavigate();

  const [userChartType, setUserChartType] = useState('yearly');
  const [earningChartType, setEarningChartType] = useState('yearly');
  const [linegraphStyling, setLineGraphStyling] = useState({});

  useEffect(() => {
    const graphStyling = {
      borderColor: '',
      pointBorderColor: '',
      backgroundColor: '',
    };
    graphStyling.borderColor = themeDictionary[theme][0];
    graphStyling.pointBorderColor = themeDictionary[theme][1];
    graphStyling.backgroundColor = `${themeDictionary[theme][0]}55`;
    setLineGraphStyling(graphStyling);
  }, [theme]);

  const handleDateRangeSelect = (graph, v) => {
    if (graph === 'totalUsers') setUserChartType(v.target.value);
    if (graph === 'totalEarning') setEarningChartType(v.target.value);
  };

  const cardData = {
    total_earnings: 33,
    new_bookings: 33,
    new_users: 33,
    total_coach: 33,
    new_service_provider: 33,
  };
  // Get Dashboard Card Data
  // const {
  //   data: cardData,
  //   isLoading: cardDataLoading
  // } = useQuery({
  //   queryKey: ['cardData', 'card'],
  //   queryFn: getDashboardData,
  //   refetchOnWindowFocus: false,
  //   retry: 1,
  // });


  // Get Charts Data based on selected type
  const { data: userChart } = useQuery({
    queryKey: ['userChart', userChartType],
    queryFn: () => getUserChart(userChartType),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: earningChart } = useQuery({
    queryKey: ['earningChart', earningChartType],
    queryFn: () => getEarningChart(earningChartType),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Reusable Chart Component
  const renderChart = (title, chartData, chartType, handleChange) => {
    return (
      <div className="d-card chart-padding mt-3">
        <div className="d-flex justify-content-between mb-3">
          <h4 className="d-card-title">{title}</h4>
          <CustomSelect
            name="Monthly"
            options={dateRangeSelectOptions}
            firstIsLabel={false}
            className="gray"
            onChange={(e) => handleChange(chartType, e)}
            value={userChartType}
          />
        </div>
        <div style={{ height: 600 }} className="dashboardChart">
          <Line
            data={{
              labels: chartData?.map((item) => item[0]),
              datasets: [
                {
                  data: chartData?.map((item) => item[1]),
                  borderRadius: 50,
                  tension: 0.4,
                  pointRadius: 0,
                  pointHoverRadius: 6,
                  pointBorderWidth: 5,
                  pointHoverBorderWidth: 5,
                  pointBackgroundColor: '#fff',
                  borderWidth: 2,
                  fill: { target: 'origin' },
                  ...linegraphStyling,
                },
              ],
            }}
            options={lineGraphOptions}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="screen-title d-inline-block">Dashboard</h2>
      <div className="row">
        <div className="col-12 col-sm-6 col-xxl-4 mb-4">
          <div className="d-card chart-padding">
            <div className="d-flex justify-content-between gap-3 gap-md-3">
              <div className='d-flex gap-3 gap-md-3'>
                <div className="dash-icon-wrappe">
                  <img src={dcardIcon1} alt="" />
                </div>
                <div className="glance-info-text">
                  <h6>Total Earnings</h6>
                  <h4>{cardData?.total_earnings}</h4>
                </div>
              </div>
              <div className='graphImg'>
                <img src={graphImg1} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xxl-4 mb-4">
          <div className="d-card chart-padding">
            <div className="d-flex justify-content-between gap-3 gap-md-3">
              <div className='d-flex gap-3 gap-md-3'>
                <div className="dash-icon-wrappe">
                  <img src={dcardIcon2} alt="" />
                </div>
                <div className="glance-info-text">
                  <h6>New Bookings</h6>
                  <h4>{cardData?.new_bookings}</h4>
                </div>
              </div>
              <div className='graphImg'>
                <img src={graphImg2} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xxl-4 mb-4">
          <div className="d-card chart-padding">
            <div className="d-flex justify-content-between gap-3 gap-md-3">
              <div className='d-flex gap-3 gap-md-3'>
                <div className="dash-icon-wrappe">
                  <img src={dcardIcon3} alt="" />
                </div>
                <div className="glance-info-text">
                  <h6>New Users</h6>
                  <h4>{cardData?.new_users}</h4>
                </div>
              </div>
              <div className='graphImg'>
                <img src={graphImg3} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xxl-4 mb-4">
          <div className="d-card chart-padding">
            <div className="d-flex justify-content-between gap-3 gap-md-3">
              <div className='d-flex gap-3 gap-md-3'>
                <div className="dash-icon-wrappe">
                  <img src={dcardIcon4} alt="" />
                </div>
                <div className="glance-info-text">
                  <h6>Total Earnings</h6>
                  <h4>{cardData?.total_coach}</h4>
                </div>
              </div>
              <div className='graphImg'>
                <img src={graphImg4} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xxl-4 mb-4">
          <div className="d-card chart-padding">
            <div className="d-flex justify-content-between gap-3 gap-md-3">
              <div className='d-flex gap-3 gap-md-3'>
                <div className="dash-icon-wrappe">
                  <img src={dcardIcon5} alt="" />
                </div>
                <div className="glance-info-text">
                  <h6>New Service Provider</h6>
                  <h4>{cardData?.new_service_provider}</h4>
                </div>
              </div>
              <div className='graphImg'>
                <img src={graphImg5} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {renderChart(
        'Total Earnings',
        userChart,
        'totalEarnings',
        handleDateRangeSelect
      )}
      {renderChart(
        'New Bookings Received',
        earningChart,
        'newBookingsReceived',
        handleDateRangeSelect
      )}
      {renderChart(
        'New Users Registered',
        earningChart,
        'newUsersRegistered',
        handleDateRangeSelect
      )}
      {renderChart(
        'New Coach Registered',
        earningChart,
        'newCoachRegistered',
        handleDateRangeSelect
      )}
      {renderChart(
        'New Service Provider Registered',
        earningChart,
        'newServiceProviderRegistered',
        handleDateRangeSelect
      )}
    </div>
  );
};

export default withModal(Dashboard);

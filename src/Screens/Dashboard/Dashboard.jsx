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
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import Expense from '../../assets/images/expense.svg?react';
import Payable from '../../assets/images/payable.svg?react';
import Receivable from '../../assets/images/receivable.svg?react';
import Revenue from '../../assets/images/revenue.svg?react';
import CustomSelect from '../../Components/CustomSelect';
import withModal from '../../HOC/withModal';
import { usePageTitle } from '../../Hooks/usePageTitle';
import {
  cashBalanceData,
  lineGraphOptions,
  netIncomeRatioData,
  remittanceData,
} from '../../Mocks/MockData';
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
  const [remittanceChartData, setRemittanceChartData] =
    useState(remittanceData);
  const [cashBalanceChartData, setCashBalanceChartData] =
    useState(cashBalanceData);
  const [netIncomeRationChartData, setNetIncomeRationChartData] =
    useState(netIncomeRatioData);

  useEffect(() => {
    let doughnutWithThemeColors = JSON.parse(JSON.stringify(remittanceData));
    let barWithThemeColors = JSON.parse(JSON.stringify(cashBalanceData));
    let lineWithThemeColors = JSON.parse(JSON.stringify(netIncomeRatioData));
    doughnutWithThemeColors.datasets[0].backgroundColor = [
      themeDictionary[theme][0],
      themeDictionary[theme][1],
      themeDictionary[theme][2],
      themeDictionary[theme][3],
    ];
    barWithThemeColors.datasets[0].backgroundColor = [
      themeDictionary[theme][0],
      themeDictionary[theme][1],
    ];
    lineWithThemeColors.datasets[0].borderColor = themeDictionary[theme][0];
    lineWithThemeColors.datasets[0].pointBorderColor =
      themeDictionary[theme][1];
    lineWithThemeColors.datasets[0].backgroundColor = `${themeDictionary[theme][0]}55`;
    setCashBalanceChartData(barWithThemeColors);
    setRemittanceChartData(doughnutWithThemeColors);
    setNetIncomeRationChartData(lineWithThemeColors);
  }, [theme]);

  const handleDateRangeSelect = (graph, v) => {
    console.log('DateRange Select changed:', graph, v.target.value);
  };

  return (
    <div>
      <h2 className="screen-title d-inline-block">Dashboard</h2>
      <div className="row">
        <div className="col-12 col-sm-6 col-xxl-3 mb-4 mb-xxl-0">
          <div className="d-card chart-padding">
            <div className="d-flex gap-3 gap-md-3">
              <div className="dash-icon-wrapper">
                <Revenue className="dash-icon" />
              </div>
              <div className="glance-info-text">
                <h6>Total Revenue</h6>
                <h4>$350.4</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xxl-3 mb-4 mb-xxl-0">
          <div className="d-card chart-padding">
            <div className="d-flex gap-3 gap-md-3">
              <div className="dash-icon-wrapper">
                <Expense className="dash-icon" />
              </div>
              <div className="glance-info-text">
                <h6>Monthly Expense</h6>
                <h4>$642.39</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xxl-3 mb-4 mb-xxl-0">
          <div className="d-card chart-padding">
            <div className="d-flex gap-3 gap-md-3">
              <div className="dash-icon-wrapper">
                <Receivable className="dash-icon" />
              </div>
              <div className="glance-info-text">
                <h6>Amount Receivable</h6>
                <h4>$56.63</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xxl-3 mb-4 mb-xxl-0">
          <div className="d-card chart-padding">
            <div className="d-flex gap-3 gap-md-3">
              <div className="dash-icon-wrapper">
                <Payable className="dash-icon" />
              </div>
              <div className="glance-info-text">
                <h6>Amount Paybale</h6>
                <h4>$1,000</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-0 mt-xxl-4">
        <div className="col-12 col-lg-6">
          <div className="d-card chart-padding">
            <div className="d-flex justify-content-between mb-3">
              <h4 className="d-card-title">Remittance</h4>
              <CustomSelect
                name="Monthly"
                options={dateRangeSelectOptions}
                firstIsLabel={false}
                className="gray"
                onChange={(e) => handleDateRangeSelect('remittance', e)}
              />
            </div>
            <div className="dashboardChart">
              <Doughnut
                data={remittanceChartData}
                options={remittanceChartData.options}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 mt-4 mt-lg-0">
          <div className="d-card chart-padding">
            <div className="d-flex justify-content-between mb-3">
              <h4 className="d-card-title">Cash Balance</h4>
              <CustomSelect
                name="Monthly"
                options={dateRangeSelectOptions}
                firstIsLabel={false}
                className="gray"
                onChange={(e) => handleDateRangeSelect('cashBalance', e)}
              />
            </div>
            <div className="dashboardChart">
              <Bar
                data={cashBalanceChartData}
                options={cashBalanceChartData.options}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-card chart-padding mt-4">
        <div className="d-flex justify-content-between mb-3">
          <h4 className="d-card-title">Net Income Ratio</h4>
          <CustomSelect
            name="Monthly"
            options={dateRangeSelectOptions}
            firstIsLabel={false}
            className="gray"
            onChange={(e) => handleDateRangeSelect('netIncome', e)}
          />
        </div>
        <div style={{ height: 600 }} className="dashboardChart">
          <Line data={netIncomeRationChartData} options={lineGraphOptions} />
        </div>
      </div>
      {/* <div className="row mt-4"></div> */}
    </div>
  );
};

export default withModal(Dashboard);

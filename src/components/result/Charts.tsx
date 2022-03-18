import { Doughnut, Bar, Pie, Line } from 'react-chartjs-2';
import { Box } from '@chakra-ui/react';
// import Chart from 'chart.js/auto';
import { Chart, ArcElement, Legend, Tooltip, Title } from 'chart.js';

Chart.register(ArcElement, Legend, Tooltip, Title);

const Charts = () => {
  const data = {
    labels: ['Sound', 'Exercise'],
    datasets: [
      {
        // label:'Scores',
        data: [50, 50],
        backgroundColor: ['rgba(171, 246, 190, 0.8)', 'rgba(74, 211, 115, 1)'],
      },
    ],
  };
  return (
    <Box>
      <Doughnut data={data}></Doughnut>
    </Box>
  );
};
export default Charts;

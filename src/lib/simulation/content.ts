export const CODE_SNIPPETS = [
    `// Implementing the complex algorithm for distributed caching
import { Cache } from './cache-manager';

export class DistributedCache implements Cache {
  private nodes: string[];

  constructor(nodes: string[]) {
    this.nodes = nodes;
  }

  async get(key: string): Promise<string | null> {
    const node = this.hashRing.getNode(key);
    console.log(\`Fetching \${key} from \${node}\`);
    return await this.fetchFromNode(node, key);
  }

  // TODO: Fix the race condition in the write buffer
  async set(key: string, value: string): Promise<void> {
    const node = this.hashRing.getNode(key);
    await this.connectToNode(node);
    // Simulating network latency
    await new Promise(resolve => setTimeout(resolve, 50));
    this.localBuffer.set(key, value);
  }
}
`,
    `// React Component for Data Visualization
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

const DashboardWidget = ({ dataId }: { dataId: string }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch critical business metrics
    fetch(\`/api/metrics/\${dataId}\`)
      .then(res => res.json())
      .then(data => {
        setChartData({
          labels: ['Revenue', 'Expenses', 'Profit'],
          datasets: [{
             data: [data.revenue, data.expenses, data.profit],
             backgroundColor: ['#36A2EB', '#FF6384', '#4BC0C0']
          }]
        });
        setLoading(false);
      });
  }, [dataId]);

  if (loading) return <div>Loading business intelligence...</div>;

  return (
    <div className="p-4 bg-white rounded shadow-lg">
      <h3 className="text-lg font-bold mb-4">Q3 Performance</h3>
      <Doughnut data={chartData} />
    </div>
  );
};
`
];

export const MOCK_SO_QUESTIONS = [
    {
        title: "How to exit Vim? I'm trapped for 3 days",
        votes: 12403,
        answers: [
            {
                author: "DevGod",
                score: 5432,
                content: `Just pull the plug. It's the only safe way.\n\nOr try \`:q!\` if you want to be boring.`
            }
        ]
    },
    {
        title: "Why is 'undefined' not a function?",
        votes: 89,
        answers: [
            {
                author: "JScriptMaster",
                score: 12,
                content: "Because you are trying to call something that doesn't exist. Check your imports."
            }
        ]
    }
];

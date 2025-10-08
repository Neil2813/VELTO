import { AlertTriangle, Shield, CheckCircle, XCircle } from 'lucide-react';
import { Theme } from '../types';
import { mockTransactions } from '../mockData';

interface FraudDetectorProps {
  theme: Theme;
}

export default function FraudDetector({ theme }: FraudDetectorProps) {
  const fraudulentTransactions = mockTransactions.filter((t) => t.isFraud);
  const safeTransactions = mockTransactions.filter((t) => !t.isFraud);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Fraud Detection Monitor</h2>
        <p className="opacity-70">AI-powered transaction analysis and anomaly detection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 border ${theme.accent} border-opacity-20 rounded-2xl backdrop-blur-xl`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg border ${theme.accent} flex items-center justify-center ${theme.glow} shadow-lg`}>
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-xs opacity-60 uppercase tracking-wider">Status</span>
          </div>
          <div className="text-2xl font-bold mb-1">
            {fraudulentTransactions.length > 0 ? 'Alert' : 'Protected'}
          </div>
          <div className="text-sm opacity-70">Real-time monitoring active</div>
        </div>

        <div className={`p-6 border ${theme.accent} border-opacity-20 rounded-2xl backdrop-blur-xl`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg border border-red-400 flex items-center justify-center shadow-red-400/50 shadow-lg`}>
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <span className="text-xs opacity-60 uppercase tracking-wider">Suspicious</span>
          </div>
          <div className="text-2xl font-bold mb-1 text-red-400">{fraudulentTransactions.length}</div>
          <div className="text-sm opacity-70">Flagged transactions</div>
        </div>

        <div className={`p-6 border ${theme.accent} border-opacity-20 rounded-2xl backdrop-blur-xl`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg border border-emerald-400 flex items-center justify-center shadow-emerald-400/50 shadow-lg`}>
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-xs opacity-60 uppercase tracking-wider">Verified</span>
          </div>
          <div className="text-2xl font-bold mb-1 text-emerald-400">{safeTransactions.length}</div>
          <div className="text-sm opacity-70">Safe transactions</div>
        </div>
      </div>

      {fraudulentTransactions.length > 0 && (
        <div className={`p-8 border border-red-400 border-opacity-40 rounded-2xl backdrop-blur-xl bg-red-400 bg-opacity-5 animate-fade-in`}>
          <div className="flex items-center space-x-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h3 className="text-xl font-bold text-red-400">Suspicious Activity Detected</h3>
          </div>

          <div className="space-y-4">
            {fraudulentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-6 border border-red-400 border-opacity-30 rounded-xl backdrop-blur-xl hover:border-opacity-60 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-bold text-lg">{transaction.description}</div>
                    <div className="text-sm opacity-60 mt-1">{transaction.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-400">
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                    <div className="text-xs opacity-60 mt-1">{transaction.category}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-400 bg-opacity-10 rounded-lg">
                    <span className="text-sm">Fraud Confidence</span>
                    <span className="font-bold text-red-400">{transaction.confidence}%</span>
                  </div>

                  <div className="text-sm opacity-70 leading-relaxed">
                    This transaction has been flagged due to unusual patterns:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Unusual transaction time (3:47 AM)</li>
                      <li>Different geographic location detected</li>
                      <li>Deviates 92% from normal spending pattern</li>
                      <li>New merchant, first-time transaction</li>
                    </ul>
                  </div>

                  <div className="flex space-x-3 pt-3">
                    <button className="flex-1 px-4 py-2 border border-emerald-400 border-opacity-40 rounded-lg backdrop-blur-xl hover:border-opacity-60 transition-all">
                      <span className="text-emerald-400">Approve</span>
                    </button>
                    <button className="flex-1 px-4 py-2 border border-red-400 border-opacity-40 rounded-lg backdrop-blur-xl hover:border-opacity-60 transition-all">
                      <span className="text-red-400">Block & Report</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={`p-8 border ${theme.accent} border-opacity-20 rounded-2xl backdrop-blur-xl`}>
        <h3 className="text-xl font-bold mb-6">Recent Transactions</h3>
        <div className="space-y-3">
          {safeTransactions.slice(0, 5).map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border border-white border-opacity-10 rounded-xl backdrop-blur-xl hover:border-opacity-20 transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg border border-emerald-400 flex items-center justify-center shadow-emerald-400/50 shadow-lg`}>
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="font-medium">{transaction.description}</div>
                  <div className="text-sm opacity-60">{transaction.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold ${transaction.amount > 0 ? 'text-emerald-400' : ''}`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </div>
                <div className="text-xs opacity-60">{transaction.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`p-8 border ${theme.accent} border-opacity-20 rounded-2xl backdrop-blur-xl`}>
        <h3 className="text-xl font-bold mb-6">Protection Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Real-time Monitoring',
              description: 'Transactions analyzed instantly using neural networks',
              icon: Shield,
            },
            {
              title: 'Pattern Recognition',
              description: 'AI learns your spending habits to detect anomalies',
              icon: AlertTriangle,
            },
            {
              title: 'Location Tracking',
              description: 'Verify transactions against known locations',
              icon: CheckCircle,
            },
            {
              title: 'Instant Alerts',
              description: 'Get notified immediately of suspicious activity',
              icon: XCircle,
            },
          ].map((feature) => (
            <div key={feature.title} className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-lg border ${theme.accent} flex items-center justify-center ${theme.glow} shadow-lg flex-shrink-0`}>
                <feature.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold mb-1">{feature.title}</div>
                <div className="text-sm opacity-70">{feature.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

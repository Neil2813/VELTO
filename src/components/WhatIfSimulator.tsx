import { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Theme, TimelineEvent } from '../types';
import { mockTimelineEvents } from '../mockData';

interface WhatIfSimulatorProps {
  theme: Theme;
}

const eventTypes = [
  { type: 'income', label: 'Income Increase', icon: TrendingUp, color: 'emerald' },
  { type: 'expense', label: 'Major Expense', icon: TrendingDown, color: 'red' },
  { type: 'investment', label: 'Investment', icon: DollarSign, color: 'blue' },
];

export default function WhatIfSimulator({ theme }: WhatIfSimulatorProps) {
  const [events, setEvents] = useState<TimelineEvent[]>(mockTimelineEvents);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    date: '2026-01',
    type: 'expense' as TimelineEvent['type'],
    amount: 0,
    description: '',
  });

  const addEvent = () => {
    const event: TimelineEvent = {
      id: Date.now().toString(),
      ...newEvent,
    };
    setEvents([...events, event].sort((a, b) => a.date.localeCompare(b.date)));
    setShowAddModal(false);
    setNewEvent({ date: '2026-01', type: 'expense', amount: 0, description: '' });
  };

  const calculateProjection = () => {
    let balance = 5000;
    return events.map((event) => {
      balance += event.type === 'income' ? event.amount : -Math.abs(event.amount);
      return { ...event, projectedBalance: balance };
    });
  };

  const projectedEvents = calculateProjection();
  const finalBalance = projectedEvents[projectedEvents.length - 1]?.projectedBalance || 5000;
  const totalChange = finalBalance - 5000;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">What-If Simulator</h2>
          <p className="opacity-70">Add events to see how they impact your financial future</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className={`flex items-center space-x-2 px-6 py-3 border ${theme.accent} rounded-xl ${theme.glow} shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-xl bg-gradient-to-r ${theme.gradient} hover:scale-105`}
        >
          <Plus className="w-5 h-5" />
          <span>Add Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 border ${theme.accent} border-opacity-20 rounded-2xl backdrop-blur-xl`}>
          <div className="text-sm opacity-60 mb-2">Current Balance</div>
          <div className="text-3xl font-bold">$5,000</div>
        </div>
        <div className={`p-6 border ${theme.accent} border-opacity-20 rounded-2xl backdrop-blur-xl`}>
          <div className="text-sm opacity-60 mb-2">Projected Balance</div>
          <div className="text-3xl font-bold">${finalBalance.toLocaleString()}</div>
        </div>
        <div className={`p-6 border ${theme.accent} border-opacity-20 rounded-2xl backdrop-blur-xl`}>
          <div className="text-sm opacity-60 mb-2">Total Change</div>
          <div className={`text-3xl font-bold ${totalChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {totalChange >= 0 ? '+' : ''}${totalChange.toLocaleString()}
          </div>
        </div>
      </div>

      <div className={`p-8 border ${theme.accent} border-opacity-20 rounded-2xl backdrop-blur-xl`}>
        <h3 className="text-xl font-bold mb-6">Timeline Projection</h3>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-current to-transparent opacity-20" />

          <div className="space-y-6">
            {projectedEvents.map((event, index) => (
              <div key={event.id} className="relative flex items-start space-x-6 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className={`flex-shrink-0 w-16 h-16 rounded-xl border ${theme.accent} flex items-center justify-center ${theme.glow} shadow-lg backdrop-blur-xl bg-gradient-to-br ${theme.gradient} z-10`}>
                  {event.type === 'income' && <TrendingUp className="w-6 h-6" />}
                  {event.type === 'expense' && <TrendingDown className="w-6 h-6" />}
                  {event.type === 'investment' && <DollarSign className="w-6 h-6" />}
                  {event.type === 'savings' && <DollarSign className="w-6 h-6" />}
                </div>

                <div className="flex-1 p-6 border border-white border-opacity-10 rounded-xl backdrop-blur-xl hover:border-opacity-30 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-bold text-lg">{event.description}</div>
                      <div className="text-sm opacity-60">{event.date}</div>
                    </div>
                    <div className={`text-xl font-bold ${event.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {event.type === 'income' ? '+' : '-'}${Math.abs(event.amount).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white border-opacity-10">
                    <span className="text-sm opacity-60">Projected Balance</span>
                    <span className="font-bold">${event.projectedBalance.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className={`max-w-md w-full p-8 border ${theme.accent} border-opacity-40 rounded-2xl backdrop-blur-xl bg-black bg-opacity-90 animate-fade-in`}>
            <h3 className="text-2xl font-bold mb-6">Add Timeline Event</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm opacity-70 mb-2">Event Type</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as TimelineEvent['type'] })}
                  className={`w-full px-4 py-3 bg-white bg-opacity-5 border ${theme.accent} border-opacity-30 rounded-xl backdrop-blur-xl focus:outline-none focus:border-opacity-60 transition-all`}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                  <option value="investment">Investment</option>
                  <option value="savings">Savings</option>
                </select>
              </div>

              <div>
                <label className="block text-sm opacity-70 mb-2">Date</label>
                <input
                  type="month"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className={`w-full px-4 py-3 bg-white bg-opacity-5 border ${theme.accent} border-opacity-30 rounded-xl backdrop-blur-xl focus:outline-none focus:border-opacity-60 transition-all`}
                />
              </div>

              <div>
                <label className="block text-sm opacity-70 mb-2">Amount</label>
                <input
                  type="number"
                  value={newEvent.amount}
                  onChange={(e) => setNewEvent({ ...newEvent, amount: parseFloat(e.target.value) })}
                  placeholder="0.00"
                  className={`w-full px-4 py-3 bg-white bg-opacity-5 border ${theme.accent} border-opacity-30 rounded-xl backdrop-blur-xl focus:outline-none focus:border-opacity-60 transition-all`}
                />
              </div>

              <div>
                <label className="block text-sm opacity-70 mb-2">Description</label>
                <input
                  type="text"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="e.g., Vacation, Bonus, New Car"
                  className={`w-full px-4 py-3 bg-white bg-opacity-5 border ${theme.accent} border-opacity-30 rounded-xl backdrop-blur-xl focus:outline-none focus:border-opacity-60 transition-all`}
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 border border-white border-opacity-20 rounded-xl backdrop-blur-xl hover:border-opacity-40 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={addEvent}
                className={`flex-1 px-6 py-3 border ${theme.accent} rounded-xl ${theme.glow} shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-xl bg-gradient-to-r ${theme.gradient} hover:scale-105`}
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

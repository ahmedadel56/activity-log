import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Event } from '@prisma/client';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const EventList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ actorId: '', targetId: '', actionId: '' });
  const [isLive, setIsLive] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<null | Event>(null);
  const { data, error, mutate } = useSWR(
    `/api/events?page=${page}&search=${search}&actorId=${filters.actorId}&targetId=${filters.targetId}&actionId=${filters.actionId}`,
    fetcher
  );

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        mutate();
      }, 5000); // Refresh every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isLive, mutate]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search change
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1); // Reset to first page on filter change
  };

  const downloadCSV = () => {
    const csvContent: string = 'data:text/csv;charset=utf-8,' + 
      ['Actor,Action,Date,Target,Location,Metadata']
      .concat(events.map((event: Event): string => 
        `${event.actorName},${event.actionName},${new Date(event.occurredAt).toLocaleString()},${event.targetName || ''},${event.location},${JSON.stringify(event.metadata)}`
      )).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'events.csv');
    document.body.appendChild(link); // Required for FF
    link.click();
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { events, total } = data;

  const actors = ['Ali Salah', 'John Doe', 'Jane Smith']; // Populate with your actual data
  const targets = ['ali@instatus.com', 'Database downtime', 'jane@instatus.com']; // Populate with your actual data
  const actions = ['user.login_succeeded', 'incident.created', 'teammate.deleted']; // Populate with your actual data

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 bg-gray-100 p-4 rounded-lg space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search name, email or action..."
          value={search}
          onChange={handleSearchChange}
          className="p-2 border rounded w-full md:w-1/3"
        />
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <select name="actorId" value={filters.actorId} onChange={handleFilterChange} className="p-2 border rounded w-full md:w-auto">
            <option value="">All Actors</option>
            {actors.map(actor => (
              <option key={actor} value={actor}>{actor}</option>
            ))}
          </select>
          <select name="targetId" value={filters.targetId} onChange={handleFilterChange} className="p-2 border rounded w-full md:w-auto">
            <option value="">All Targets</option>
            {targets.map(target => (
              <option key={target} value={target}>{target}</option>
            ))}
          </select>
          <select name="actionId" value={filters.actionId} onChange={handleFilterChange} className="p-2 border rounded w-full md:w-auto">
            <option value="">All Actions</option>
            {actions.map(action => (
              <option key={action} value={action}>{action}</option>
            ))}
          </select>
          <button onClick={() => setIsLive(!isLive)} className={`p-2 rounded w-full md:w-auto ${isLive ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}>
            {isLive ? 'Live' : 'Live'}
          </button>
          <button onClick={downloadCSV} className="p-2 bg-green-500 text-white rounded w-full md:w-auto">Export</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event: Event): JSX.Element => (
              <React.Fragment key={event.id}>
                <tr
                  className="bg-white border-b cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedEvent(selectedEvent && selectedEvent.id === event.id ? null : event)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.actorName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.actionName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(event.occurredAt).toLocaleString()}</td>
                </tr>
                {selectedEvent && selectedEvent.id === event.id && (
                  <tr className="bg-gray-100">
                    <td colSpan={3} className="px-6 py-4">
                      <div className="p-4 border rounded bg-gray-50">
                        <p><strong>Actor:</strong> {event.actorName}</p>
                        <p><strong>Email:</strong> {event.actorId}</p>
                        <p><strong>Action:</strong> {event.actionName}</p>
                        <p><strong>Target:</strong> {event.targetName}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Date:</strong> {new Date(event.occurredAt).toLocaleString()}</p>
                        <p><strong>Metadata:</strong> {JSON.stringify(event.metadata)}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          className="p-2 bg-blue-500 text-white rounded"
          disabled={page <= 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="p-2 bg-blue-500 text-white rounded"
          disabled={events.length < 10}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventList;

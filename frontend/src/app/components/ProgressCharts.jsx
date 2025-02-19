import PropTypes from 'prop-types';

export default function DashboardCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </div>
  )
}

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};


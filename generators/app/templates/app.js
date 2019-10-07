const url = require('url')
const { send } = require('micro')
const { ClickHouse } = require('clickhouse');

const clickhouse = new ClickHouse({
  url: 'http://clickhouse',
  isUseGzip: true
})

module.exports = async (request, response) => {
  const req = url.parse(request.url, true);

  switch (req.pathname) {
    case '/api/total_events':
      const total_events = await clickhouse.query(
        "SELECT COUNT(*) as total_events FROM events FINAL"
      ).toPromise()

      return send(response, 200, total_events[0])

    case '/api/events_over_time':
      const events_over_time = await clickhouse.query(
        "SELECT toDate(timestamp) as day, COUNT(*) as count FROM events FINAL GROUP BY day ORDER BY day"
      ).toPromise()

      return send(response, 200, { "events_over_time": events_over_time })

    default:
      return send(response, 404, "Not found")
  }
}
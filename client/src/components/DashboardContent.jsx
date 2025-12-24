import React, { useEffect, useState } from "react";
import { urlServices } from "../api";
import { Link } from "react-router";
const mockData = [
  {
    id: 1,
    shortUrl: "https://sho.rt/a1b2",
    longUrl: "https://www.example.com/some/very/long/url",
    totalVisits: 5,
    visits: [
      { date: "2025-01-20 10:30", ip: "192.168.1.1" },
      { date: "2025-01-21 12:10", ip: "192.168.1.2" },
    ],
  },
  {
    id: 2,
    shortUrl: "https://sho.rt/x9y8",
    longUrl: "https://openai.com/research",
    totalVisits: 3,
    visits: [{ date: "2025-01-19 09:15", ip: "10.0.0.1" }],
  },
];
const DashboardContent = () => {
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [urlList, setUrlList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await urlServices.getAll();
        setUrlList(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(urlList);

  return (
    <div className="container py-20">
      <div className=" bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-6">📊 URL Dashboard</h1>
        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Short URL</th>
                <th className="p-3 text-left">Original URL</th>
                <th className="p-3 text-center">Visits</th>
                <th className="p-3 text-center">History</th>
              </tr>
            </thead>
            <tbody>
              {urlList.map((url) => (
                <tr key={url._id} className="border-t">
                  <td className="p-3 text-blue-600 underline">
                    <Link
                      to={`http://localhost:8000/${url.urlShort}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      http://localhost:8000/{url.urlShort}
                    </Link>
                  </td>
                  <td className="p-3 truncate max-w-xs">{url.urlLong}</td>
                  <td className="p-3 text-center font-semibold">
                    {url.visitHistory.length}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => setSelectedUrl(url)}
                      className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Visit History Modal */}
        {selectedUrl && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white w-full max-w-lg rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Visit History</h2>

              <p className="text-sm mb-2">
                <span className="font-semibold">Short URL:</span>{" "}
                http://localhost:8000/{selectedUrl.urlShort}
              </p>

              <div className="max-h-60 overflow-y-auto border rounded">
                {selectedUrl.visitHistory.length === 0 ? (
                  <p className="p-4 text-gray-500">No visits yet</p>
                ) : (
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">IP Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedUrl.visitHistory.map((visit) => (
                        <tr key={visit._id} className="border-t">
                          <td className="p-2">
                            {new Date(visit.visitTime).toLocaleString()}
                          </td>
                          <td className="p-2">Hacker</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <button
                onClick={() => setSelectedUrl(null)}
                className="mt-4 w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;

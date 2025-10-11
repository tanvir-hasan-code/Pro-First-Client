import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaCheckCircle } from "react-icons/fa";

const TrackingParcel = () => {
  const axiosSecure = useAxiosSecure();
  const [trackingId, setTrackingId] = useState("");
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!trackingId) return;

    setLoading(true);
    setError("");
    setParcel(null);

    try {
      const res = await axiosSecure.get(`/parcel/tracking?trackingId=${trackingId}`);
      setParcel(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Parcel not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 px-2 mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        📦 Parcel Tracking
      </h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="input input-bordered w-1/2 mr-2"
        />
        <button type="submit" className="btn bg-[#caeb66] border-none text-black hover:bg-[#b4d84d]">
          Search
        </button>
      </form>

      {/* Loading / Error */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Timeline */}
      {parcel && (
        <div className="bg-base-100 p-6 rounded-2xl shadow-lg border border-[#caeb66]">
          <h2 className="text-xl font-semibold mb-3 text-center text-gray-700">
            Current Status:{" "}
            <span className="text-green-600">{parcel?.currentStatus}</span>
          </h2>

          {parcel?.trackingHistory?.length > 0 ? (
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
              {parcel.trackingHistory.map((step, index) => (
                <li key={index}>
                  {index !== 0 && <hr />}
                  <div className="timeline-middle">
                    <FaCheckCircle className="text-[#caeb66] h-6 w-6" />
                  </div>
                  <div
                    className={`timeline-box bg-gradient-to-r from-[#f3fce2] to-[#e6f9c5] text-gray-700`}
                  >
                    <p className="font-semibold text-lg">{step.status}</p>
                    {step.message && (
                      <p className="text-sm text-gray-600 mt-1 italic">
                        {step.message}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(step.timestamp || step.date).toLocaleString()}
                    </p>

                    {(step.sentFromDistrict || step.sentFromRegion) && (
                      <p className="text-xs mt-2 text-gray-700">
                        Sent from{" "}
                        <span className="font-semibold">
                          {step.sentFromDistrict || step.sentFromRegion}
                        </span>
                      </p>
                    )}
                  </div>
                  {index !== parcel.trackingHistory.length - 1 && <hr />}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">
              No tracking history found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackingParcel;

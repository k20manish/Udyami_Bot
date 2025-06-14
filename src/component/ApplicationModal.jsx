import React, { useState } from "react";

const ApplicationModal = ({ user, onClose }) => {
  const [comment, setComment] = useState("");

  if (!user) return null;

  const handleResolve = () => {
    alert("Issue has been marked as resolved.");
    // You can optionally pass comment or call handler here
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-indigo-700">User Query Details</h2>

        <table className="w-full text-sm text-left border-separate space-y-2">
          <tbody className="space-y-2">
            <tr>
              <td className="font-medium text-gray-700">Name</td>
              <td className="text-gray-900">{user.name}</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-700">Registration ID</td>
              <td className="text-gray-900">{user.registrationId}</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-700">Mobile</td>
              <td className="text-gray-900">{user.mobile}</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-700">Issue</td>
              <td className="text-gray-900">{user.issue}</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-700">Application Date</td>
              <td className="text-gray-900">{user.applicationDate}</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-700">Status</td>
              <td className="text-gray-900">{user.status}</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-700">Resolve Date</td>
              <td className="text-gray-900">{user.resolvedDate || "Pending"}</td>
            </tr>
          </tbody>
        </table>

        {/* Conditionally show only if status is Pending */}
        {user.status === "Pending" && (
          <>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                Add Comment
              </label>
              <textarea
                id="comment"
                rows="3"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter any remarks before resolving..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleResolve}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Mark as Resolved
              </button>
            </div>
          </>
        )}

        {/* Always show Cancel if already resolved */}
        {user.status === "Resolved" && (
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationModal;

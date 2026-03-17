import React, { useState } from "react";
import Navbar from "../../pages/Navbar";
import Sidebar from "../sidebar/Sidebar";

export default function AddDocuments() {
  const [assetDetail, setAssetDetail] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);

  const handleAddDocument = () => {
    if (!assetDetail || !documentType || !file) return;

    const newDoc = {
      id: Date.now(),
      asset: assetDetail,
      name: documentType,
      fileName: file.name,
    };

    setDocuments([...documents, newDoc]);
    setDocumentType("");
    setFile(null);
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <Navbar />
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 mt-16 p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Add Asset Documents
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Upload and manage supporting documents for assets
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-10 transition hover:shadow-md">
          <div className="grid grid-cols-3 gap-8">
            {/* Asset Details */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Asset Details
              </label>
              <input
                type="text"
                placeholder="Enter asset name..."
                value={assetDetail}
                onChange={(e) => setAssetDetail(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition"
              />
            </div>

            {/* Document Type */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Document Type
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Invoice, Warranty..."
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="flex-1 border border-slate-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition"
                />
                <button
                  onClick={handleAddDocument}
                  className="w-11 h-11 flex items-center justify-center bg-slate-900 text-white rounded-xl hover:bg-slate-800 active:scale-95 transition-all duration-200 shadow"
                >
                  +
                </button>
              </div>
            </div>

            {/* Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Upload Document
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-slate-600
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-xl file:border-0
                  file:text-sm file:font-medium
                  file:bg-slate-900 file:text-white
                  hover:file:bg-slate-800
                  transition"
              />
            </div>
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 transition hover:shadow-md">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">
            Documents List
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-600 uppercase text-xs tracking-wider">
                  <th className="p-3">Asset</th>
                  <th className="p-3">Document Name</th>
                  <th className="p-3">File</th>
                  <th className="p-3">View</th>
                  <th className="p-3">Delete</th>
                </tr>
              </thead>

              <tbody>
                {documents.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-12">
                      <div className="flex flex-col items-center justify-center text-slate-400 animate-fadeIn">
                        <p className="text-sm">No documents uploaded yet</p>
                        <p className="text-xs mt-1">
                          Uploaded files will appear here
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  documents.map((doc) => (
                    <tr
                      key={doc.id}
                      className="border-b hover:bg-slate-50 transition duration-200"
                    >
                      <td className="p-3 font-medium text-slate-700">
                        {doc.asset}
                      </td>
                      <td className="p-3">{doc.name}</td>
                      <td className="p-3 text-slate-500">{doc.fileName}</td>

                      <td className="p-3">
                        <button className="text-blue-600 hover:text-blue-800 font-medium transition">
                          View
                        </button>
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="text-rose-600 hover:text-rose-800 font-medium transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
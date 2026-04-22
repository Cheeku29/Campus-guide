import React from 'react';

const ConfirmDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080b14]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0e1320] border border-[#1e2840] p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 animate-in zoom-in-95 duration-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        <h3 className="text-xl font-bold text-[#eef0f6] mb-3 relative z-10">Are you sure?</h3>
        <p className="text-sm text-[#8b95b0] mb-8 leading-relaxed relative z-10">{message}</p>
        <div className="flex space-x-3 justify-end relative z-10">
          <button onClick={onCancel} className="px-5 py-2.5 text-[#eef0f6] hover:bg-[#141c2e] rounded-xl transition font-medium text-sm">Cancel</button>
          <button onClick={onConfirm} className="px-5 py-2.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl transition font-medium text-sm border border-red-500/20 shadow-inner block">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

import React from 'react';
import Button from './Button';

const ConfirmDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface border border-border p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4 animate-in zoom-in-95 duration-200">
        <h3 className="text-xl font-bold text-white mb-2">Are you sure?</h3>
        <p className="text-sm text-secondary mb-8 leading-relaxed">{message}</p>
        <div className="flex space-x-3 justify-end">
          <Button variant="ghost" onClick={onCancel} className="px-5">Cancel</Button>
          <Button variant="danger" className="px-5 font-semibold" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

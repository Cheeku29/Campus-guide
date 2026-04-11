import React from 'react';

const RoleBadge = ({ role }) => {
  if (role === 'owner') {
    return <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-white text-black rounded-full align-middle ml-3 shadow-sm">Owner</span>;
  }
  return <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-border-subtle text-secondary border border-border rounded-full align-middle ml-3">Student</span>;
};

export default RoleBadge;

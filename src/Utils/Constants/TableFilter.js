//////      ADMIN     //////
// User Management
export const statusFiltersConfig = [
  { value: '', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];
export const userStatusFiltersConfig = [
  { value: '', label: 'All' },
  { value: '0', label: 'Blocked' },
  { value: '1', label: 'Active' },
  { value: '2', label: 'Inactive' },
];

export const userStatusFilters = [
  { value: '', label: 'All' },
  { value: '1', label: 'Active' },
  { value: '0', label: 'Inactive' },
];

export const notificationFilterOptions = [
  { value: '', label: 'All' },
  { value: '0', label: 'Read' },
  { value: '1', label: 'Unread' },
];

//////      BUSINESS     //////
export const unlockRequestFilterOptions = [
  { value: '', label: 'All' },
  { value: '0', label: 'Approved' },
  { value: '1', label: 'Pending' },
  { value: '2', label: 'Rejected' },
];

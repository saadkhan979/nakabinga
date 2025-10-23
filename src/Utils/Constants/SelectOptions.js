export const statusClassMap = {
  Active: 'success',
  active: 'success',
  unblock: 'success',
  unblocked: 'success',
  approve: 'success',
  approved: 'success',
  Approved: 'success',
  open: 'success',
  'discounted collection': 'success',
  settled: 'warning',
  'return unpaid': 'warning',
  expiring: 'warning',
  hold: 'warning',
  pending: 'warning',
  revert: 'danger',
  post: 'danger',
  collection: 'danger',
  Cancelled: 'danger',
  cancelled: 'danger',
  Disapproved: 'danger',
  disapproved: 'danger',
  unapproved: 'danger',
  Inactive: 'danger',
  inactive: 'danger',
  block: 'danger',
  expired: 'danger',
  blocked: 'danger',
  rejected: 'danger',
  edit: 'warning',
  delete: 'danger',
  open: 'info',
  approvebtn: 'yellow',
  holdbtn: 'warning',
  postbtn: 'success',
  'cancel postingbtn': 'danger',
};
export const dateRangeSelectOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'past6months', label: '6 Months' },
  { value: 'yearly', label: 'Yearly' },
];

export const notificationOptions = [
  { value: '', label: 'All' },
  { value: 'unread', label: 'Unread' },
  { value: 'read', label: 'Read' },
];

export const filterActiveAndInactive = [
  { value: 'All', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];
export const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];
export const statusNumberOptions = [
  { value: 'All', label: 'All' },
  { value: '1', label: 'Active' },
  { value: '0', label: 'Inactive' },
];
export const durationOptions = [
  { value: 'Select', label: 'Select' },
  { value: '1', label: '1 Month' },
  { value: '2', label: '2 Months' },
  { value: '3', label: '3 Months' },
  { value: '4', label: '4 Months' },
  { value: '5', label: '5 Months' },
  { value: '6', label: '6 Months' },
  { value: '7', label: '7 Months' },
  { value: '8', label: '8 Months' },
  { value: '9', label: '9 Months' },
  { value: '10', label: '10 Months' },
  { value: '11', label: '11 Months' },
  { value: '12', label: '12 Months' },
];
export const categoryOptions = [
  { value: 'Select', label: 'Select' },
  { value: '1', label: 'Standard' },
  { value: '2', label: 'Premium' },
  { value: '3', label: 'Gold' },
  { value: '4', label: 'Platinum' },
  { value: '5', label: 'Enterprise' },
];

export const sortingOptions = [
  {
    value: '10',
    label: '10',
  },
  {
    value: '25',
    label: '25',
  },
  {
    value: '50',
    label: '50',
  },
  {
    value: '100',
    label: '100',
  },
];
export const idTypeOptions = [
  {
    value: 'Emirates ID',
    label: 'Emirates ID',
  },
  {
    value: 'Driving License',
    label: 'Driving License',
  },
];
export const rateTypeOptions = [
  {
    value: 'Multiply',
    label: 'Multiply',
  },
  {
    value: 'Divide',
    label: 'Divide',
  },
];
export const currencyTypeOptions = [
  {
    value: 'Regular Currency',
    label: 'Regular Currency',
  },
  {
    value: 'Crypto Currency',
    label: 'Crypto Currency',
  },
  {
    value: 'Gold Coin',
    label: 'Gold Coin',
  },
];

export const currencyPairs = [
  { id: 1, currency: 'CNY', agcy: 'RUB' },
  { id: 2, currency: 'CNY', agcy: 'TMN' },
  { id: 3, currency: 'CNY', agcy: 'TRL' },
  { id: 4, currency: 'CNY', agcy: 'USD' },
  { id: 5, currency: 'CNY', agcy: 'DHS' },
  { id: 6, currency: 'CNY', agcy: 'EUR' },
  { id: 7, currency: 'DHS', agcy: 'EUR' },
  { id: 8, currency: 'DHS', agcy: 'CNY' },
  { id: 9, currency: 'DHS', agcy: 'USD' },
  { id: 10, currency: 'DHS', agcy: 'TRL' },
  { id: 11, currency: 'DHS', agcy: 'TMN' },
  { id: 12, currency: 'DHS', agcy: 'RUB' },
  { id: 13, currency: 'EUR', agcy: 'RUB' },
  { id: 14, currency: 'EUR', agcy: 'TMN' },
  { id: 15, currency: 'EUR', agcy: 'TRL' },
];

export const transactionTypeOptions = [
  { label: 'All', value: '' },
  { label: 'JV', value: 'JV' },
  { label: 'RV', value: 'RV' },
  { label: 'PV', value: 'PV' },
  { label: 'BDV', value: 'BDV' },
  { label: 'BWV', value: 'BWV' },
  { label: 'A2A', value: 'A2A' },
  { label: 'IPV', value: 'IPV' },
  { label: 'CBS', value: 'CBS' },
  { label: 'TBN', value: 'TBN' },
  { label: 'TSN', value: 'TSN' },
  { label: 'TRQ', value: 'TRQ' },
  { label: 'FSN', value: 'FSN' },
  { label: 'FBN', value: 'FBN' },
  { label: 'DBN', value: 'DBN' },
  { label: 'DPV', value: 'DPV' },
  { label: 'SVR', value: 'SVR' },
  { label: 'SJV', value: 'SJV' },
  { label: 'TTR', value: 'TTR' },
  { label: 'PDCP', value: 'PDCP' },
  { label: 'PDCR', value: 'PDCR' },
];

export const transactionLogsUserOptions = [
  { value: '1', label: 'User 1' },
  { value: '2', label: 'User 2' },
];

export const transactionLogsActionOptions = [
  { value: '', label: 'All' },
  { value: '1', label: 'Edited' },
  { value: '2', label: 'Deleted' },
];

export const PDCProcessOpenTypeOptions = [
  { value: 'settled', label: 'Settled on due date' },
  { value: 'cancelled', label: 'Cancelled on due date' },
  { value: 'discount', label: 'Discount Through Bank' },
  {
    value: 'collection',
    label: 'Collection - Given to Bank on Collection Basis',
  },
];
export const PDCProcessSettledTypeOptions = [
  { value: 'recall', label: 'Recall a Settled Cheque' },
  { value: 'cancel', label: 'Cancel a Settled Cheque (Mark as Open Cheque)' },
];
export const PDCProcessDiscountCollectionTypeOptions = [
  { value: 'settled', label: 'Settled on due date' },
  { value: 'cancelled', label: 'Cancelled on due date' },
];
export const PDCProcessCollectionTypeOptions = [
  { value: 'settled', label: 'Settled on due date' },
  { value: 'cancelled', label: 'Cancelled on due date' },
  { value: 'discount', label: 'Discount Through Bank' },
];
export const PDCProcessCancelledTypeOptions = [
  { value: 'recall', label: 'Recall a Cancelled Cheque' },
];
export const PDCProcessPayableOpenTypeOptions = [
  { value: 'settled', label: 'Settled on due date' },
  { value: 'cancelled', label: 'Cancelled on due date' },
];
export const PDCProcessPayableSettledTypeOptions = [
  { value: 'recall', label: 'Recall a Settled Cheque' },
];
export const PDCProcessPayableCancelledTypeOptions = [
  { value: 'recall', label: 'Recall a Cancelled Cheque' },
];

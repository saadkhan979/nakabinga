export const subscriptionLogsHeaders = [
  'S. No.',
  'Subscription Title',
  'Amount',
  'Subscription Date',
  'Expiry Date',
  'Status',
];

export const warehouseHeaders = ['Code', 'Name', 'Creation Date', 'Action'];

export const classificationMasterHeaders = [
  'S. No.',
  {
    title: 'Classification',
    key: 'classification',
  },
  'Description',
  'Action',
];

export const cbClassificationMasterHeaders = [
  'S. No.',
  'Group',
  'Title',
  'Action',
];

export const commisionMasterHeaders = [
  'Account Type',
  'Acccount Name',
  'Commission Type',
  'Receipts',
  'Payments',
  'TMN Buy Remittance',
  'TMN Sell Remittance',
  'Currency Transfer Request (TRQ) ',
  'Outward Remittance',
  'Currency Buy/Sell',
  'Inward Remittance(DBN)',
  'Action',
];

export const costCenterRegisterHeaders = [
  'Code',
  'Description',
  'Group',
  'Default',
  'Action',
];

export const walkInCustomerHeaders = [
  'Customer Name',
  'Company',
  'Mobile Number',
  'Nationality',
  'ID Type',
  'ID No.',
  'Expiry Date',
  'Status',
  'City',
  'Action',
];

export const beneficiaryRegisterHeaders = [
  'Beneficiary Name',
  'Beneficiary Address',
  'Account',
  'Nationality',
  'Purpose',
  'Action',
];

export const partyLedgerHeaders = [
  'Account Code',
  'Account Name',
  'Telephone Number',
  'Mobile Number',
  'Debit Limit',
  'Classification',
  'Status',
  'Action',
];

export const currencyRegisterHeaders = [
  'Currency',
  'Currency Name',
  'Rate Type',
  'Rate Variation (%)',
  'Currency Type',
  'Allow Online Rate',
  'Allow Auto-Pairing',
  'Allow Second Preference',
  'Special Rate Currency',
  'Restrict Pair',
  'Group',
  'Action  ',
];

export const tellerRegisterHeaders = [
  'Code',
  'Till Assigned to User',
  'Cash A/C',
  'Action',
];

export const countryRegisterHeaders = ['Code', 'Country', 'Action'];

export const officeLocationMasterHeaders = [
  'S.No',
  'Office Location',
  'Action',
];

export const groupMasterHeaders = [
  'Code',
  'Group Type',
  'Description',
  'Action',
];

export const salesmanHeaders = [
  'Code',
  'Name',
  'User ID',
  // 'Creation Date',
  'Action',
];

export const attachmentsTableHeaders = ['S.No', 'File Name', 'Action'];

export const documentRegisterHeaders = [
  'Grp',
  'Type',
  'Description',
  'Number',
  'Issue Date',
  'Due Date',
  'User ID',
  'Last Updated',
  'Action',
];

export const userManagementHeaders = [
  'S. No.',
  'User Name',
  'Email Address',
  'Registration Date',
  'Status',
  'Action',
];

export const branchLogHeaders = [
  'S. No.',
  'Name',
  'Address',
  'Manager',
  'Supervisor',
  'Base Currency',
  'Status',
];

export const unlockRequestHeaders = [
  'Request Date Time',
  'Requestor Name',
  'Approval /Rejection Date TIme',
  'Status',
  'Action',
];

export const subscriptionManagemenAdminHeaders = [
  'S.No.',
  'Subscription Name',
  'Number of Users',
  'Branches',
  'Price Monthly',
  'Price Yearly',
  'Modification Date',
  'Action',
];

export const subscriptionManagementCustomHeaders = [
  'S.No.',
  'Subscription Name',
  'Number of Users',
  'Business ID',
  'Branches',
  'Price Monthly',
  'Price Yearly',
  'Modification Date',
  'Action',
];

export const subscriptionRequestHeaders = [
  'S.No.',
  'Business Name',
  'Email',
  'Expected No. of Users',
  'Expected No. of Branches',
  'Status',
  'Action',
];

export const adminSubscriptionLogsHeaders = [
  'S.No.',
  'Business Name',
  'Subscription Name',
  'Amount',
  'Subscription Type',
  'Subscription Date',
  'Status',
];

export const supportManagementHeaders = [
  'S.No.',
  'Supprt Type',
  'Creation Date',
  'Action',
];

export const supportLogsHeaders = [
  'S.No.',
  'Name',
  'Email',
  'Support Type',
  'Date',
  'Action',
];

export const userMaintenanceHeaders = [
  // 'ID',
  'S.No.',
  'User ID',
  'User Name',
  'Phone Number',
  'Status',
  'Action',
];

export const userDowngradeHeaders = [
  // 'ID',
  'S.No.',
  'User ID',
  'User Name',
  'Phone Number',
  'Status',
  'Action',
];

export const branchDowngradeHeaders = [
  'S.No.',
  'Name',
  'Address',
  'Manager',
  'Supervisor',
  'Base Currency',
  'Status',
  'Action',
];

export const branchManagementHeaders = [
  'S.No.',
  'Name',
  'Address',
  'Manager',
  'Supervisor',
  'Base Currency',
  'Status',
  'Action',
];

export const vatRateHeaders = ['Title/Description', 'VAT Percentage', 'Action'];

export const userLogsHeaders = ['S.No.', 'User ID', 'Login Date/Time'];

export const transactionNumberHeaders = [
  'Transaction Type',
  'Prefix',
  'Starting No.',
  'Next Transaction No.',
  'Transaction Number Limit',
  'Action',
];

export const unlockRequestLogsHeaders = [
  'Request Date Time',
  'Requestor Name',
  'Approval /Rejection Date TIme',
  'Status',
  'Action',
];

export const chequeRegisterHeaders = [
  'S.No.',
  'Cheque Number',
  'Bank',
  'Transaction No.',
  'Transaction Date',
  'Issued To',
  'Amount',
  'Reference No',
  'Status',
  'Action',
];

export const transactionLogsHeaders = [
  'S.No.',
  'Transaction Type',
  'Number',
  'Transaction Date',
  'Modification Date',
  'Modification Time',
  'User ID',
  'Action Type',
];

export const allMaturityAlertTabs = [
  'PDCs',
  'FC Remittance',
  'Debit Note Payment',
  'Documents',
];

export const maturityAlertPDCHeaders = [
  'PDC',
  'Due Date',
  'Chq.No',
  'FCy',
  'FC Amount',
  'Party',
  'Bank',
];

export const maturityAlertFCRemittanceHeaders = [
  'FSN Number',
  'Due Date',
  'Account Name',
  'Beneficiary',
  'FCy',
  'FC amount',
  'Ag FCy',
  'Ag FCy Amount',
  'FC Balance Amount',
];

export const maturityAlertDebitNoteHeaders = [
  'DBN Number',
  'Due Date',
  'Sender',
  'Beneficiary',
  'Currency',
  'FC Total',
  'FC Balance Amount',
];

export const maturityAlertDocumentHeaders = [
  'Grp',
  'Type',
  'Description',
  'Number',
  'Issue Date',
  'Due Date',
];

export const systemIntegrityHeaders = [
  'Type',
  'Number',
  'Date',
  'Title of Account',
  'Narration',
  'FCy',
  'FC Amount',
  'LC Debit',
  'LC Credit',
  'Cost Center',
  'User ID',
];

export const dealRegisterUpdationHeaders = [
  'Date',
  'FCy',
  'Account',
  'Deal Register',
  'Counter',
  'Difference',
];

export const pdcProcessHeaders = [
  'Cheque No.',
  'Due Date',
  'Posting Date',
  'FCy',
  'FC Amount',
  'Drawn on',
  'Title of Account',
  'Narration',
  'Status',
  'Action',
];

export const pdcrPaymentPostingHeaders = [
  'Cheque No.',
  'Dated',
  'FCy',
  'FC Amount',
  'Received From',
  'Issued To',
  'Status',
];

export const transactionApprovalHeaders = [
  'Trans. Type',
  'Trans. No',
  'Trans. Date',
  'Party',
  'Secondary Account',
  'Currency',
  'Amount',
  'User ID',
  'Approved by',
  'Received From/Paid To',
  'Comment',
  'Status',
  'Attachments',
  'Action',
];

export const rateRevaluationHeaders = [
  'Group',
  'Currency',
  'FC Balance',
  'Valuation Rate',
  'Value in DHS',
  'Gain/Loss',
];

export const transactionLockHeaders = [
  'Trans. Type',
  'Trans. No',
  'Trans. Date',
  'Party',
  'Currency',
  'Amount',
  'Locked By',
  'Locked Date & Time',
  'Action',
];

export const journalVoucherHeaders = [
  'S.No.',
  'Ledger',
  'Account',
  'Narration',
  'Currency',
  'FC Amount',
  'Rate',
  'LC Amount',
  'Sign',
  'Action',
];

export const journalVoucherViewHeaders = [
  'S. No',
  'Ledger',
  'Account',
  'Narration',
  'Currency',
  'FC Amount',
  'LC Amount',
  'Rate',
  'Sign',
];

export const journalVoucherListHeaders = [
  'Date',
  'JV No.',
  'Ledger',
  'Account Name',
  'Narration',
  'Currency',
  'FC Amount',
  'LC Amount',
  'User ID',
  'Sign',
  'Time',
  'Attachment',
];
export const remittanceRateOfExchangeHeaders = [
  'Currency',
  'Ag.FCy',
  'Buy Rate',
  'Buy From',
  'Buy Upto',
  'Sell Rate',
  'Sell From',
  'Sell Upto',
  'Action',
];

export const specialRateCurrencyHeaders = [
  'Currency',
  'Ag.FCy',
  'Buy Rate',
  'Buy From',
  'Buy Upto',
  'Sell Rate',
  'Sell From',
  'Sell Upto',
  'Action',
];

export const journalReportHeaders = [
  'Type',
  'Transition No.',
  'Date',
  'Title of Account',
  'Narration',
  'FCY',
  'Debit',
  'Credit',
  'Base Amount',
  'Cost Center',
  'User ID',
  'Updated On',
  'Attachment',
];

export const walkInCustomerStatementHeaders = [
  'Date',
  'Type',
  'Tran. No',
  'Narration',
  'FCY',
  'Debit',
  'Credit',
  'Balance',
  'Sign',
  'Value Date',
];

export const walkInCustomerAccountJournalHeaders = [
  'Title of Account',
  'Narration',
  'FCy',
  'Debit',
  'Credit',
];

export const walkInCustomerOutstandingBalanceHeaders = [
  'Title of Account',
  'FCy',
  'Debit',
  'Credit',
];

export const statementOfAccountsHeaders = [
  'Date',
  'Type',
  'Tran. No',
  'Narration',
  'FCY',
  'Debit',
  'Credit',
  'LC Balance',
  'Sign',
  'Value Date',
];

export const outstandingBalanceHeaders = [
  'Title of Account',
  'FCy',
  'Debit',
  'Credit',
  'Base Currency Value',
];

export const expenseJournalHeaders = [
  'Type',
  'Tran. No.',
  'Date',
  'Account Title',
  'Narration',
  'FCy',
  'FCy Amount',
  'Base Currency Value',
  'User ID',
];

export const postDatedChequesHeaders = [
  'Title of Account',
  'Cheque No.',
  'Base Amount',
  'Due Date',
  'Drawn on',
  'Posting Date',
  'Status',
  'FCy',
  'FC Amount',
  'Cost Center',
  'Discount/Collection Bank',
];

export const vatTaxReportHeaders = [
  'Type',
  'Tran. No.',
  'Date',
  'Ledger',
  'Title of Account',
  'FCy',
  'FC Amount',
  'VAT Amount',
  'Net Total',
  'Base Amount',
  'Base VAT Amount',
  'Base Net Total',
];

export const budgetingForecastingReportHeaders = [
  'Metrics',
  'Projected',
  'Actual',
  'Variance',
];

export const currencyTransferRegisterReportHeaders = [
  'Tran No.',
  'Date',
  'Time',
  'From Account',
  'To Account',
  'Currency',
  'Amount',
  'Narration',
  'Net Total',
  'Doc Type',
  'Doc No.',
  'Bank',
  'City',
  'Code',
];

export const outwardRemittanceReportHeaders = [
  'Tran. Type',
  'Tran. No.',
  'Date',
  'Account',
  'Beneficiary',
  'FCy',
  'FC Amount',
  'Against FCy',
  'Rate',
  'Commission',
  'Doc. SWIFT',
  'Against FC Amount',
  'Confirmation Status',
  'Comment',
];

export const outwardRemittanceEnquiryHeaders = [
  'Tran. Type',
  'Tran. No.',
  'Date',
  'Account',
  'Beneficiary',
  'FCy',
  'FC Amount',
  'Against FCy',
  'Rate',
  'User Id',
  'Status',
  'Against FC Amount',
  'Opposing No.',
  'Opposing Acccount',
];

export const inwardRemittanceReportHeaders = [
  'Tran No.',
  'Tran Date',
  'Account',
  'Nationality',
  'Beneficiary Name',
  'Beneficiary Place of Work',
  'Beneficiary Nationality',
  'Beneficiary ID No.',
  'Contact Number',
  'Country of Origin',
  'Purpose',
  'FCy',
  'FC Amount',
  'LC Amount',
];

export const dealRegisterReportHeaders = [
  'Account',
  'Buy FCy',
  'Buy FC Amount',
  'Sell FCy',
  'Sell FC Amount',
  'Rate',
  'Tran.No.',
  'Value Date',
  'User ID',
  'Date',
  'Time',
];

export const accountTurnoverReportHeaders = [
  'Ledger',
  'Account',
  'Contact No.',
  'FCy',
  'Balance B/f',
  'Total Debit',
  'Total Credit',
  'Balance C/f',
];

export const exchangeProfitLossReportHeaders = [
  'Currency',
  'Opening Balance',
  'Opening Rate',
  'Opening in LC',
  'Total Buy',
  'Avg Buy Rate',
  'Buy in LC',
  'Total Sell',
  'Avg Sell Rate',
  'Sell in LC',
  'Closing Balance',
  'Avg Close LC',
  'Close in LC',
  'Cost of Sale',
  'Profit/Loss',
];

export const accountEnquiryHeaders = [
  'Type',
  'Number',
  'Date',
  'Title of Account',
  'Narration',
  'Debit',
  'Credit',
  'FCy',
  'FC Amount',
];

export const financialReportHeaders = [
  'Account',
  'FCy',
  'FC Debit',
  'FC Credit',
  'LC Debit',
  'LC Credit',
];

export const inwardTTTableHeaders = [
  'Date',
  'BITTV No.',
  'Bank',
  'Ledger',
  'From Account',
  'To Account',
  'FCy',
  'FC Amount',
  'LC Amount',
  'FC Commission',
  'User ID',
  'Time',
  'Attachment',
];

export const depositTableHeaders = [
  'Date',
  'BDV No.',
  'From Account',
  'To Account',
  'FCy',
  'FC Amount',
  'LC Amount',
  'User ID',
  'Time',
  'Attachment',
];

export const withdrawalTableHeaders = [
  'Date',
  'BWV No.',
  'From Account',
  'To Account',
  'FCy',
  'FC Amount',
  'LC Amount',
  'User ID',
  'Time',
  'Attachment',
];

export const pdcrTableHeaders = [
  '',
  'PDCR Party',
  'Cheque Number',
  'Due Date',
  'Currency',
  'FC Amount',
  'PDCR Bank',
];

export const searchTableHeaders = [
  'Date',
  'PPV No.',
  'Ledger',
  'PDCR Party',
  'PDCR Bank',
  'Cheque Number',
  'Due Date',
  'FCy',
  'FC Amount',
  'LC Amount',
  'User ID',
  'Time',
  '', // For attachment icon
];

export const outwardRemittanceHeaders = [
  'Buy FCy',
  'FSN No.',
  'Debit Ledger',
  'Debit Account',
  'Reference No.',
  'Beneficiary',
  'Sending FC Amount',
  'Against Amount',
  'Charges',
  'VAT',
  'Net Total',
  'User ID',
  'Time',
  'Attachment',
];

export const outwardRemittanceRegisterHeaders = [
  'FSN Number',
  'Date',
  'Account Name',
  'Beneficiary',
  'FCy',
  'FC amount',
  'Ag FCy',
  'Ag FCy Amount',
  'Against TT',
  'FBN Account Name',
  'FC Payment Amount',
  'FC Balance Amount',
  'Pay from account',
  'Office Location',
  'Doc Swift',
  'Confirmation',
  'Approved By',
  'Comment',
  'Action',
];

export const applicationPrintingHeaders = [
  'FSN Number',
  'Date',
  'Amount',
  'FCy',
  'Beneficiary',
  'FC Amount',
  'Account Name',
  'Account Number',
  'Status',
  'Action',
];

export const ttrRegisterBankDetailsHeaders = [
  'Date',
  'Credit Party',
  'Bank Name',
  'Bank Account',
  'Remarks',
  'Amount',
  'Account Name',
  'Allocated',
  'Unallocated',
  'Confirmed',
  'Unconfirmed',
  'User ID',
  'Action',
];

export const ttrRegisterAllocationHeaders = [
  'Date',
  'Debit Party',
  'Credit Party',
  'Bank Name',
  'Bank Account',
  'Remarks',
  'Allocated',
  'Confirmed',
  'Un-confirmed',
  'Action',
];

export const ttrRegisterConfirmationHeaders = [
  'Date',
  'Debit Party',
  'Credit Party',
  'Bank Name',
  'Bank Account',
  'Remarks',
  'Allocated',
  'Confirmed',
  'Un-confirmed',
  'Action',
];

export const newTTRConfirmationHeaders = [
  'Doc Type',
  'Doc No.',
  'Narration',
  'TMN Amount',
];

export const suspenseVoucherNewHeaders = [
  'Sr. No.',
  'Narration',
  'Debit',
  'Credit',
  'Status',
  'Action',
];

export const suspenseVoucherHeaders = [
  'Sr. No.',
  'Narration',
  'Debit',
  'Credit',
  'Status',
];

export const suspenseVouchersTableHeaders = [
  'Date',
  'SVR No.',
  'Ledger',
  'Account Name',
  'FCy',
  'Debit Amount',
  'Credit Amount',
  'Status',
  'User ID',
  'Time',
  'Attachment',
];

export const suspencePostingHeaders = [
  'SVR No.',
  'Date',
  'Account',
  'Narration',
  'Currency',
  'Debit',
  'Credit',
  'SJV No.',
  'Posted Account',
  'Approved by',
  'Action',
];

export const allocationTableHeaders = [
  'Sell No',
  'Account Name',
  'Amount',
  'Doc Type',
  'Number',
  'Bank',
  'Code',
  'City',
  'Description',
  'Action',
];

export const currencyTransferNewHeaders = [
  'Sr. No.',
  'Currency',
  'Amount',
  'Narration',
  'Doc. Type',
  'Doc. No.',
  'Bank',
  'City',
  'Code',
  'Action',
];

export const currencyTransferTableHeaders = [
  'Date',
  'TRQ No.',
  'Debit Ledger',
  'Debit Account',
  'Credit Ledger',
  'Credit Account',
  'Doc. Type',
  'Doc. No.',
  'Bank',
  'City',
  'FCY',
  'FC Amount',
  'User ID',
  'Time',
  'Attachment',
];

export const summaryTableHeaders = ['', 'FC Amount', '@Rate', 'Base Value'];

export const dealRegistryHeaders = [
  'Account',
  'Buy',
  'Sell',
  'AG FCY',
  'AG FC Amt.',
  'Rate',
  'User ID',
  'Convert Rate',
  'Trans.No.',
  'Value Date',
  'Description',
];

export const positionSummaryHeaders = [
  'Currency',
  'Currency Name',
  'FC Opening',
  'FC Buy',
  'FC Sell',
  'FC Closing',
  'Avg Closing Rate',
];

export const inwardPaymentOrderNewHeaders = [
  'Sr. No.',
  'Ref.No.',
  'Pay Type',
  'Beneficiary',
  'Sender',
  'ID No.',
  'Contact No.',
  'Currency',
  'FC Amount',
  'Commission',
  'Pay Date',
  'Bank Name',
  'Bank Account',
  'Narration',
  'Action',
];

export const beneficiarySearchHeaders = [
  'Name',
  'Address',
  'Telephone Number',
  'Mobile Number',
  'ID Type',
  'ID Number',
  'Expiry Date',
];

export const SUMMARY_TABLE_HEADERS = [
  'Currency',
  'Total',
  'Commission',
  'VAT Amount',
  'Net Total',
];

export const inwardPaymentOrderTableHeaders = [
  'Date',
  'DBV No.',
  'Debit Ledger',
  'Debit Account',
  'Reference No.',
  'Pay Type',
  'Pay Date',
  'Beneficiary',
  'Sender',
  'FCy',
  'FC Amount',
  'Commission',
  'VAT',
  'Net Total',
  'User ID',
  'Time',
  'Attachment',
];

export const inwardPaymentCancellationHeaders = [
  'Debite Note Number',
  'Settlement No',
  'Pay Date',
  'Account',
  'Beneficiary',
  'Mode',
  'Currency',
  'FC Amount',
  'Paid By',
  'Action',
];

export const inwardPaymentHeaders = [
  'Pay Date',
  'Beneficiary',
  'ID Number',
  'Sender',
  'Contact No',
  'Currency',
  'FC Balance Amount',
  'FC Total',
  'Ref No.',
  'Debit Note Number',
  'Debit Note Date',
  'Debit Party',
  'Pay Type',
  'Bank',
  'Detail',
  'Comment',
  'Action',
];

export const paymentVoucherHeaders = [
  'Date',
  'PV No.',
  'Ledger',
  'Account Name',
  'Paid To ',
  'FCy',
  'Amount',
  'Commission',
];

export const receiptVoucherTableHeaders = [
  'Date',
  'RV No.',
  'Ledger',
  'Account Name',
  'Received From',
  'FCy',
  'Amount',
  'Commission ',
  'VAT',
  'FCy Net Total',
  'LC Net Total',
  'User ID',
  'Time',
  'Attachments',
];

export const specialComissionHeaders = [
  'S. No',
  'Ledger',
  'Credit Account',
  'Narration',
  'Percentage',
  'Amount',
  'Action',
];
export const specialCommissionHeaders = [
  'S. No',
  'Ledger',
  'Credit Account',
  'Narration',
  'Percentage',
  'Amount',
  'Action',
];

export const internalPaymentVoucherHeaders = [
  'S. No',
  'Ledger',
  'Debit Account',
  'Narration',
  'Currency',
  'Amount',
  'VAT %',
  'VAT Amount',
  'Net Total',
  '',
];

export const internalPaymentVoucherTableHeaders = [
  'Date',
  'IPV No.',
  'Cr. Ledger',
  'Credit Account',
  'Dr. Ledger',
  'Debit Account',
  'FCy',
  'Amount',
  'VAT',
  'FCy Net Total',
  'LC Net Total',
  'User ID',
  'Time',
  'Attachments',
];

export const cashAndBankBalanceHeaders = ['Account', 'FCy', 'Balance'];

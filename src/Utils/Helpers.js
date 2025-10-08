// Convert Chart of Accounts to dropdown options
export function convertCOAAccountsToDropdownOptions(data) {
  const options = [];
  function traverse(node) {
    // Add the current node to the options array
    options.push({
      label: `${node.account_code} - ${node.account_name}`,
      value: node.id,
      ...(node.account_code.length < 2 && { isDisabled: true }),
    });

    // Recursively process children, if any
    if (node.children && node.children.length > 0) {
      node.children.forEach(traverse);
    }
  }

  // Start the traversal for each root node in the data array
  data.forEach(traverse);

  return options;
}

export const canModify = (user) => {
  return user?.has_subscription_full_access;
};

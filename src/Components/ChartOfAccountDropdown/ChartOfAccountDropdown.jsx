import React, { useState, useEffect } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import { getChartOfAccountListing } from '../../Services/Masters/ChartOfAccount';
import './chartOfAccountDropdown.css';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';

const MenuItem = ({
  item,
  level,
  expandedItems,
  toggleItem,
  selectedItems,
  onItemSelect,
}) => {
  const isExpanded = expandedItems.includes(item.account_code);
  const hasChildren = item?.children && item?.children?.length > 0;
  const isSelected = selectedItems.includes(item.account_code);

  return (
    <div className="coa-menu-item detail-text">
      <div
        className={`coa-menu-item-content ${
          level === 1 ? 'level-1-account' : ''
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onItemSelect(item.account_code); // Use account_code for selection
        }}
        style={{ paddingLeft: `${level * 1}rem` }}
      >
        <div className="d-flex gap-2 align-items-center">
          <p
            className="m-0"
            onClick={() => hasChildren && toggleItem(item.account_code)}
          >
            {`${item.account_code} - ${item.account_name}`}
          </p>
        </div>
        {level > 1 && (
          <CustomCheckbox
            style={{ border: 'none', marginBottom: 0 }}
            checked={isSelected} // Reflect the selection state
            onChange={() => onItemSelect(item.account_code)} // Use account_code for selection
            key={`${item.account_code}-${item.account_name}`}
          />
        )}
      </div>
      {hasChildren && (
        <div className="coa-menu-item-children">
          {item.children.map((child) => (
            <MenuItem
              key={child.account_code} // Use account_code as key
              item={child}
              level={level + 1}
              expandedItems={expandedItems}
              toggleItem={toggleItem}
              selectedItems={selectedItems}
              onItemSelect={onItemSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ChartOfAccountDropdown1 = ({
  otherUserAccountPermissions,
  onSelectionChange,
}) => {
  const [data, setData] = useState([]);
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getChartOfAccountListing();
        setData(response);
      } catch (error) {
        console.error('Error fetching chart of accounts:', error);
      }
    };
    fetchData();
  }, []);

  // Match and set selected items based on granted permissions
  useEffect(() => {
    if (otherUserAccountPermissions) {
      // Recursive function to traverse the account hierarchy and collect granted account codes
      const getGrantedCodes = (accounts) => {
        let grantedCodes = [];

        accounts.forEach((account) => {
          // Check if the current account is granted
          if (account.granted) {
            grantedCodes.push(account.account_code); // Use account_code instead of id
          }

          // Recursively check for children
          if (account.children && account.children.length > 0) {
            grantedCodes = grantedCodes.concat(
              getGrantedCodes(account.children)
            );
          }
        });

        return grantedCodes;
      };

      const grantedCodes = getGrantedCodes(otherUserAccountPermissions);

      // Set the selected items
      setSelectedItems(grantedCodes); // Update selected items based on granted permissions
    }
  }, [otherUserAccountPermissions]);

  const toggleItem = (account_code) => {
    setExpandedItems((prev) =>
      prev.includes(account_code)
        ? prev.filter((item) => item !== account_code)
        : [...prev, account_code]
    );
  };

  const handleItemSelect = (account_code) => {
    setSelectedItems((prev) => {
      const newSelected = prev.includes(account_code)
        ? prev.filter((item) => item !== account_code)
        : [...prev, account_code];
      onSelectionChange?.(newSelected); // Pass the new value
      return newSelected;
    });
  };

  return (
    <div className="coa-dropdown-container">
      {data.map((item) => (
        <MenuItem
          key={item.account_code} // Use account_code as key
          item={item}
          level={1}
          expandedItems={expandedItems}
          toggleItem={toggleItem}
          selectedItems={selectedItems}
          onItemSelect={handleItemSelect}
        />
      ))}
    </div>
  );
};

const ChartOfAccountDropdown = ({
  userAccountPermissions = null,
  otherUserAccountPermissions,
  onSelectionChange,
}) => {
  const [data, setData] = useState([]);
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //get default account permissions
        const response = await getChartOfAccountListing();
        setData(response);
      } catch (error) {
        console.error('Error fetching chart of accounts:', error);
      }
    };
    fetchData();
  }, []);

  // Match and set selected items based on granted permissions
  useEffect(() => {
    if (otherUserAccountPermissions) {
      // Recursive function to traverse the account hierarchy and collect granted account codes
      const getGrantedCodes = (accounts) => {
        let grantedCodes = [];

        accounts.forEach((account) => {
          // Check if the current account is granted
          if (account.granted) {
            grantedCodes.push(account.account_code); // Use account_code instead of id
          }

          // Recursively check for children
          if (account.children && account.children.length > 0) {
            grantedCodes = grantedCodes.concat(
              getGrantedCodes(account.children)
            );
          }
        });

        return grantedCodes;
      };

      const grantedCodes = getGrantedCodes(otherUserAccountPermissions);
      // Set the selected items
      setSelectedItems(grantedCodes); // Update selected items based on granted permissions
    }
  }, [otherUserAccountPermissions]);

  //for current user
  useEffect(() => {
    if (userAccountPermissions) {
      // Recursive function to traverse the account hierarchy and collect granted account codes
      const getGrantedCodes = (accounts) => {
        let grantedCodes = [];

        accounts.forEach((account) => {
          // Check if the current account is granted
          if (account.granted) {
            grantedCodes.push(account.account_code); // Use account_code instead of id
          }

          // Recursively check for children
          if (account.children && account.children.length > 0) {
            grantedCodes = grantedCodes.concat(
              getGrantedCodes(account.children)
            );
          }
        });

        return grantedCodes;
      };

      const grantedCodes = getGrantedCodes(userAccountPermissions);
      // Set the selected items
      setSelectedItems(grantedCodes); // Update selected items based on granted permissions
    }
  }, [userAccountPermissions]);

  const toggleItem = (account_code) => {
    setExpandedItems((prev) =>
      prev.includes(account_code)
        ? prev.filter((item) => item !== account_code)
        : [...prev, account_code]
    );
  };

  const handleItemSelect = (account_code) => {
    setSelectedItems((prev) => {
      const newSelected = prev.includes(account_code)
        ? prev.filter((item) => item !== account_code)
        : [...prev, account_code];
      onSelectionChange?.(newSelected); // Pass the new value
      return newSelected;
    });
  };

  return (
    <div className="coa-dropdown-container">
      {data.map((item) => (
        <MenuItem
          key={item.account_code} // Use account_code as key
          item={item}
          level={1}
          expandedItems={expandedItems}
          toggleItem={toggleItem}
          selectedItems={selectedItems}
          onItemSelect={handleItemSelect}
        />
      ))}
    </div>
  );
};

export default ChartOfAccountDropdown;

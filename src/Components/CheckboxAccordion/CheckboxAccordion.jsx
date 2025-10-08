import React, { useEffect, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import './CheckboxAccordion.css';

const CheckboxAccordion = ({
  title,
  module = [],
  color = '#1f4047',
  onPermissionsChange,
  readOnly,
}) => {
  const [permissionStates, setPermissionStates] = useState({});
  // Sync the state when permissions prop changes
  useEffect(() => {
    const newPermissionStates = module.reduce(
      (acc, permission) => ({
        ...acc,
        [permission.name]: permission.value,
      }),
      {}
    );
    setPermissionStates(newPermissionStates);
  }, [module]);

  // Calculate if all checkboxes are checked based on permissionStates
  const isAllChecked = Object.values(permissionStates).every((value) => value);

  const handleHeaderCheckboxChange = () => {
    const newCheckedState = !isAllChecked;

    const newPermissionStates = Object.fromEntries(
      module.map((module) => [module.name, newCheckedState])
    );

    setPermissionStates(newPermissionStates);

    if (onPermissionsChange) {
      onPermissionsChange(newPermissionStates);
    }
  };

  const handlePermissionChange = (permissionName) => (e) => {
    const newPermissionStates = {
      ...permissionStates,
      [permissionName]: e.target.checked,
    };

    setPermissionStates(newPermissionStates);

    if (onPermissionsChange) {
      onPermissionsChange(newPermissionStates);
    }
  };

  const formatTitle = (text) =>
    text.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className={`checkbox-accordion open}`}>
      <div
        type="button"
        className="checkbox-accordion-header"
        style={{ backgroundColor: color }}
      >
        <div className="d-flex align-items-center">
          <CustomCheckbox
            readOnly={readOnly}
            key={title}
            name={title}
            checked={isAllChecked}
            onChange={handleHeaderCheckboxChange}
          />
          <span
            className="checkbox-accordion-title ms-2"
            onClick={(e) => {
              e.stopPropagation();
              if (!readOnly) {
                handleHeaderCheckboxChange();
              }
            }}
          >
            {title}
          </span>
        </div>
      </div>
      <div className="checkbox-accordion-content">
        <div className="checkbox-accordion-content-inner">
          {module.map((module) => (
            <CustomCheckbox
              readOnly={readOnly}
              key={module.name}
              label={`Allow to ${formatTitle(module.name)}`}
              checked={!!permissionStates[module.name]}
              onChange={handlePermissionChange(module.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckboxAccordion;

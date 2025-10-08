import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { sortingOptions } from '../../Utils/Constants/SelectOptions';
import CustomInput from '../CustomInput';
import CustomSelect from '../CustomSelect';
import './customFilters.css';
import { capitilize, toSnakeCase } from '../../Utils/Utils';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import CustomButton from '../CustomButton';
import { Dropdown } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';

const CustomFilters = ({
  filters,
  setFilters,
  selectOptions = [],
  checkBoxFilters = [],
  additionalFilters = [],
  rangeFilters = [],
  dateFilters = [],
  hideSearch = false,
  hideItemsPerPage = false,
  useApplyButton = false,
}) => {
  const [formData, setFormData] = useState({});
  const [localFormData, setLocalFormData] = useState({});

  useEffect(() => {
    setFormData(filters);
    setLocalFormData(filters);
  }, [filters]);

  const debouncedSetFilters = useCallback(
    debounce((updatedFormData) => {
      setFilters(updatedFormData);
    }, 500),
    [setFilters]
  );

  const handleChange = (name, value) => {
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    if (useApplyButton) {
      setLocalFormData(updatedFormData);
      setFormData(updatedFormData);
    } else {
      setFormData(updatedFormData);
      if (name === 'search') {
        debouncedSetFilters(updatedFormData);
      } else if (!name.endsWith('_from')) {
        setFilters(updatedFormData);
      }
    }
  };

  const handleApplyFilters = () => {
    setFilters(localFormData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    handleChange(name, value);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    handleChange(name, checked);
  };

  const handleSelectChange = (name, value) => {
    handleChange(name, value);
  };

  return (
    <>
      <div className="tableFilters mb-3">
        <div className="d-flex justify-content-end justify-content-sm-start align-items-end flex-wrap flex-sm-nowrap gap-2 gap-lg-4">
          <div className="filterWrapper d-flex flex-wrap align-items-end mb-0 gap-2 gap-lg-4 flex-grow-1">
            <div className="flex-shrink-0 mb-0 d-flex gap-2">
              {!hideItemsPerPage ? (
                <CustomSelect
                  className={'tableSelect'}
                  extraClass={'border-input'}
                  value={formData?.per_page}
                  name="per_page"
                  label="Show"
                  onChange={(e) => handleSelectChange('per_page', e.target.value)}
                  options={sortingOptions}
                />
              ) : null}
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            {!hideSearch ? (
              <CustomInput
                className={'tableInputs tableSearch border-input'}
                type="text"
                placeholder="Search"
                error={false}
                name="search"
                rightIcon={FaMagnifyingGlass}
                value={formData?.search || ''}
                onChange={handleInputChange}
              />
            ) : null}
            <Dropdown className="filterDropdown">

              <Dropdown.Toggle id="dropdown-basic" className="filterButton">
                <FaFilter />
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                <h5 className="filterTitle">Filter By</h5>
                {rangeFilters?.map(({ title }, index) => (
                  <div
                    className="filterWrapper mb-0"
                    key={index}
                  >
                    <label className="filterLabel">{title}</label>
                    <CustomInput
                      inputClass={'tableInputs'}
                      containerClass="mb-3"
                      showBorders={false}
                      borderRadius={10}
                      error={false}
                      label={title}
                      name={`${toSnakeCase(title)}_from`}
                      placeholder="From"
                      onChange={handleInputChange}
                      value={formData[`${toSnakeCase(title)}_from`] || ''}
                    />
                    <CustomInput
                      inputClass={'tableInputs'}
                      containerClass="mb-3"
                      showBorders={false}
                      borderRadius={10}
                      label={' '}
                      error={false}
                      name={`${toSnakeCase(title)}_to`}
                      min={formData[`${toSnakeCase(title)}_from`] || null}
                      placeholder="To"
                      onChange={handleInputChange}
                      value={formData[`${toSnakeCase(title)}_to`] || ''}
                    />
                  </div>
                ))}
                {dateFilters?.map(({ title, from, to }, index) => (
                  <div
                    className="filterWrapper mb-0"
                    key={index}
                  >
                    <label className="filterLabel">{title}</label>
                    <CustomInput
                      inputClass={'tableInputs'}
                      containerClass="mb-3"
                      showBorders={false}
                      borderRadius={10}
                      type="date"
                      error={false}
                      label={"From"}
                      name={`${toSnakeCase(title)}_from`}
                      placeholder="From"
                      onChange={handleInputChange}
                      value={formData[`${toSnakeCase(title)}_from`] || ''}
                    />
                    <CustomInput
                      inputClass={'tableInputs'}
                      containerClass="mb-3"
                      showBorders={false}
                      borderRadius={10}
                      type="date"
                      label={"To"}
                      error={false}
                      name={`${toSnakeCase(title)}_to`}
                      min={formData[`${toSnakeCase(title)}_from`] || null}
                      placeholder="To"
                      onChange={handleInputChange}
                      value={formData[`${toSnakeCase(title)}_to`] || ''}
                    />
                  </div>
                ))}
                {selectOptions?.map((option, index) => (
                  <div key={index}>
                    {option ? (
                      <CustomSelect
                        fullWidth
                        className={'tableSelect'}
                        name={option.title}
                        value={formData[option.title] || ''}
                        onChange={(e) => {
                          handleSelectChange(option.title, e.target.value);
                        }}
                        label={capitilize(option?.title)}
                        options={option?.options}
                      />
                    ) : null}
                  </div>
                ))}
                {additionalFilters?.map(({ title, placeholder, type }, index) => (
                  <div key={index}>
                    <CustomInput
                      inputClass={'tableInputs'}
                      showBorders={false}
                      borderRadius={10}
                      type={type}
                      error={false}
                      label={title}
                      name={toSnakeCase(title)}
                      placeholder={placeholder}
                      onChange={handleInputChange}
                      value={formData[toSnakeCase(title)] || ''}
                    />
                  </div>
                ))}
                {checkBoxFilters?.map(({ title }, index) => (
                  <div key={index}>
                    <CustomCheckbox
                      style={{ border: 'none', marginBottom: 0, paddingInline: 0 }}
                      checked={formData[toSnakeCase(title)] || false}
                      name={toSnakeCase(title)}
                      label={title}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                ))}
                {useApplyButton && (
                  <CustomButton
                    text={'Apply Filters'}
                    onClick={handleApplyFilters}
                  />
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomFilters;

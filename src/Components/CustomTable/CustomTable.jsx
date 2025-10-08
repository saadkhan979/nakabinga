import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CustomFilters from '../CustomFilters/CustomFilters';
import CustomPagination from '../CustomPagination/CustomPagination';
import './customTable.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

const CustomTable = ({
  filters,
  setFilters,
  selectOptions,
  checkBoxFilters,
  dateFilters,
  rangeFilters,
  headers,
  isLoading,
  children,
  pagination,
  className,
  hasFilters = true,
  isPaginated = true,
  sortKey,
  sortOrder,
  handleSort,
  additionalFilters,
  hideSearch = false,
  hideItemsPerPage = false,
  displayCard = true,
  renderAtEnd,
  useApplyButton = false,
}) => {
  return (
    <>
      {hasFilters && (
        <CustomFilters
          filters={filters}
          setFilters={setFilters}
          selectOptions={selectOptions}
          checkBoxFilters={checkBoxFilters}
          dateFilters={dateFilters}
          rangeFilters={rangeFilters}
          additionalFilters={additionalFilters}
          hideSearch={hideSearch}
          hideItemsPerPage={hideItemsPerPage}
          useApplyButton={useApplyButton}
        />
      )}
      <div
        className={`${displayCard ? 'p-0 pt-3 pb-1' : ''} ${renderAtEnd ? 'mb-3' : 'mb-4'
          }`}
      >
        <div
          className={`customTable position-relative ${className ? className : ''
            }`}
          style={{ minHeight: displayCard ? 'none' : 'unset' }}
        >
          <table>
            <thead>
              <tr>
                {headers.map((header, index) => {
                  if (
                    typeof header === 'string' ||
                    React.isValidElement(header)
                  )
                    return <th key={index}>{header}</th>;
                  else {
                    return (
                      <th
                        key={header.key}
                        onClick={() => handleSort(header.key)}
                        className={`cp ${sortKey === header.key ? sortOrder : 'sorting'
                          }`}
                      >
                        <span className="d-inline">
                          {header.title}{' '}
                          {sortOrder === 'asc' ? (
                            <FaChevronUp className="d-inline" />
                          ) : sortOrder === 'desc' ? (
                            <FaChevronDown className="d-inline" />
                          ) : null}
                        </span>
                      </th>
                    );
                  }
                })}
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    {Array.from({ length: headers.length }).map((_, j) => (
                      <td
                        key={headers[j]}
                        style={{
                          height: className === 'inputTable' ? '78px' : 'unset',
                        }}
                      >
                        <Skeleton duration={1} width={100} baseColor="#ddd" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ) : (
              <>
                {children?.length === 0 || !children ? (
                  <tbody>
                    <tr>
                      <td
                        colSpan={headers?.length}
                        style={{ textAlign: 'center' }}
                      >
                        No Records Found
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  children
                )}
              </>
            )}
          </table>
        </div>
      </div>
      {renderAtEnd}
      {isPaginated && !(children?.length === 0 || !children) && (
        <CustomPagination pagination={pagination} setFilters={setFilters} />
      )}
    </>
  );
};

export default CustomTable;

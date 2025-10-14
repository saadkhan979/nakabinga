import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { HiDotsHorizontal } from 'react-icons/hi';
import './tableActionDropDown.css';
// action = [{name, icon, onClick, className, }]
const TableActionDropDown = ({ actions = [], children, displaySeparator = true }) => {
  let Icon, Icon2;
  Icon = actions?.[0]?.icon;
  if (!actions.length) {
    return null;
  }
  if (actions.length == 2) {
    Icon2 = actions[1].icon;
  }
  return (
    <>
      {actions.length > 1 ? (
        <Dropdown className="tableAction table-action-wrapper">
          <Dropdown.Toggle
            className="p-0 m-0 border-0"
            style={{ boxShadow: 'none' }}
          >
            {children ?? (
              <HiDotsHorizontal size={20} style={{ cursor: 'pointer' }} />
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu align="end" className={`shadow-sm`}>
            {actions.map((action, i) => (
              <Dropdown.Item
                key={i}
                onClick={action.disabled ? undefined : action.onClick}
                className={`${action.className} ${!action.className ? 'bg-hover' : ''
                  } d-flex align-items-center gap-2 ${action.disabled ? 'disabled' : ''
                  }`}
              >
                <action.icon size={20} />
                <span>{action.name}</span>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <div className="d-flex cp gap-3 tableAction align-items-center justify-content-center">
          <span
            className={`${actions?.[0].className}  ${actions?.[0].disabled ? 'disabled' : 'tooltip-toggle'
              }`}
            aria-label={actions?.[0].name}
            onClick={actions?.[0].disabled ? undefined : actions?.[0].onClick}
            style={{
              cursor: actions?.[0].disabled ? 'not-allowed' : 'pointer',
            }}
          >
            <Icon size={20} />
          </span>
          {actions.length == 2 ? (
            <>
              {displaySeparator && <span>|</span>}
              <span
                className={`${actions?.[1].className} ${actions?.[1].disabled ? 'disabled' : 'tooltip-toggle'
                  }`}
                aria-label={actions?.[1].name}
                onClick={
                  actions?.[1].disabled ? undefined : actions?.[1].onClick
                }
                style={{
                  cursor: actions?.[1].disabled ? 'not-allowed' : 'pointer',
                }}
              >
                <Icon2 size={20} />
              </span>
            </>
          ) : null}
        </div>
      )}
    </>
  );
};

export default TableActionDropDown;

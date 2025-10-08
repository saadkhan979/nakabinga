import { Link, useLocation } from 'react-router-dom';
import Dashboard from "../../assets/images/sidebar/dashboard.svg?react";
import SubscriptionLogs from "../../assets/images/sidebar/subscriptionLog.svg?react";
import SubscriptionManagement from "../../assets/images/sidebar/subscriptionManagement.svg?react";
import Support from "../../assets/images/sidebar/support.svg?react";
import SupportLogs from "../../assets/images/sidebar/supportLog.svg?react";
import User from "../../assets/images/sidebar/user.svg?react";
import sidebarIcon1 from "../../assets/images/sidebar/sidebarIcon1.svg?react";
import sidebarIcon2 from "../../assets/images/sidebar/sidebarIcon2.svg?react";
import sidebarIcon3 from "../../assets/images/sidebar/sidebarIcon3.svg?react";
import sidebarIcon4 from "../../assets/images/sidebar/sidebarIcon4.svg?react";
import sidebarIcon5 from "../../assets/images/sidebar/sidebarIcon5.svg?react";
import sidebarIcon6 from "../../assets/images/sidebar/sidebarIcon6.svg?react";
import sidebarIcon7 from "../../assets/images/sidebar/sidebarIcon7.svg?react";
import sidebarIcon8 from "../../assets/images/sidebar/sidebarIcon8.svg?react";
import sidebarIcon9 from "../../assets/images/sidebar/sidebarIcon9.svg?react";
import sidebarIcon10 from "../../assets/images/sidebar/sidebarIcon10.svg?react";
import sidebarIcon11 from "../../assets/images/sidebar/sidebarIcon11.svg?react";
import sidebarIcon12 from "../../assets/images/sidebar/sidebarIcon12.svg?react";
import sidebarIcon13 from "../../assets/images/sidebar/sidebarIcon13.svg?react";
import sidebarIcon14 from "../../assets/images/sidebar/sidebarIcon14.svg?react";
import sidebarIcon15 from "../../assets/images/sidebar/sidebarIcon15.svg?react";
import logo from "../../assets/images/logo.png";

import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import useUserStore from '../../Stores/UserStore';
import { isNullOrEmpty } from '../../Utils/Utils';
import Styles from './Sidebar.module.css';

const menuItems = [
  // {
  //   roles: ["employee", "user"],
  //   id: "1",
  //   label: "Dashboard",
  //   link: "/dashboard",
  //   icon: sidebarIcon1,
  // },
  {
    roles: ["admin"],
    id: "1",
    label: "Dashboard",
    link: "/admin/dashboard",
    icon: sidebarIcon1,
  },
  {
    roles: ["admin"],
    id: "2",
    label: "User Management",
    link: "/admin/user-management",
    icon: sidebarIcon2,
  },
  {
    roles: ["admin"],
    id: "3",
    label: "coach Management",
    link: "/admin/coach-management",
    icon: sidebarIcon3,
  },
  {
    roles: ["admin"],
    id: "4",
    label: "service provider Management",
    link: "/admin/service-provider-management",
    icon: sidebarIcon4,
  },
  {
    roles: ["admin"],
    id: "5",
    label: "service provider Category",
    link: "/admin/service-provider-category",
    icon: sidebarIcon5,
  },
  {
    roles: ["admin"],
    id: "6",
    label: "coach Category",
    link: "/admin/coach-category",
    icon: sidebarIcon6,
  },
  {
    roles: ["admin"],
    id: "7",
    label: "content Management",
    link: "/admin/content-management",
    icon: sidebarIcon7,
  },
  {
    roles: ["admin"],
    id: "8",
    label: "Commission Management",
    link: "/admin/commission-management",
    icon: sidebarIcon8,
  },
  {
    roles: ["admin"],
    id: "9",
    label: "subscription Management",
    link: "/admin/subscription-management",
    icon: sidebarIcon9,
  },
  {
    roles: ["admin"],
    id: "10",
    label: "Payout Management",
    link: "/admin/payout-management",
    icon: sidebarIcon10,
  },
  {
    roles: ["admin"],
    id: "11",
    label: "Report Management",
    link: "/admin/report-management",
    icon: sidebarIcon11,
  },
  {
    roles: ["admin"],
    id: "12",
    label: "FAQ Management",
    link: "/admin/faq-management",
    icon: sidebarIcon12,
  },
  {
    roles: ["admin"],
    id: "13",
    label: "Payment Logs",
    link: "/admin/payment=logs",
    icon: sidebarIcon13,
  },
  {
    roles: ["admin"],
    id: "14",
    label: "Audio Management",
    link: "/admin/audio-management",
    icon: sidebarIcon14,
  },
  {
    roles: ["admin"],
    id: "15",
    label: "Queries",
    link: "/admin/queries",
    icon: sidebarIcon15,
  },
];

const Sidebar = ({ sideBarClass, disable = false }) => {
  const location = useLocation();
  const [openItem, setOpenItem] = useState(null);
  const isCollapsed = sideBarClass === 'collapsed';
  const { role } = useUserStore();

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  useEffect(() => {
    if (isCollapsed) {
      setOpenItem(null); // Close all items when sidebar collapses
    }
  }, [isCollapsed]);

  useEffect(() => {
    if (sideBarClass) {
      setOpenItem(null);
    }
  }, [sideBarClass]);

  const renderLink = (to, children) => {
    if (disable) {
      return <div className={Styles.disabledLink}>{children}</div>;
    }
    return <Link to={to}>{children}</Link>;
  };

  return (
    <div
      className={`${Styles.sidebar} ${Styles[sideBarClass]} ${disable ? Styles.disabled : ''
        }`}
      id="sidebar"
    >
      {disable && <div className={Styles.overlay}></div>}
      {/* <div className={Styles['sidebar-title-wrapper']}>
        {renderLink(
          '/dashboard',
          <h2 className={Styles['sidebar-title']}>
            M{!sideBarClass && 'ilestone'}
          </h2>
        )}
      </div> */}
      <div className={Styles['dropdown-container']}>
        {menuItems.map((item, index) =>
          item.roles.includes(role) ? (
            <div key={index} className={Styles['menu-item-container']}>
              {/* Button with no sub items */}
              {item?.link && !item?.subItems?.length ? (
                renderLink(
                  item.link,
                  <button
                    className={`${Styles['menu-item']} ${location.pathname.includes(item.link) ? Styles.active : ''
                      }`}
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={openItem === item.id}
                    aria-controls={`submenu-${item.id}`}
                  >
                    {item.icon && <item.icon className={Styles.icon} />}
                    <p className="m-0">{item.label}</p>
                    {item.subItems ? (
                      <FaChevronDown
                        className={`${Styles.chevron} ${openItem === item.id ? Styles.open : ''
                          }`}
                      />
                    ) : (
                      ''
                    )}
                  </button>
                )
              ) : (
                <>
                  {/* Button with sub items */}
                  <button
                    className={`${Styles['menu-item']} ${location.pathname.includes(item.link) ? Styles.active : ''
                      }`}
                    onClick={(e) => {
                      if (disable) {
                        e.preventDefault();
                        return;
                      }
                      toggleItem(item.id);
                    }}
                    aria-expanded={openItem === item.id}
                    aria-controls={`submenu-${item.id}`}
                  >
                    {item.icon && <item.icon className={Styles.icon} />}
                    <p className="m-0">{item.label}</p>
                    {item.subItems ? (
                      <FaChevronDown
                        className={`${Styles.chevron} ${openItem === item.id ? Styles.open : ''
                          }`}
                      />
                    ) : (
                      ''
                    )}
                  </button>
                </>
              )}
              {!isNullOrEmpty(item.subItems) && (
                <div
                  id={`submenu-${item.id}`}
                  className={`${Styles.submenu} ${openItem === item.id ? Styles.open : ''
                    }`}
                >
                  {item.subItems.map((subItem, index) => {
                    return subItem.link ? (
                      <div key={subItem.link}>
                        {renderLink(
                          subItem.link,
                          <div
                            className={`${Styles['submenu-item']} ${index === item.subItems.length - 1
                              ? Styles['last-item']
                              : ''
                              } ${location.pathname.includes(subItem.link)
                                ? Styles.active
                                : ''
                              }`}
                          >
                            {subItem.name}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        key={subItem.name}
                        className={`${Styles['submenu-item']}`}
                      >
                        <p className="mb-0 fw-bold fst-italic">
                          {subItem.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Sidebar;

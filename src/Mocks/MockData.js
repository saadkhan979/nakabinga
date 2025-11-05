export const loginCredentials = {
  email: 'admin@gmail.com',
  password: '123',
  status: true,
  role: 'admin',
  message: 'login successfully',
  token: '1164|ihHvE9J6cn1U3St4Sk6v6JKOdm2ARA87hXYbIdS63831040a',
};
export const loggedInUser = {
  'user-id': 1,
  'full-name': 'Arthur Morgan',
  'first-name': 'Arthur',
  'last-name': 'Morgan',
  type: 'admin',
  token: 'somerandomtokenwhichis38characterslong',
  phone: '+190078601',
  dialing_code: '+1',
  email: 'arthurmorgan@rdr2.com',
  'photo-path':
    'https://static.wikia.nocookie.net/villains/images/8/8d/Red_Dead_2_Arthur_Morgan_Promotional_Portrait_1.png',
};
export const notifications = [
  {
    id: 1,
    user: {
      name: 'Emily Clark',
      'profile-image':
        'https://t3.ftcdn.net/jpg/06/92/98/26/360_F_692982616_sFOE56exqjylP20296OjiD83FQxewdDw.jpg',
    },
    action: 'liked your comment',
    notificationText: `John reported an issue: "Unable to create a new football discussion group."`,
    timestamp: '5 minutes ago',
    date: '08/19/2024',
    read: true,
  },
  {
    id: 2,
    user: {
      name: 'John Doe',
      'profile-image':
        'https://t3.ftcdn.net/jpg/06/92/98/26/360_F_692982616_sFOE56exqjylP20296OjiD83FQxewdDw.jpg',
    },
    action: 'shared your post',
    notificationText: `Alex raised a query: "Posted football tactics, but it doesn't show in the group."`,
    timestamp: '3 hours ago',
    date: '08/19/2024',
    read: false,
  },
  {
    id: 3,
    user: {
      name: 'Sophia Brown',
      'profile-image':
        'https://t3.ftcdn.net/jpg/06/92/98/26/360_F_692982616_sFOE56exqjylP20296OjiD83FQxewdDw.jpg',
    },
    action:
      'commented on your photo and this text is here just to make the notification very long',
    notificationText: `Chris submitted a complaint: "Messages not sending in the group chat."`,
    timestamp: '10 minutes ago',
    date: '08/19/2024',
    read: true,
  },
  {
    id: 4,
    user: {
      name: 'David Wilson',
      'profile-image':
        'https://t3.ftcdn.net/jpg/06/92/98/26/360_F_692982616_sFOE56exqjylP20296OjiD83FQxewdDw.jpg',
    },
    action: 'followed you',
    notificationText: `Andrew encountered a problem: "Trying to join a football analysis group but getting an error."`,
    timestamp: '1 day ago',
    date: '08/18/2024',
    read: false,
  },
  {
    id: 5,
    user: {
      name: 'Olivia Johnson',
      'profile-image':
        'https://t3.ftcdn.net/jpg/06/92/98/26/360_F_692982616_sFOE56exqjylP20296OjiD83FQxewdDw.jpg',
    },
    action: 'added your post to favorites',
    notificationText: `James flagged an issue: "Football post content gets flagged for no reason."`,
    timestamp: '30 minutes ago',
    date: '08/19/2024',
    read: true,
  },
];
export const remittanceData = {
  labels: ['Sales', 'Revenue', 'Orders', 'Vendors'],
  datasets: [
    {
      label: 'Remittance',
      data: [40, 30, 20, 10],
      backgroundColor: ['#1f4047', '#fdc770', '#B6C0C3', '#666'],
      borderWidth: 0,
    },
  ],
  options: {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'left',
        labels: {
          padding: 0, // Increase padding between items
          boxWidth: 30, // Set width of the color box for each legend item
          boxHeight: 30, // Set width of the color box for each legend item
          font: {
            family: '"Plus Jakarta Sans", sans-serif',
            size: 14, // Adjust font size to further space items
            lineHeight: 1.5,
          },
        },
      },
    },
  },
};
export const cashBalanceData = {
  type: 'bar',
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Cashhh',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: ['#1f4047', '#fdc770'],
      borderWidth: 0,
      barThickness: 30,
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          maxTicksLimit: 6,
          font: {
            family: '"Plus Jakarta Sans", sans-serif',
          },
        },
        beginAtZero: true,
      },
      x: {
        ticks: {
          font: {
            family: '"Plus Jakarta Sans", sans-serif',
          },
        },
      },
    },
  },
};
export const lineGraphOptions = {
  maintainAspectRatio: false,
  responsive: true,
  interaction: {
    mode: 'nearest', // Show the nearest point
    intersect: false, // Show point even if not exactly on it
  },
  plugins: {
    tooltip: {
      intersect: false,
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        maxTicksLimit: 6,

        font: {
          family: '"Plus Jakarta Sans", sans-serif',
          size: 14, // Adjust font size to further space items
          lineHeight: 1.5,
        },
      },
      title: {
        display: false,
      },
      beginAtZero: true,
    },
    x: {
      ticks: {
        font: {
          family: '"Plus Jakarta Sans", sans-serif',
          size: 14, // Adjust font size to further space items
          lineHeight: 1.5,
        },
      },
      title: {
        display: false,
      },
    },
  },
};
export const netIncomeRatioData = {
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  datasets: [
    {
      data: [10, 17, 12, 14, 15, 18, 19, 23, 25, 20, 29, 32],
      borderRadius: 50,
      tension: 0.4,
      pointBorderColor: '#ccc',
      pointRadius: 0, // Hide points by default
      pointHoverRadius: 6, // Show points when hovering
      pointBorderWidth: 5,
      pointHoverBorderWidth: 5,
      pointBackgroundColor: '#fff',
      borderColor: '#ccc',
      borderWidth: 2,
      fill: {
        target: 'origin',
      },
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  ],
};
// Admin
export const notificationsData = {
  status: true,
  message: 'admin notifications',
  detail: {
    notifications: {
      current_page: 1,
      data: [
        {
          id: '2fb2b0ba-4859-47c4-826c-1742a8ac39db',
          type: 'App\\Core\\Notifications\\PushNotification',
          notifiable_type: 'App\\Models\\Admin',
          notifiable_id: 1,
          data: {
            title: 'New Feedback',
            body: 'There are many variations of passages of Lorem Ipsum available. There are many variations of passages of Lorem Ipsum available.',
            route: {
              name: 'admin.feedbacks.show',
              params: {
                id: 77,
              },
            },
          },
          created_at: '2024-12-28T10:42:45.000000Z',
          updated_at: '2024-06-14T10:42:45.000000Z',
        },
        {
          id: '31d6a0f8-d820-4afd-a1c7-e64abaf8796a',
          type: 'App\\Core\\Notifications\\PushNotification',
          notifiable_type: 'App\\Models\\Admin',
          notifiable_id: 1,
          data: {
            title: 'New Feedback',
            body: 'There are many variations of passages of Lorem Ipsum available. There are many variations of passages of Lorem Ipsum available.',
            route: {
              name: 'admin.feedbacks.show',
              params: {
                id: 74,
              },
            },
          },
          read_at: null,
          created_at: '2024-06-06T12:03:40.000000Z',
          updated_at: '2024-06-06T12:03:40.000000Z',
        },
        {
          id: '3e380bad-85bf-411a-ab5a-ed3977bf179c',
          type: 'App\\Core\\Notifications\\PushNotification',
          notifiable_type: 'App\\Models\\Admin',
          notifiable_id: 1,
          data: {
            title: 'New Feedback',
            body: 'There are many variations of passages of Lorem Ipsum available. There are many variations of passages of Lorem Ipsum available.',
            route: {
              name: 'admin.feedbacks.show',
              params: {
                id: 71,
              },
            },
          },
          created_at: '2024-05-30T13:20:22.000000Z',
          updated_at: '2024-05-30T13:20:22.000000Z',
        },
        {
          id: '6169abb9-24cb-4f47-9bb4-74bc886dfa5a',
          type: 'App\\Core\\Notifications\\PushNotification',
          notifiable_type: 'App\\Models\\Admin',
          notifiable_id: 1,
          data: {
            title: 'New Feedback',
            body: 'There are many variations of passages of Lorem Ipsum available. There are many variations of passages of Lorem Ipsum available.',
            route: {
              name: 'admin.feedbacks.show',
              params: {
                id: 78,
              },
            },
          },
          read_at: '2024-06-14T10:42:45.000000Z',
          created_at: '2024-06-25T11:16:18.000000Z',
          updated_at: '2024-06-25T11:16:18.000000Z',
        },
        {
          id: '704674e3-84c6-4de4-878e-5f6a53a1c16a',
          type: 'App\\Core\\Notifications\\PushNotification',
          notifiable_type: 'App\\Models\\Admin',
          notifiable_id: 1,
          data: {
            title: 'New Feedback',
            body: 'There are many variations of passages of Lorem Ipsum available. There are many variations of passages of Lorem Ipsum available.',
            route: {
              name: 'admin.feedbacks.show',
              params: {
                id: 72,
              },
            },
          },
          read_at: null,
          created_at: '2024-05-30T13:21:05.000000Z',
          updated_at: '2024-05-30T13:21:05.000000Z',
        },
        {
          id: '7b4774e0-0326-4481-8a33-044c1c047810',
          type: 'App\\Core\\Notifications\\PushNotification',
          notifiable_type: 'App\\Models\\Admin',
          notifiable_id: 1,
          data: {
            title: 'New Feedback',
            body: 'There are many variations of passages of Lorem Ipsum available. There are many variations of passages of Lorem Ipsum available.',
            route: {
              name: 'admin.feedbacks.show',
              params: {
                id: 81,
              },
            },
          },
          read_at: null,
          created_at: '2024-06-25T11:17:25.000000Z',
          updated_at: '2024-06-25T11:17:25.000000Z',
        },
        {
          id: '91740da1-89df-407b-a2c0-042ed28a1468',
          type: 'App\\Core\\Notifications\\PushNotification',
          notifiable_type: 'App\\Models\\Admin',
          notifiable_id: 1,
          data: {
            title: 'New Feedback',
            body: 'There are many variations of passages of Lorem Ipsum available. There are many variations of passages of Lorem Ipsum available.',
            route: {
              name: 'admin.feedbacks.show',
              params: {
                id: 83,
              },
            },
          },
          read_at: null,
          created_at: '2024-06-26T11:22:54.000000Z',
          updated_at: '2024-06-26T11:22:54.000000Z',
        },
        {
          id: '9ff7d276-caa5-475d-845a-4d0359d0e91d',
          type: 'App\\Core\\Notifications\\PushNotification',
          notifiable_type: 'App\\Models\\Admin',
          notifiable_id: 1,
          data: {
            title: 'New Feedback',
            body: 'There are many variations of passages of Lorem Ipsum available. There are many variations of passages of Lorem Ipsum available.',
            route: {
              name: 'admin.feedbacks.show',
              params: {
                id: 69,
              },
            },
          },
          read_at: null,
          created_at: '2024-05-30T11:21:32.000000Z',
          updated_at: '2024-05-30T11:21:32.000000Z',
        },
      ],
      first_page_url:
        'http://localhost/food_app/admin-api/notifications?page=1',
      from: 1,
      last_page: 2,
      last_page_url: 'http://localhost/food_app/admin-api/notifications?page=2',
      links: [
        {
          url: null,
          label: '&laquo; Previous',
          active: false,
        },
        {
          url: 'http://localhost/food_app/admin-api/notifications?page=1',
          label: '1',
          active: true,
        },
        {
          url: 'http://localhost/food_app/admin-api/notifications?page=2',
          label: '2',
          active: false,
        },
        {
          url: 'http://localhost/food_app/admin-api/notifications?page=2',
          label: 'Next &raquo;',
          active: false,
        },
      ],
      next_page_url: 'http://localhost/food_app/admin-api/notifications?page=2',
      path: 'http://localhost/food_app/admin-api/notifications',
      per_page: 10,
      prev_page_url: null,
      to: 10,
      total: 14,
    },
    total_notifications: 0,
  },
};
export const userManagementData = [
  {
    id: 1,
    business_id: 12365,
    business_name: 'ABC Corp',
    contact_person: 'John Doe',
    user_id: 'user123',
    phone_no: '1265798687',
    email_address: 'abc@example.com',
    registration_date: '12/01/2024',
    status: 'active',
  },
  {
    id: 2,
    business_id: 18445,
    business_name: 'XYZ Ltd',
    contact_person: 'Jane Smith',
    user_id: 'user124',
    phone_no: '9876543210',
    email_address: 'xyz@example.com',
    registration_date: '15/02/2024',
    status: 'active',
  },
  {
    id: 3,
    business_id: 4856,
    business_name: 'Acme Co',
    contact_person: 'Robert Brown',
    user_id: 'user125',
    phone_no: '1122334455',
    email_address: 'acme@example.com',
    registration_date: '20/03/2024',
    status: 'active',
  },
  {
    id: 4,
    business_id: 58964,
    business_name: 'Global Tech',
    contact_person: 'Emily White',
    user_id: 'user126',
    phone_no: '9988776655',
    email_address: 'global@example.com',
    registration_date: '25/04/2024',
    status: 'inactive',
  },
  {
    id: 5,
    business_id: 5687,
    business_name: 'Innovatech',
    contact_person: 'Chris Green',
    user_id: 'user127',
    phone_no: '7766554433',
    email_address: 'innovatech@example.com',
    registration_date: '30/05/2024',
    status: 'inactive',
  },
  {
    id: 6,
    business_id: 5496,
    business_name: 'TechWave',
    contact_person: 'Alex Johnson',
    user_id: 'user128',
    phone_no: '6655443322',
    email_address: 'techwave@example.com',
    registration_date: '05/06/2024',
    status: 'active',
  },
  {
    id: 7,
    business_id: 2314,
    business_name: 'NextGen Solutions',
    contact_person: 'Samantha Lee',
    user_id: 'user129',
    phone_no: '5544332211',
    email_address: 'nextgen@example.com',
    registration_date: '10/07/2024',
    status: 'active',
  },
];

export const supportLogsData = [
  {
    id: 1,
    name: 'Abc',
    email: 'example1@email.com',
    contact_number: '125684659',
    support_type: 'Support',
    date: '01/01/2024',
    files: [
      {
        id: 79,
        fileable_type: 'App\\Models\\DocumentRegister',
        fileable_id: 34,
        path: 'DIA2ym38vBj0Q2KW0MlfOM47UQPy2rGDUr1Tg4j6.pdf',
        name: 'trq2.pdf',
        file_url:
          'https://custom-dev.onlinetestingserver.com/milestone/storage/media/DIA2ym38vBj0Q2KW0MlfOM47UQPy2rGDUr1Tg4j6.pdf',
      },
      {
        id: 80,
        fileable_type: 'App\\Models\\DocumentRegister',
        fileable_id: 34,
        path: 'DEE8ZUl2HyGD7kwXTpsel90dTkwrLEkoeTFm2mlf.pdf',
        name: 'trq2.pdf',
        file_url:
          'https://custom-dev.onlinetestingserver.com/milestone/storage/media/DEE8ZUl2HyGD7kwXTpsel90dTkwrLEkoeTFm2mlf.pdf',
      },
    ],
    additional_comments:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis',
  },
  {
    id: 2,
    name: 'Abc',
    email: 'example2@email.com',
    contact_number: '125684659',
    support_type: 'General Inquiry',
    date: '02/01/2024',
    files: [
      {
        id: 79,
        fileable_type: 'App\\Models\\DocumentRegister',
        fileable_id: 34,
        path: 'DIA2ym38vBj0Q2KW0MlfOM47UQPy2rGDUr1Tg4j6.pdf',
        name: 'trq2.pdf',
        file_url:
          'https://custom-dev.onlinetestingserver.com/milestone/storage/media/DIA2ym38vBj0Q2KW0MlfOM47UQPy2rGDUr1Tg4j6.pdf',
      },
      {
        id: 80,
        fileable_type: 'App\\Models\\DocumentRegister',
        fileable_id: 34,
        path: 'DEE8ZUl2HyGD7kwXTpsel90dTkwrLEkoeTFm2mlf.pdf',
        name: 'trq2.pdf',
        file_url:
          'https://custom-dev.onlinetestingserver.com/milestone/storage/media/DEE8ZUl2HyGD7kwXTpsel90dTkwrLEkoeTFm2mlf.pdf',
      },
    ],
    additional_comments:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis',
  },
  {
    id: 3,
    name: 'Abc',
    email: 'example3@email.com',
    contact_number: '125684659',
    support_type: 'Requirement',
    date: '03/01/2024',
    files: [
      {
        id: 79,
        fileable_type: 'App\\Models\\DocumentRegister',
        fileable_id: 34,
        path: 'DIA2ym38vBj0Q2KW0MlfOM47UQPy2rGDUr1Tg4j6.pdf',
        name: 'trq2.pdf',
        file_url:
          'https://custom-dev.onlinetestingserver.com/milestone/storage/media/DIA2ym38vBj0Q2KW0MlfOM47UQPy2rGDUr1Tg4j6.pdf',
      },
      {
        id: 80,
        fileable_type: 'App\\Models\\DocumentRegister',
        fileable_id: 34,
        path: 'DEE8ZUl2HyGD7kwXTpsel90dTkwrLEkoeTFm2mlf.pdf',
        name: 'trq2.pdf',
        file_url:
          'https://custom-dev.onlinetestingserver.com/milestone/storage/media/DEE8ZUl2HyGD7kwXTpsel90dTkwrLEkoeTFm2mlf.pdf',
      },
    ],
    additional_comments:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis',
  },
  {
    id: 4,
    name: 'Abc',
    email: 'example4@email.com',
    contact_number: '125684659',
    support_type: 'Type ABC',
    date: '04/01/2024',
    files: [
      {
        id: 79,
        fileable_type: 'App\\Models\\DocumentRegister',
        fileable_id: 34,
        path: 'DIA2ym38vBj0Q2KW0MlfOM47UQPy2rGDUr1Tg4j6.pdf',
        name: 'trq2.pdf',
        file_url:
          'https://custom-dev.onlinetestingserver.com/milestone/storage/media/DIA2ym38vBj0Q2KW0MlfOM47UQPy2rGDUr1Tg4j6.pdf',
      },
      {
        id: 80,
        fileable_type: 'App\\Models\\DocumentRegister',
        fileable_id: 34,
        path: 'DEE8ZUl2HyGD7kwXTpsel90dTkwrLEkoeTFm2mlf.pdf',
        name: 'trq2.pdf',
        file_url:
          'https://custom-dev.onlinetestingserver.com/milestone/storage/media/DEE8ZUl2HyGD7kwXTpsel90dTkwrLEkoeTFm2mlf.pdf',
      },
    ],
    additional_comments:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis',
  },
  {
    id: 5,
    name: 'Abc',
    email: 'example5@email.com',
    contact_number: '125684659',
    support_type: 'Type ABC',
    date: '05/01/2024',
    files: [
      {
        id: 79,
        fileable_type: 'App\\Models\\DocumentRegister',
        fileable_id: 34,
        path: 'DIA2ym38vBj0Q2KW0MlfOM47UQPy2rGDUr1Tg4j6.pdf',
        name: 'trq2.pdf',
        file_url:
          'https://custom-dev.onlinetestingserver.com/milestone/storage/media/DIA2ym38vBj0Q2KW0MlfOM47UQPy2rGDUr1Tg4j6.pdf',
      },
      {
        id: 80,
        fileable_type: 'App\\Models\\DocumentRegister',
        fileable_id: 34,
        path: 'DEE8ZUl2HyGD7kwXTpsel90dTkwrLEkoeTFm2mlf.pdf',
        name: 'trq2.pdf',
        file_url:
          'https://custom-dev.onlinetestingserver.com/milestone/storage/media/DEE8ZUl2HyGD7kwXTpsel90dTkwrLEkoeTFm2mlf.pdf',
      },
    ],
    additional_comments:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis',
  },
  {
    id: 6,
    name: 'Abc',
    email: 'example6@email.com',
    contact_number: '125684659',
    support_type: 'Type ABC',
    date: '06/01/2024',
    files: [
      {
        id: 79,
        fileable_type: 'App\\Models\\DocumentRegister',
        fileable_id: 34,
        path: 'DIA2ym38vBj0Q2KW0MlfOM47UQPy2rGDUr1Tg4j6.pdf',
        name: 'trq2.pdf',
        file_url:
          'https://custom-dev.onlinetestingserver.com/milestone/storage/media/DIA2ym38vBj0Q2KW0MlfOM47UQPy2rGDUr1Tg4j6.pdf',
      },
      {
        id: 80,
        fileable_type: 'App\\Models\\DocumentRegister',
        fileable_id: 34,
        path: 'DEE8ZUl2HyGD7kwXTpsel90dTkwrLEkoeTFm2mlf.pdf',
        name: 'trq2.pdf',
        file_url:
          'https://custom-dev.onlinetestingserver.com/milestone/storage/media/DEE8ZUl2HyGD7kwXTpsel90dTkwrLEkoeTFm2mlf.pdf',
      },
    ],
    additional_comments:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis',
  },
  {
    id: 7,
    name: 'Abc',
    email: 'example7@email.com',
    contact_number: '125684659',
    support_type: 'Type ABC',
    date: '07/01/2024',
    files: [
      {
        id: 79,
        fileable_type: 'App\\Models\\DocumentRegister',
        fileable_id: 34,
        path: 'DIA2ym38vBj0Q2KW0MlfOM47UQPy2rGDUr1Tg4j6.pdf',
        name: 'trq2.pdf',
        file_url:
          'https://custom-dev.onlinetestingserver.com/milestone/storage/media/DIA2ym38vBj0Q2KW0MlfOM47UQPy2rGDUr1Tg4j6.pdf',
      },
    ],
    additional_comments:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis',
  },
];

export const newsfeedData = [
  {
    id: 1,
    authorName: 'Christiana Andy',
    authorImage:
      'https://custom-dev.onlinetestingserver.com/nakabinga-backend/storage/upload/Img_202510061159210.jpg',
    time: '2 days ago',
    text: '"Digital transformation continues to reshape industries worldwide, but 2024 is set to bring some especially impactful changes. From advanced AI applications to increased focus on data privacy, these shifts could redefine how businesses approach technology. Our latest analysis breaks down the key trends and how they could influence your organization’s digital journey. Read more to stay ahead of the curve!"',
    images: ['/images/post1.jpg', '/images/post2.jpg'],
    reactionsCount: 1280,
    commentsCount: 220,
    reactions: [
      {
        name: 'Marvel Edward',
        avatar:
          'https://custom-dev.onlinetestingserver.com/nakabinga-backend/storage/upload/Img_202510061159210.jpg',
      },
      {
        name: 'Moshin',
        avatar:
          'https://custom-dev.onlinetestingserver.com/nakabinga-backend/storage/upload/Img_202510061159210.jpg',
      },
    ],
    comments: [
      {
        name: 'Julia Michael',
        avatar:
          'https://custom-dev.onlinetestingserver.com/nakabinga-backend/storage/upload/Img_202510061159210.jpg',
        text: '"This is an excellent breakdown of the upcoming trends in digital transformation! As a mid-sized business in the retail industry, we’re already feeling the pressure to adopt AI-driven solutions. However, budget constraints and data privacy concerns make it difficult to implement these technologies effectively. I’d love to hear more about practical, scalable solutions for companies our size. Also, any advice on balancing innovation with compliance would be much appreciated!"',
      },
      {
        name: 'John Doe',
        avatar:
          'https://custom-dev.onlinetestingserver.com/nakabinga-backend/storage/upload/Img_202510061159210.jpg',
        text: '"This is an excellent breakdown of the upcoming trends in digital transformation! As a mid-sized business in the retail industry, we’re already feeling the pressure to adopt AI-driven solutions. However, budget constraints and data privacy concerns make it difficult to implement these technologies effectively. I’d love to hear more about practical, scalable solutions for companies our size. Also, any advice on balancing innovation with compliance would be much appreciated!"',
      },
    ],
  },
];

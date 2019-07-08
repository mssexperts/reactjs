const navigationList = [
  {
    className: 'active',
    path: '/manage-users/manage-enterprise',
    role: [0],
    src: '/assets/images/enterprise.svg',
    tooltip: 'manageEnterprise',
  },
  {
    className: 'active',
    path: '/',
    role: [0, 1, 2],
    src: '/assets/images/notepad.svg',
    tooltip: 'manageSurvey',
  },
  {
    className: 'active',
    path: '/manage-users',
    role: [0, 1],
    src: '/assets/images/group.svg',
    tooltip: 'manageUsers',
  },
];

export default navigationList;
